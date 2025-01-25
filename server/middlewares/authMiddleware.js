const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt; // Get the JWT from cookies
    console.log(req.cookies)

    if (!token) {
        return res.json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach user information to the request
        console.log(decoded);
        
        next(); // Proceed to the next middleware or route
    } catch (err) {
        return res.json({ message: err.message });
    }
};

module.exports = checkAuth