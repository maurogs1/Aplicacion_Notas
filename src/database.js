const moongose = require('mongoose');
moongose.connect('mongodb://heroku_5wlptnxz:24b7t0d8blheqtke3g7u0hfmm9@ds031721.mlab.com:31721/heroku_5wlptnxz', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db=>console.log("Db conectada"))
.catch(err=>console.error(err));  