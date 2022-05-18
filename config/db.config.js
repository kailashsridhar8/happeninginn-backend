var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://user:TV781Q2Km14Trr9z@cluster0.6xplf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log('Connected Successfully');
})
.catch(()=>{
    console.log('Connect Failed');
});


var conn=mongoose.connection;

module.exports =conn;