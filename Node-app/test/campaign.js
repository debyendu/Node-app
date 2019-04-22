const mongoose = require('mongoose');
const Campaign = require('../models/campaign');
const ObjectId = require('mongoose').Types.ObjectId;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index')
const should = chai.should();

chai.use(chaiHttp);
    describe('Campaign',()=>{
        beforeEach((done)=>{        
        Campaign.remove(done);
        });

        describe('/GET campaign',()=>{
            it('it should get all the campaigns',(done)=>{
                chai.request(server)
                .get('/campaigns')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
            });
        });
    });
    describe('/POST camapign',()=>{ 
        it('it should not post a campaign without campaign name ',(done) =>{
            let camp = {               
                campaign_description:"This is a test description",
                borrower:{
                    firstname:"Jon",
                    lastname:"Doe",
                    age:28,
                    address:"Foo Estate, Bar lane, Banana island",
                    pin:000000,
                    bio:"This is a test bio",        
                    image_url:"Test image url",
                },    
                contribution_amount:50000,
                contribution_type:"donation",
                contribution_enddate:"2019-02-27 03:45:00.000Z",
                auditor_id:586586,
                creater_id:123456,
                contributor_id:654321,
                creation_date:"2019-02-27 03:45:00.000Z",
                status:true
            }
            chai.request(server)
            .post('/campaigns')
            .send(camp)
            .end((err,res)=>{
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.a.property('error');                                             
                done();

            });
        });
        it('it should post a campaign ',(done) =>{
            let camp = {
                campaign_name:"Test name",
                campaign_description:"This is a test description",
                campaign_category:"test",
                borrower:{
                    firstname:"Jon",
                    lastname:"Doe",
                    age:28,
                    city:"Foo Estate, Bar lane, Banana island",
                    state:"state",
                    pin:000000,
                    bio:"This is a test bio",        
                    image_url:"Test image url",
                },    
                contribution_amount:50000,
                contribution_type:"donation",                
                creation_date:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                status:true
            }
            chai.request(server)
            .post('/campaigns')
            .send(camp)
            .end((err,res)=>{
                res.should.have.status(201);
                res.body.should.have.a.property('message').eql('Handling POST requests to /campaigns');
                res.body.should.have.a.property('createdCampaign');
                done();

            });
        });        
    });

    describe('/GET/:id campaign',()=>{
        it('it should get a campaign by its Id',(done)=>{
            let camp = new Campaign({
                campaign_name:"Test name",
                campaign_description:"This is a test description",
                borrower:{
                    firstname:"Jon",
                    lastname:"Doe",
                    age:28,
                    address:"Foo Estate, Bar lane, Banana island",
                    pin:000000,
                    bio:"This is a test bio",        
                    image_url:"Test image url",
                },    
                contribution_amount:50000,
                contribution_type:"donation",
                contribution_enddate:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                auditor_id:586586,
                creater_id:123456,
                contributor_id:654321,
                creation_date:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                status:true
            })
            camp.save((err,res)=>{                
                const newid = mongoose.Types.ObjectId(camp.id);
                chai.request(server)
                .get('/campaigns/'+newid)
                .end((err,res)=>{
                    res.should.have.status(200);  
                                                       
                    done();
                });
            })
           
        });
    });

    describe('/PUT/:id campaign',()=>{
        it('it should update a campaign by its Id',(done)=>{
            let camp = new Campaign({
                campaign_name:"Test name",
                campaign_description:"This is a test description",
                campaign_category:"category",
                borrower:{
                    firstname:"Jon",
                    lastname:"Doe",
                    age:28,
                    city:"Bar lane, Banana island",
                    state:"state",
                    pin:000000,
                    bio:"This is a test bio",        
                    image_url:"Test image url",
                },    
                contribution_amount:50000,
                contribution_type:"donation",                
                creation_date:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                status:true
            })
            camp.save((err,res)=>{                
                const newid = mongoose.Types.ObjectId(camp.id);
                chai.request(server)
                .put('/campaigns/'+newid)
                .send({
                    campaign_name:"New Test name",
                    campaign_description:"This is a test description",
                    campaign_category:"new category",
                    borrower:{
                        firstname:"Jon",
                        lastname:"Doe",
                        age:28,
                        city:"Banana island",
                        state:"new state",
                        pin:000000,
                        bio:"This is a test bio",        
                        image_url:"Test image url",
                    },    
                    contribution_amount:50000,
                    contribution_type:"donation",                                        
                    creation_date:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                    status:true
                })
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                });
            })
           
        });
    });

    describe('/DELETE/:id campaign',()=>{
        it('it should delete a campaign by its Id',(done)=>{
            let camp = new Campaign({
                campaign_name:"Test name",
                campaign_description:"This is a test description",
                borrower:{
                    firstname:"Jon",
                    lastname:"Doe",
                    age:28,
                    address:"Foo Estate, Bar lane, Banana island",
                    pin:000000,
                    bio:"This is a test bio",        
                    image_url:"Test image url",
                },    
                contribution_amount:50000,
                contribution_type:"donation",
                contribution_enddate:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                auditor_id:586586,
                creater_id:123456,
                contributor_id:654321,
                creation_date:"Thu Nov 20 2014 04:45:00 GMT+0100 (CET)",
                status:true
            })
            camp.save((err,res)=>{                
                const newid = mongoose.Types.ObjectId(camp.id);
                chai.request(server)
                .delete('/campaigns/'+newid)
                .send()
                .end((err,res)=>{
                    res.should.have.status(200); 
                    res.body.should.be.a('Object');
                    res.body.should.have.a.property('ok').eql(1);
                    res.body.should.have.a.property('n').eql(0);
                    done();
                });
            })
           
        });
    });

    


