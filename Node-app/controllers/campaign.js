const Campaign = require('../models/campaign');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

exports.campaign_get_all = (req,res,next) => {
    Campaign.find().exec()
    .then(doc=>{
        
        if(doc.length>=0){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message:'No campaigns found'
            });
        }
       

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });    
};

exports.campaign_add_new = (req,res,next) => {    
    var camp = new Campaign({
        _id:new mongoose.Types.ObjectId(),
        campaign_name:req.body.campaign_name,
        campaign_description:req.body.campaign_description,
        campaign_category:req.body.campaign_category,
        borrower:{
            firstname:req.body.borrower.firstname,
            lastname:req.body.borrower.lastname,
            age:req.body.borrower.age,
            city:req.body.borrower.city,
            state:req.body.borrower.state,
            pin:req.body.borrower.pin,
            bio:req.body.borrower.bio,            
            image_url:req.body.borrower.image_url
        },
        contribution_amount:req.body.contribution_amount,
        contribution_type:req.body.contribution_type,
        contribution_enddate:req.body.contribution_enddate,
        creater_id:req.body.creater_id,
        creation_date:req.body.creation_date,
        status:req.body.status,
    });
    camp.save().then(result=>{        
        res.status(201).json({
            message:"Handling POST requests to /campaigns",
            createdCampaign:result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })    
}

exports.campaign_findbyId = (req,res,next)=>{
    const id=req.params.id;
    Campaign.findById(id).exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.campaign_updatebyId = (req,res,next)=>{
    if(!ObjectId.isValid(mongoose.Types.ObjectId(req.params.id)))
    return res.status(400).send(`No record with a given id : '+${req.params.id}`);

    var camp = {
        campaign_name:req.body.campaign_name,
        campaign_description:req.body.campaign_description,
        campaign_category:req.body.campaign_category,
        borrower:{
            firstname:req.body.borrower.firstname,
            lastname:req.body.borrower.lastname,
            age:req.body.borrower.age,
            city:req.body.borrower.city,
            state:req.body.borrower.state,
            pin:req.body.borrower.pin,
            bio:req.body.borrower.bio,            
            image_url:req.body.borrower.image_url,
        },
        contribution_amount:req.body.contribution_amount,        
        contribution_type:req.body.contribution_type,
        contribution_enddate:req.body.contribution_enddate,
        creater_id:req.body.creater_id,
        creation_date:req.body.creation_date,
        status:req.body.status,
    }

    Campaign.findByIdAndUpdate(req.body._id,{$set:camp},{new:true}).exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });   
}

exports.campaign_contribution = (req,res,next)=>{
    var contribution = {      
            contribution:req.body.contribution_details.contribution,
            contributor_id:req.body.contribution_details.contributor_id,     
        }
    Campaign.findByIdAndUpdate(req.params.id,
        {$push: {contribution_details: contribution}},
        {safe: true, upsert: true}).exec()
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });   
}

exports.campaign_deletebyId = (req,res,next)=>{
    const id = req.params.id
    Campaign.remove({_id:id}).exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
}
