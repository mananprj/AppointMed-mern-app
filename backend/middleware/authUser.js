import jwt from "jsonwebtoken"

// admin authentication middleware
export const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token){
            res.json({success: false, message: "Not Authorized Login Again"});
        }
        const tokendecode = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = tokendecode.id;

        next();

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}