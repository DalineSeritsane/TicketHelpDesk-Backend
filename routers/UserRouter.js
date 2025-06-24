const express= require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


const ticketRouter = require('./TicketRouter')
const {insertUser} = require("../model/UserModel")

// Middleware for all requests to '/'
router.all("/", (req, res, next) =>{
    
    // res.json({message: "return form user router" });

    next();
})
// // Mount the Ticketrouter
// router.use('/', ticketRouter)


// define a POST route on '/'
router.post('/', async (req, res) => {
    try {
        const { name, email, password, company, address, phone} = req.body;

        if (!email || !password || !name || !company ){
            return res.status(400).json({ status: "error", message:"Missing required fields"})
        }

        //Hashed the password 
        const saltRounds = 10; //determines how many times the hashing algorithm runs the higher the number the more secure the hash but also slower
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Create user with hashed password
        const newUser = {
            name,
            email,
            password: hashedPassword,
            company,
            address,
            phone
        }


    const result = await insertUser(newUser);
    console.log(result);

    res.json({message: "New user created", result})
} catch (error) {
    console.log(error);
    res.json({statux:'error', message: error.message})
}
});



module.exports = router;