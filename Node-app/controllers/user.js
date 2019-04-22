const Users = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.admin_signup = (req,res,next)=>{
    Users.find({empid:"admin@admin.com"}).exec()
    .then(user =>{
        if(!user.lenth > 1){
            bcrypt.hash("admin",10,(err,hash) =>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const user = new Users({
                        _id:new mongoose.Types.ObjectId(),
                        empid:"admin@admin.com",
                        password:hash,
                        role:"admin"
                    });
                    user.save()
                    .then(result=>{
                        res.status(201).json({
                            message:'user created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({error:err});
                    });
                }
            })
        }else{
            return res.status(200).json({
                message:"welcome to outreach fundraiser"
            })
        }
    })
   
};

exports.user_signup = (req,res,next)=>{
    Users.find({empid:req.body.empid}).exec()
    .then(user =>{
        if(user.lenth >=1){
            return res.status(409).json({
                 message:"Employee exists"
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const user = new Users({
                        _id:new mongoose.Types.ObjectId(),
                        empid:req.body.empid,
                        password:hash,
                        role:req.body.role
                    });
                    user.save()
                    .then(result=>{
                        res.status(201).json({
                            message:'user created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({error:err});
                    });
                }
            })
        };
    })
   
};

exports.user_login = (req,res,next)=>{
    Users.find({empid:req.body.empid}).exec()
    .then(user =>{  	
        if(user.length < 1){ 
            return res.status(404).json({
                message:"Auth Failed"
            });
        }else{
            bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
                if(err){
                    return res.status(404).json({
                        message:"Auth Failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        empid:user[0].empid,
                        userId:user[0]._id,                        
                    }, "secret",
                {
                    expiresIn:"1h"
                },)
                    return res.status(200).json({
                        message:'Auth successful', 
                        userId:user[0]._id,
                        role:user[0].role,
                        token:token 
                    })
                }
                res.status(404).json({
                    message:"Auth Failed"
                })
            })
        }
    })
   
}