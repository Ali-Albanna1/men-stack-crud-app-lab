// imports
const express = require("express") //importing express package
const app = express() // creates a express application
require("dotenv").config() // allows us to use the .env variables
const mongoose = require("mongoose") // importing mongoose
const morgan = require("morgan")
const methodOverride = require("method-override")
const Cars = require("./models/car")






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal




async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
 catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB() // connect to database



// Routes go here

app.get('/',(req,res) => {
   try{
    res.render('home.ejs') }

     catch(error){
        console.log("Error Occured",error)
    }
})


//CREATE 

app.get('/cars/new', (req,res) => {

    try{
        res.render('cars/new.ejs')

    }
    catch(err){

        console.log('Something went wrong',err)
    }
})

app.post('/cars', async (req,res) => {
  
    try{
    
     const createdCar = await Cars.create(req.body)

     res.redirect('/cars/'+createdCar._id)
    }
     
     catch(err){

        console.log('Something went wrong',err)
    }
    

})


//Read 

app.get('/cars', async (req,res) => {

    try{
    
         const allCars = await Cars.find()

         res.render('cars/index.ejs',{allCars})

         
    } 

     catch(err){

        console.log('Something went wrong',err)
    }

})

app.get('/cars/:id', async (req,res) => {

    try{

        const {id} = req.params

        const findIdCar = await Cars.findById(id) 

        res.render('cars/newlycreated.ejs',{findIdCar})


    }

    catch(error){

        console.log('Something went wrong',err)
    }

})


// Update 























app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000


