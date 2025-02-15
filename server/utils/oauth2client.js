const { google } = require('googleapis');

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const ADMIN_GOOGLE_CLIENT_ID = process.env.ADMIN_GOOGLE_CLIENT_ID;
const ADMIN_GOOGLE_CLIENT_SECRET = process.env.ADMIN_GOOGLE_CLIENT_SECRET;

exports.oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
);

exports.adminOauth2Client = new google.auth.OAuth2(
    ADMIN_GOOGLE_CLIENT_ID,
    ADMIN_GOOGLE_CLIENT_SECRET,
    'postmessage'
);
