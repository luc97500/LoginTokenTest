const router = require('express').Router();
const ensureAuthenticated = require('../Middleware/Auth');

router.get('/', ensureAuthenticated, async (req,res , next)=>{

    res.status(200).json([
        {
            name:"Mobile",
            Price:10000
        },
        {
            name:"EarPhones",
            Price:170
        },
        {
            name:"Telephone",
            Price:5655
        },
        {
            name:"Laptop",
            Price:789523
        },
        {
            name:"TV",
            Price:20000
        },
    ])
})


module.exports = router;