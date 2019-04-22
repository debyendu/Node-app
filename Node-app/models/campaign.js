const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({   
    _id :mongoose.Schema.Types.ObjectId,
    campaign_name:{type:String, required:true}, 
    campaign_description:{type:String,required:true},
    campaign_category:{type:String,required:true},
    borrower:{
        firstname:{type:String , required:true},
        lastname:{type:String, required:true},
        age:{type:Number, required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pin:{type:Number,required:true},
        bio:{type:String, required:true},        
        image_url:{type:String, required:true}
    },    
    contribution_amount:{type:Number,required:true},
    contribution_type:{type:String ,required:true},
    contribution_enddate:{type:Date},
    creater_id:mongoose.Schema.Types.ObjectId,
    contribution_details: [{
        contribution:{type:Number, required:true},
        contributor_id:mongoose.Schema.Types.ObjectId,
    }],
    creation_date:{type:Date},
    status:{type:Boolean}
});    

module.exports = mongoose.model('Campaign',campaignSchema);