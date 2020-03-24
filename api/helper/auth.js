const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "No token auth denied" });
	}

	try {
		decoded = jwt.verify(token, process.env.jwtSecret);

		req.user = decoded.user;
		next();
	} catch (e) {
		res.status(401).json({ msg: "token is not found" });
	}
};
