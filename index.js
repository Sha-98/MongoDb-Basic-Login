// Import install libraries
var express=require("express");
var bodyParse=require("body-parser");
var mongoose=require("mongoose");
const { response } = require("express");


// Create the Application
const app = express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended:true
}))


//Connect the app to your database

mongoose.connect('mongodb+srv://root:1234@java-mongodb-login.7dazutx.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db=mongoose.connection;

db.on('error', ()=>console.log("error in connecting database"));
db.once('open',()=>console.log("Connected to Database"));


// Create the checking page
app.get("/", (req,res)=> {
    return res.redirect("index.html");
}).listen(3000);


app.post("/login", (request,response)=>{
    try{
        // get data from index.html form

        const username = request.body.username;
        const password = request.body.password;

        // check it
        // data post success
        // console.log('You are logged in');

        // get data from database
        const useremail = db.collection('users').findOne({email: username}, (err,res)=>{

            if(res===null){
                
                response.send("Account Not Available. Please Create Account First!");

            }
            else if (err) throw err;

            if(res.password===password) {

                console.log("Logged In Successfully!");
                return response.redirect("login.html")
            }
            else {
                console.log("Credentials does not match");
                response.send("Credentials does not Match");
            }

        })

    }catch(error){

        console.log("Invalid Credentials")

    }
})











// // const {MongoClient} = require('mongodb');

// // async function main() {
// //     const uri = "mongodb+srv://root:1234@java-mongodb-login.7dazutx.mongodb.net/?retryWrites=true&w=majority";

// //     const client = new MonfoClient(uri);

// //     try {
// //         await client.connect();

// //         await listDatabases(client);

// //     } catch(e) {
// //         console.error(e);
// //     } finally {
// //         await client.close();
// //     }
// // }

// // main().catch(console.error);

// // async function listDatabases(client){
// //     DatabasesList = await client.db().admin().listDatabases();

// //     console.log("Databases:");
// //     databasesList.databases.forEach(db => console.log(' -${db.name}'));

// // };










// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({
//     extended:true
// }));

// app.get("/", function(req,res) {
//     res.send("express is working")
// })


// app.listen(3000, function(){
//     console.log("server is running on 3000");
// })

