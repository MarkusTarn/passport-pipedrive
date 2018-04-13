const OAuth2Strategy = require('passport-oauth2');
const errors = require('./errors');

class Strategy extends OAuth2Strategy {
    constructor(options, verify) {
        options = options || {};
        options.authorizationURL = options.authorizationURL || 'https://oauth.pipedrive.com/oauth/authorize';
        options.tokenURL = options.tokenURL || 'https://oauth.pipedrive.com/oauth/token';
        super(options, verify);

        OAuth2Strategy.call(this, options, verify);
        this._oauth2.useAuthorizationHeaderforGET(true);
        this.name = 'pipedrive';
        this._userProfileURL = options.userProfileURL || 'https://api-proxy.pipedrive.com/users/me';
    }

    userProfile(accessToken, done) {
        let json;
        this._oauth2.get(this._userProfileURL, accessToken, (err, body, res) => {
            if (err) {
                if (err.data) {
                    json = JSON.parse(err.data);
                }

                if (json && json.error && json.error.message) {
                    return done(new errors.PipedriveAPIError(json.error.data, json.error.message));
                }
                return done(new errors.UserInfoError(err));
            }
            try {
                const { data: profile } = JSON.parse(body);
                return done(null, profile);
            }
            catch (exception) {
                return done(new errors.SystemError(body));
            }
        });
    }
}

module.exports = Strategy;