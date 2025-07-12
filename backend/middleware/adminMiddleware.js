import jwt from 'jsonwebtoken'

export function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(400).json({
            message: "No token provided"
        })
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.adminId = decode.id;
        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid token expired",
            error: error.message
        })
    }
}