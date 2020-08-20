const moongose = require('mongoose');
moongose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db=>console.log("Db conectada"))
.catch(err=>console.error(err));  