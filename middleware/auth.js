const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token)
		return res.status(401).json({ msg: "No token, authorization denied" });

	try {
		const decode = jwt.verify(token, process.env.jwtSecret);

		req.userId = decode;
		next();
	} catch (error) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
