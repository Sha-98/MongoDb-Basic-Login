var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://root:1234@mongodblogin.pcv1to3.mongodb.net/SignUp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");































// // first import install libery 

// var express = require("express");
// var bodyParse = require("body-parser");
// var mongoose = require("mongoose");
// // const e = require("express");

// //create app

// const app = express()

// app.use(bodyParse.json())
// app.use(express.static('public'))
// app.use(bodyParse.urlencoded({
//     extended: true
// }))

// // conect database


// mongoose.connect('mongodb+srv://root:1234@mongodblogin.pcv1to3.mongodb.net/SignUpretryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     // useCreateIndex: true,
//     // useFindAndModify: false
// })

// var db = mongoose.connection;

// // check connect

// db.on('error',()=>console.log("error in connecting database"));
// db.once('open',()=>console.log("Connected to Database"));


// app.get("/", (req, res)=>{
//     return res.redirect('index.html');

// }).listen(3000);



// app.post("/login", async (request, response)=>{
//     try {
//         //adding
//         const username = request.body.username;
//         const password = request.body.password;

//         const usermail = db.collection('Users').findOne({email: username}, (err, res)=>{
            
//             if(res===null){
//                 response.send("Information Does Not Match, Create an Account First");
//             }
//             else if(err) throw err;
            
//             if(res.password===password) {
                
//                 console.log("Logged In Successfully");
//                 return response.redirect('login.html')
//             }
//             else{
//                 console.log("Password Not Matched")
//                 response.send("Invalid Password!❌❌❌");
//             }
//         });

//     } catch (error){
//         console.log("Invalid information❌");
//         response.status(400).send("Invalid information❌");
//     }

// })
































// const express = require ('express');
// const session = require ('express-session');
// const bodyParser = require ('body-parser');
// const cookieParser = require ('cookie-parser');
// const mongoose = require ('mongoose');
// const passport = require ('passport');
// const LocalStrategy = require ('passport-local').Strategy;
// const User = require ('./UserModel');

// const dbUrl = 'mongodb+srv://root:1234@mongodblogin.pcv1to3.mongodb.net/SignUpretryWrites=true&w=majority';
// const port = process.env.PORT || 9000;
// const app = express();

// app.use (bodyParser.json ());
// app.use (bodyParser.urlencoded ({extended: true}));
// app.use (cookieParser ());
// app.use (
//   session ({secret: 'borkar.amol', saveUninitialized: false, resave: false})
// );

// app.use (passport.initialize ());
// app.use (passport.session ());

// mongoose.connect (dbUrl, {useNewUrlParser: true}, () => {
//   console.log ('Successfully connected to hosted database.');
// });

// passport.serializeUser ((User, done) => {
//   //console.log ('SERIALIZEUSER: ', User._id);
//   done (null, User._id);
// });

// passport.deserializeUser ((id, done) => {
//   User.findById (id, (err, User) => {
//     //console.log ('DESERIALIZEUSER: ', User);
//     done (err, User);
//   });
// });

// // passport.use (
// //   'signup',
// //   new LocalStrategy (
// //     {
// //       usernameField: 'email',
// //       passwordField: 'password',
// //     },
// //     (email, password, done) => {
// //       process.nextTick (() => {
// //         User.findOne ({email: email}, (err, foundUser) => {
// //           if (err) return done (err);

// //           if (foundUser) {
// //             return done (null, false, {
// //               message: 'The email is already registered.',
// //             });
// //           } else {
// //             let newUser = new User ();
// //             newUser.email = email;
// //             newUser.password = newUser.hashPassword (password);

// //             newUser.save (err => {
// //               if (err) console.error ('Error when writing to database', err);
// //             });

// //             return done (null, newUser, {
// //               message: 'User has been registered successfully.',
// //             });
// //           }
// //         });
// //       });
// //     }
// //   )
// // );

// passport.use (
//   'login',
//   new LocalStrategy (
//     {
//       usernameField: 'email',
//     },
//     (email, password, done) => {
//       User.findOne ({email: email}, (err, foundUser) => {
//         if (err) return done (err);

//         if (!foundUser) {
//           return done (null, false, {
//             message: 'Invalid Username or Password.',
//           });
//         }

//         if (!foundUser.comparePassword (password)) {
//           return done (null, false, {
//             message: 'Invalid Username or Password.',
//           });
//         }

//         return done (null, foundUser);
//       });
//     }
//   )
// );

// //Routes --->

// app.get ('/user', (req, res, next) => {
//   if (req.isAuthenticated ()) {
//     res.json ({user: req.user});
//     return next ();
//   }

//   res.status (400).json ({message: 'Request is not authenticated.'});
// });

// // app.post (
// //   '/signup',
// //   passport.authenticate ('signup', {
// //     successRedirect: '/user',
// //     failureMessage: true,
// //     successMessage: true,
// //   })
// // );

// app.post (
//   '/login',
//   passport.authenticate ('login', {
//     successRedirect: '/user',
//     failureMessage: true,
//     successMessage: true,
//   })
// );

// // app.post ('/logout', (req, res) => {
// //   if (req.user) {
// //     req.session.destroy ();
// //     req.logout ();
// //     res.clearCookie ('connect.sid');
// //     return res.json ({message: 'User is now logged out.'});
// //   } else {
// //     return res.json ({message: 'Error: No user to log out.'});
// //   }
// // });

// app.listen (port, () => {
//   console.log (`Started listening on PORT: ${port}`);
// });




























