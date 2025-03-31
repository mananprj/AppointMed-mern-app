import jwt from "jsonwebtoken";

// Doctor authentication middleware
export const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized. Login Again" }); 
        }

        const tokendecode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.body.docId = tokendecode.id;

        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message }); 
    }
};