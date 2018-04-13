class PipedriveAPIError extends Error {
    constructor(data, message) {
        super();
        this.name = 'PipedriveAPIError';
        this.message = message || 'Error occurred with pipedrive API';
        this.data = data || {};
        this.status = 424;
    }
}

class UserInfoError extends Error {
    constructor(data, message) {
        super();
        this.name = 'UserInfoError';
        this.message = message || 'Unauthorized access';
        this.data = data || {};
        this.status = 401;
    }
}

class SystemError extends Error {
    constructor(data, message) {
        super();
        this.name = 'SystemError';
        this.message = message || 'Failed to parse user profile';
        this.data = data || {};
        this.status = 501;
    }
}

module.exports = {
    UserInfoError,
    PipedriveAPIError,
    SystemError,
};