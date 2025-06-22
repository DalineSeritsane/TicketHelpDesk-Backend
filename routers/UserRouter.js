const express= require("express");
const router = express.Router();


router.all("/", (req, res) =>{
    res.json({message: "return form user router"});
})

module.exports = router;