if(process.env.NODE_ENV !== 'production') {
    import dotenv from './node_modules/dotenv/config.js'
}

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import loginRoutes from './routes/login.js';
import registerRoutes from './routes/register.js';
import blogRoutes from './routes/blog.js';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import initializePassport from './passport-config.js';
import userDataBase from './userData.js';

initializePassport(passport,
     email => userDataBase.find(user => user.email === email)
)

const app = express();
const PORT = 5000;
let urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/blog', blogRoutes);

app.use(passport.initialize());
app.use(flash);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/api', (req, res) => {
    console.log("POST passed");
    console.log(req.body);
    res.end();
    // res.send(req.body);
});

app.listen(PORT, () => console.log("App starting on port", PORT));