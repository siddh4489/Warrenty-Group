var db = require('./pghelper'),
    config = require('./config'),
    nforce = require('nforce'),
     
    var oauth;
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
     
    
          console.log('attempting to get the Claims');
          org.getRecord({ type: 'Claim__c', oauth: oauth }, function(err, ld) {
            if(err) {
              console.error('--> unable to retrieve lead');
              console.error('--> ' + JSON.stringify(err));
            } else {
              console.log('--> lead retrieved ld'+ld);
              console.log('changed: ' + JSON.stringify(ld.changed(), '  '));
            }
          });

     
     res.send('Ok');
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
