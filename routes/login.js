import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';
import bcrtpy from 'bcrypt';  
import userDataBase from '../userData.js';  

const loginApp = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

loginApp.set('view engine', 'ejs');

loginApp.get('/', (req, res) => {
    res.render("login")
});

loginApp.post('/', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true
}))

// loginApp.post('/', urlencodedParser, async (req, res) => { 

//     const hashedDefaultPassword = bcrtpy.hash("password1234", 10);
//     console.log("Default pswrd: " + hashedDefaultPassword);
//     let validemail = false;
//     let validPassword = false;
//     try {
//         // const salt = await bcrtpy.genSalt();
//         for(let i = 0; i < userDataBase.length; i++) {
//             let hashedPassword = userDataBase[i].password;
//             console.log(hashedPassword);
//             if(req.body.email === userDataBase[i].email) {
//                 validemail = true;
//                 if(await bcrtpy.compare(req.body.password, hashedPassword)) {
//                     validPassword = true;
//                     break;
//                 }
//             } else {
//                 validemail = false;
//             }
//         }
//         if(validemail && validPassword) {
//             res.redirect("/");
//             console.log("Logged in");
//         } else if(validemail && !validPassword) {
//             res.redirect('/login');
//             console.log("Check the password and try again!");
//         } else {
//             console.log("Check email/ password and try again!")
//         }
//     } catch {
//         res.status(500).send();
//     }   
// })

export default loginApp;