const express = require('express');
const router = express.Router();

const CampaignController = require('../controllers/campaign');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const storage = multer.diskStorage({
    desination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage});
const ObjectId = require('mongoose').Types.ObjectId;




router.get('/',CampaignController.campaign_get_all);

router.get('creator/:id',(req,res)=>{
   
        Campaign.find({creater_id:req.params.id},(err,doc) =>{
            if(!err){res.send(doc);}
            else{console.log('Error in retrieving campaigns for this creator id : '+ JSON.stringify(err,undefined,2));}
        });
    
});

router.get('/:id',CampaignController.campaign_findbyId)

router.post('/',CampaignController.campaign_add_new);

router.put('/:id',CampaignController.campaign_updatebyId)

router.put('/payment/:id',CampaignController.campaign_contribution)

router.delete('/:id',CampaignController.campaign_deletebyId);

module.exports = router