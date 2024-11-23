
const jwt =  require('jsonwebtoken')

const ensureAuthenticated = async (req,res,next) =>{
    const auth = req.headers['authorization']
    try {
        if(!auth){
            return res.status(403).json({
              message:"Unauthorized jwt Token is required"
            })  
          }
      
          const decoded = jwt.verify(auth,process.env.JWT_SECRET)
          req.user = decoded
          next();
    } catch (error) {
        return res.status(403).json({message:"Unauthorized, JWT token wrong or expired!"})
    }
}

module.exports = ensureAuthenticated