const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) return res.status(401).json({ message: 'Access denied. No token provided.' });
    const token = req.headers.authorization.split(' ')[1];
    console.log("🚀 ~ token:", token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🚀 ~ decoded:", decoded)
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

exports.verifyAdmin = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    console.log("🚀 ~ jwtToken:", jwtToken)
    if (!jwtToken) return res.status(401).json({ message: 'Access denied. No token provided.' });
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
