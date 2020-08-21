const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const game = require("./gameScript");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://localhost:27017/gameDB", {useNewUrlParser: true,  useUnifiedTopology: true});

const gameSchema = new mongoose.Schema({
    name: String,
    score: Number
});



const gameUser = new mongoose.model("gameUser", gameSchema);

const gameUsers = [];

var Name;
var Score;

app.get("/",function(req,res){

    
    res.render("game");


});

app.post("/", function(req,res){
    
    Name = req.body.Name;
    Score = req.body.Score;

    const markList = new gameUser({
        name: Name,
        score: Score
    });
    
    gameUsers.push(markList);

    markList.save();
      
      
    res.redirect("/result");

})


app.get("/result", function(req, res){

    var mysort = {score: -1}
    gameUser.find({},function(err,foundItem){
        res.render("score", {name: foundItem, score: foundItem});
    }).sort(mysort);
  
})





app.listen(3000, function() {
    console.log("Server started on port 3000");
});