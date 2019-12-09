//import the require dependencies
var express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//app.set('view engine', 'ejs');
var mysql = require('mysql');
// var pool = require('./pool');
const multer = require('multer');
var fs = require('fs');
var clientRouter = require('./routes/clientRoutes');
var ownerRouter = require('./routes/ownerRoutes');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Tina.1234',
    database: 'grubhub',
    debug: false
});


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
var clientEmail = "";
var ownerEmail = "";
var sessionResponse = "";
var orderId;
var id;
var nextOrderId;
var imageId;

var storagePropFiles = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("req.session.user is", JSON.stringify(req.params));
        callback(null, createDirectory(imageId));
    },
    filename: function (req, file, callback) {
        console.log("req", req.body);
        callback(null, file.originalname);
    }
});

// var rootDirectory = "public/images/";
var rootDirectory = "/Users/tinaaggarwal/Documents/GitHub/CMPE273/Lab1-013735592/Grubhub/frontend/public/images/";

var uploadPropFiles = multer({
    storage: storagePropFiles
});

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/upload', uploadPropFiles.single('image'), (req, res) => {
    console.log(req.file.filename)

    if (req.file)
        res.json({
            imageUrl: `/images/${imageId}/${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.")
});


function createDirectory(imageId) {
    if (!fs.existsSync(rootDirectory)) {
        fs.mkdirSync(rootDirectory);
    }
    let directory = rootDirectory + imageId;
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    return directory;
}

app.use('/', clientRouter);
app.use('/', ownerRouter);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

app.listen(8080, ()=>{
    console.log("GraphQL server started on port 8080");
})