# Passport-Pipedrive

[Passport](http://passportjs.org/) strategy for authenticating with [Pipedrive](https://www.pipedrive.com/)
using OAuth 2.0 API.

This module lets you authenticate using pipedrive in your [Express](http://expressjs.com/) Node.js applications, by using it with Passport.

Initial version!

## Install

    $ npm install passport-pipedrive

## Usage

#### Configure Strategy

The Pipedrive authentication strategy authenticates users using a Pipedrive account.
Strategy takes three required options as parameters:
* clientID
* clientSecret
* callbackURL

The client ID and secret are obtained when creating an application into Pipedrive Marketplace.
CallbackURL has to match with the one you specified on the Pipedrive Marketplace Manager page.
The strategy requires a `verify` callback, which receives the access token and optional refresh token,
as well as profile which contains the data from `https://api-proxy.pipedrive.com/users/me` endpoint.

    passport.use(new PipedriveStrategy({
    	clientID: config.passport.clientID,
    	clientSecret: config.passport.clientSecret,
    	callbackURL: config.passport.domains.callback,
    }, ((accessToken, refreshToken, profile, done) => {
    		User.getOrAddNew({ userId: profile.id }, (err, user) => done(err, user));
    	})));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'pipedrive'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    router.get('/authenticate/pipedrive', passport.authenticate('pipedrive', {
    	scope: ['deals:full'],
    }));
    
    router.get('/authenticate/pipedrive/callback', passport.authenticate('pipedrive', { failureRedirect: '/login' }), (req, res) => {
    	res.redirect('/');
    });


## TODO

- [ ] Tests  
- [ ] state support

## Credits

  - [Markus Tarn](http://github.com/MarkusTarn)

## License

[The MIT License](http://opensource.org/licenses/MIT)