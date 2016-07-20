var db = require('./pghelper'),
    config = require('./config'),
    nforce = require('nforce'),
     
   
    userName = config.api.userName,
    password = config.api.password;

    org = nforce.createConnection({
        clientId: config.api.clientId,
        clientSecret: config.api.clientSecret,
        redirectUri: config.api.redirectUri,
        apiVersion: config.api.apiVersion,  // optional, defaults to current salesforce API version
        environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
        mode: 'single' // optional, 'single' or 'multi' user mode, multi default
    });


org.authenticate({ username: userName, password: password}, function(err, resp) {
    if(!err) {
        console.log('nforce connection succeeded');
     
    } else {
        console.log('nforce connection failed: ' + err.message);
     
    }
});

function getClaims(req, res, next) {
      alert(1);
      org.getRecord({ type: 'Claim__c'}, function(err, listdata) {
                alert(2);
                if(err) {
                  alert(3);
                  console.error('--> ' + JSON.stringify(err));
                } else {
                  alert(4);
                  console.log('--> Claim__c retrieved ld'+listdata);
                }
          });
     console.log('--> List is in Progress');     
     res.send('List is in Progress');
};

function revokeToken(req, res, next) {
    org.revokeToken({token: org.oauth.access_token}, function(err) {
        if (err) {
            return next(err);
        } else {
            res.send('ok');
        }
    });

}

exports.getClaims = getClaims;
exports.revokeToken = revokeToken;
