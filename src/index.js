const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session= require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializaciones 
const app = express();
require('./database');
require('./config/passport');
//Configuraciones

app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));//dirname devuelve el src y lo concatena con la carpetra views para ser usada
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts') ,
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

//Middelwares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables globales
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;    
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));




//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
//Iniciar servidor

app.listen(app.get('port'),() =>{
    console.log('Servidor en el puerto ', app.get('port'));
});