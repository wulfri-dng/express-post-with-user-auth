import express, { Router } from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
// router.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const users = [
    {
        firstName: "Danusha",
        lastName: "Navod",
        age: 21,
        email: "abc@mna.cso"
    }
]

router.get('/', (req, res) => {
    res.render("users", {users: users});
});

router.post('/', urlencodedParser, (req, res) => {
    console.log(req.body);
    const user = {
        firstName: `${req.body.fName}`,
        lastName: `${req.body.lName}`,
        age: `${req.body.age}`,
        email: `${req.body.email}`
    }
    users.push(user);
    res.redirect('users');
});

export default router;