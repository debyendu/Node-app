var config = {
    development: {        
        database: {            
            dburl:'mongodb://localhost:27017/Outreach_Fundraiser'
        },       
        server: {
            host: 'localhost',
            port: '3000'
        }
    },
    test: {        
        database: {
            dburl:'mongodb://localhost:27017/test'
        },
       
        server: {
            host:   'localhost',
            port:   '4000'
        }
    }
};

module.exports = config;



 