import express from "express";
import bodyParser from 'body-parser';
import bcrtpy from 'bcrypt';  
import userDataBase from "../userData.js";

const registerApp = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false });

registerApp.get('/', (req, res) => {
    res.render('register.ejs', {errorMessage: ""});
})

function checkEmail(email) {
    for(let i=0; i<userDataBase.length; i++) {
        if(userDataBase[i].email === email) {
            return false;
        }
    }
    return true;
}

function validatePassword(body) {
    if((body.password === body.confirmPassword) && (body.password !== ""  && body.confirmPassword !== "")) {
        return true;
    }
    return false;
}

registerApp.post('/', urlencodedParser, async (req, res) => {
    if(checkEmail(req.body.email) && validatePassword(req.body)) {
        const hashedPassword = await bcrtpy.hash(req.body.password, 10);
        const user = {
            "fName": req.body.fName,
            "lName": req.body.lName,
            "email": req.body.email,
            "password": hashedPassword
        }
        userDataBase.push(user);
        console.log(userDataBase);
        res.redirect('/login')
    } else if(checkEmail(req.body.email)) {
        console.log("Check the password and try again!")
        res.render('register.ejs', {errorMessage: "Check the password and try again!"});

    } else {
        console.log("You already have an account for this email!")
        res.render('register.ejs', {errorMessage: "You already have an account for this email!"})
    }
})

export default registerApp;