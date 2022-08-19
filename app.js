
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const ejs = require("ejs");


const axios = require("axios");

const app = express();


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req,res){
    // res.sendFile(__dirname + "/index.html");
    res.render("index.ejs", {percentage: 0});

});

app.post("/calculate", function(req,res){

    name1 = req.body.name1;
    name2 = req.body.name2;
    const options = {
        method: 'GET',
        url: 'https://love-calculator.p.rapidapi.com/getPercentage',
        params: {sname: name1, fname: name2},
        headers: {
          'X-RapidAPI-Key': '68940fc5a4msha19e3382e40c5bdp1880e1jsna4b16391b05b',
          'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
        }
      };

    axios.request(options).then(function (response) {
        // console.log(response.data.percentage);
        let percentage = response.data.percentage;
        // res.write("<h3>" + percentage + "%</h3>");
        // res.redirect("/");
        res.render("perrcentage.ejs", {percentage: percentage});
    }).catch(function (error) {
        console.error(error);
    });
    

});

app.listen(3000, function(){
    console.log("Server Running on port 3000");
});