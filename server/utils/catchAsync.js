module.exports = fn => {
	return (req, res, next) => {
		fn(req, res, next).catch(err => next(err));
	};	
};


// This function catches all error from aysnc functions 