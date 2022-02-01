import express from "express";
import bodyParser from 'body-parser';
import bcrtpy from 'bcrypt';  
import userDataBase from "../userData.js";

const registerApp = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false });

registerApp.get('/', (req, res) => {
    res.render('register.ejs', {errorMessage: ""});
})

function checkUsername(username) {
    for(let i=0; i<userDataBase.length; i++) {
        if(userDataBase[i].username === username) {
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
    if(checkUsername(req.body.username) && validatePassword(req.body)) {
        const hashedPassword = await bcrtpy.hash(req.body.password, 10);
        const user = {
            "fName": req.body.fName,
            "lName": req.body.lName,
            "username": req.body.username,
            "password": hashedPassword
        }
        userDataBase.push(user);
        console.log(userDataBase);
        res.redirect('/login')
    } else if(checkUsername(req.body.username)) {
        console.log("Check the password and try again!")
        res.render('register.ejs', {errorMessage: "Check the password and try again!"});

    } else {
        console.log("You already have an account for this username!")
        res.render('register.ejs', {errorMessage: "You already have an account for this username!"})
    }
})

export default registerApp;