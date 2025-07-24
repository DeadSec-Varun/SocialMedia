// // Authentication middleware for Express.js

// const { getSession } = require("./lib/session")

// const authMiddleware = async(req, res, next) => {

//     try {
//         const payload = await getSession(req);
//         if (!payload) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }        
//         req.id = payload.id; // Attach user ID to request object
//         next(); // Proceed to the next middleware or route handler
//     }
//     catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// module.exports = authMiddleware;