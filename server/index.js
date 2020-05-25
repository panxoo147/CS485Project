// index.js -- server side

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/project";
const port = 4000;

mongoose.connect("mongodb://localhost:27017/project",
                  {
                    useNewUrlParser:true,
                    useUnifiedTopology:true
                  }
                );
mongoose.connection.on('connected',()=>{
  console.log("connected")
})

//Schema
const Schema = mongoose.Schema;
const CourseSchema = new Schema(
  {
    CourseID : String,
    Coursename : String,
    CourseDesc : String,
    Credit:Number,
    Rank:Number
  }
)

const CommentSchema = new Schema(
  {
    CourseID : String,
    UserID: String,
    Comment:String,
    Date:String
  }
)

//Model
let courseModel = mongoose.model('courseModel',CourseSchema);
let commentModel = mongoose.model("commentModel",CommentSchema);

courseModel.find().then(user => console.log((user)))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.end("SERVER DB");
})

app.post('/AddCourse', (req, res ,next) => {
  let ID = req.body.id
  let name = req.body.name
  let Desc = req.body.desc
  let credit = req.body.credit
  const data ={
    CourseID : ID,
    Coursename :name,
    CourseDesc :Desc,
    Credit : credit,
    Rank : 0
  }
 

  const newdata = new courseModel(data)
  newdata.save((error)=>{
    if(error)
      console.log('Something happend')
    else 
      console.log("add success")
  })
})


app.get('/course', (req, res) => {
     courseModel.find().then(result => res.json(result))
}); 


app.get('/courseList', (req, res) => {
  courseModel.find().then(result => res.json(result))
});


app.delete('/deleteCourse',(req,res) =>{
  let Id = req.body.ID;
  console.log(req.body)
  courseModel.deleteOne(req.body).then(console.log(Id+" is deleted"))
});

app.put('/UpdataRank',(req,res) => {
  let Rank = req.body.Rank;
  let ID = req.body.CourseID;
  
  courseModel.findOneAndUpdate({CourseID : ID},{$set:{Rank:Rank}}).then(console.log("updated"))

})


app.post('/AddComment', (req, res ,next) => {
  let courseID = req.body.id
  let userID = req.body.userId
  let comment = req.body.comment
  let date = formatDate(new Date())
  const data ={
    CourseID : courseID,
    UserID :  userID,
    Comment : comment,
    Date:date
  }
 
  const newdata = new commentModel(data)
  newdata.save((error)=>{
    if(error)
      console.log('Something happend')
    else 
      console.log("addComment success")
  })
})

app.get('/getComment',(req,res,next) =>{
  commentModel.find().then(result => res.json(result))
})

formatDate=(date) => {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;


    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  
}


app.listen(port, () => console.log(`Server started at port ${port}`));
