const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];


mongoose.connect(config.database.dburl , (err)=>{
    if(!err){
        console.log('MongoDB connection succeeded...');
    }else{
        console.log('Error in DB connection : '+JSON.stringify(err,undefined,2));
    }
});

module.exports = mongoose;