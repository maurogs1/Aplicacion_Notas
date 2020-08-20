const passport =  require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
passport.use(new LocalStrategy({
    usernameField: 'email'},async(email,password,done)=>{
        const user = await User.findOne({email: email});
        if(!user)
            return done(null,false,{message:'Usuario no encontrado' });        
        else if(await user.matchPasswords(password))
            return done(null,user);        
        else return done(null,false,{message: 'Contraseña incorrecta'});
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err, user);
    });
})
