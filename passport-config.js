import passport from 'passport';
import LocalS from 'passport-local';
import bcrypt from 'bcrypt';

const LocalStratergy = LocalS.Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null) {
            return done(null, false, {message: "No user with that email"})
        }
    
        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password Incorrect'})
    
            }
        } catch(e) {
            return done(e);
        }
    }

    passport.use(new LocalStratergy({usernameField: 'email'}, authenticateUser))
};

passport.serializeUser((user, done) => done(null, user.id));
passport.serializeUser((user, done) => {
    done(null, getUserById.id)
});


export default initialize;