const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
router.get('/users/signin', (req,res)=>{

    res.render("users/signin");
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));



router.get('/users/signup', (req,res)=>{
    res.render("users/signup");
});

router.post('/users/signup',async(req,res)=>{
    const { nombre, email, password, confirm_password } = req.body;
    const errors = [];
    if(nombre.length > 0 && email.length > 0 && password.length > 0 && confirm_password.length > 0){
        if(password != confirm_password)
            errors.push({text: "La contraseña no coincide"});
        if(password.length < 3)
            errors.push({text: "La contraseña debe tener al menos 4 caracteres"});
        if(errors.length > 0)
            res.render('users/signup',{errors,nombre,email,password,confirm_password});
        else{
            const emailUSer =  await User.findOne({email: email});
            if(emailUSer){
                req.flash('error_msg', 'El email '+email+' ya está registrado');
                res.redirect('/users/signup');
            }                 
            else{
                const newUser = new User({nombre,email,password });            
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                req.flash('success_msg', "Estás registrado");
                res.redirect('/users/signin');
            }
        }        
    }
    else{
        errors.push({text: "Los campos no pueden quedar vacíos"});
        res.render('users/signup',{errors,nombre,email,password,confirm_password});
    }
});

router.get('/users/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports=router;