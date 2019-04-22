const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const {mongoose} = require('./db');
const campaignRoutes = require('./routes/campaign');
const userRoutes = require('./routes/user');

var app = express();
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.use(cors({origin:'*'}));


app.listen(config.server.port,err =>{
    if(err){
        throw err;
    }else{
        console.log("Server running on port : "+config.server.port);
        console.log("Running on : "+process.env.NODE_ENV );
    }
});

app.use('/campaigns', campaignRoutes);
app.use('/user',userRoutes);

module.exports = app;
