const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt; // Get the JWT from cookies
    console.log(req.cookies)

    if (!token) {
        return res.json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user info(_id) to the request
        console.log("User found:" + decoded);
        
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.log("Error in status check middleware: " + err.message);
        next(err)
    }
};

module.exports = checkAuth