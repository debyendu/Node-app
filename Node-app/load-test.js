var loadtest = require('loadtest');

//Declare a reporting function
function statusCallback(latency, result, error){
    console.log(result.body);
    console.log('------------------');
    console.log('Current latency %j, result %j', latency, error ? JSON.stringify(error) + result.toString() : result);
    console.log('------------------');
    console.log('Request elapsed milliseconds:', error ? error.requestElapsed : result.requestElapsed);
    console.log('Request index :', error ? error.requestIndex : result.requestIndex);
    console.log('Request loadtest() instance index :', error ? error.instanceIndex : result.instanceIndex);
}

//Declare options
var options = {
    url: 'http://localhost:3000/campaigns',
    maxRequests: 600,
    concurrency: 20,
    requestsPerSecond: 20,
    method: 'POST',
    contentType: 'application/json',
    body:  {
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
    },
    statusCallback: statusCallback
};

loadtest.loadTest(options, function(err){
    if(err){
        throw err;
    }
});