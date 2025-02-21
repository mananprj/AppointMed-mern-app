import jwt from "jsonwebtoken"

// admin authentication middleware
export const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers;
        if(!atoken){
            res.json({success: false, message: "Not Authorized Login Again"});
        }
        const tokendecode = await jwt.verify(atoken, process.env.JWT_SECRET);

        if(tokendecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: true, message: "Invaid token"})
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}