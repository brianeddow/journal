import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user === null) {
      return done(null, false, { message: "No user with that email address" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Username or password incorrect"});
      }
    } catch (e) {
        return done(e);
    }
  }
  
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, { id: user.email_address })
    })
  });
  passport.deserializeUser((id, done) => {
    process.nextTick(() => {
      return done(null, { user: getUserById(id) })
    })
  });
}

export default initialize;