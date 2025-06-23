const express= require("express");
const router = express.Router();
const ticketRouter = require('./TicketRouter')

router.all("/", (req, res, next) =>{
    
    // res.json({message: "return form user router" });

    next();
})
// // Mount the Ticketrouter
// router.use('/', ticketRouter)


// define a POST route on '/'
router.post('/', (req, res) =>{
    res.json(req.body)
} )




module.exports = router;