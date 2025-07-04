require("dotenv").config();
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

//API security
app.use(helmet());
 //checking remove 

//handle CORS error
app.use(cors());

//MongoDb connection Setup
const mongoose = require('mongoose');

 mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    
}).then(()=> console.log("MongoDB connected")).catch((err)=> console.log(err))



//Logger
app.use(morgan("tiny"));


//Set body bodyParse

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());




const port = process.env.PORT || 3001;

//Load routers
const userRouter = require("./routers/UserRouter")
const ticketRouter = require('./routers/TicketRouter')


//Use Routers
app.use("/api/user", userRouter);
app.use("/api/ticket", ticketRouter )


//Error handler
const handleError = require ("./utils/errorHandler")

// routes handleError
app.use('/', (req, res, next) => {
   const error = new Error("Resources not found!")
   error.status = 404

   next(error)
})

app.use((error, req, res, next) =>{
    handleError(error, res)
})




app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`);
})