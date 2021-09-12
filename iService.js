const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const validator = require("validator")
const IService = require("./models/User.js")
mongoose.connect("mongodb://localhost:27017/iServiceDB", {useNewUrlParser:true})
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

/*app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/iService.html")
})

app.post('/', (req,res)=>{
    const country = req.body.country
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const repassword = req.body.repassword
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const postcode = req.body.postcode
    const phonenumber = req.body.phonenumber

    const iService = new IService({
        _country:country,
        _firstname:firstname,
        _lastname:lastname,
        _email:email,
        _password:password,
        _repassword:repassword,
        _address:address,
        _city:city,
        _state:state,
        _postcode:postcode,
        _phonenumber:phonenumber
    })
    if(password!=repassword)
    {
        console.log("Password is not match")
    }
    else{
        iService.save((err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("succeed")
            }
        })
    }
})*/

app.route('/experts')
.get((req, res)=>{
    IService.find((err, iserviceList)=>{
        if (err){res.send(err)}
        else {res.send(iserviceList)}
    })
})
.post((req,res)=>{
    const expert = new IService({
        _country: req.body.country,
        _firstname: req.body.firstname,
        _lastname: req.body.lastname,
        _email: req.body.email,
        _password: req.body.password,
        _repassword: req.body.repassword,
        _address: req.body.address,
        _city: req.body.city,
        _state: req.body.state,
        _postcode: req.body.postcode,
        _phonenumber: req.body.phonenumber
    })
    expert.save((err)=>{
        if(err){res.send(err)}
        else res.send("Successfully added a new task")
    })
})
.delete((req, res)=>{
    IService.deleteMany((err) =>{
        if(err) {res.send(err)}
        else {res.send('Successfully delete all info')}
    })
})

app.route('/experts/:temail')
.get((req, res) =>{
    IService.findOne({_email: req.params.temail},(err, foundIService)=>{
        if(foundIService) (res.send(foundIService))
        else res.send("No Matched")
    })
})
.put((req, res) =>{
    IService.update({_email: req.params.temail},
        {_country: req.body.country,
        _firstname: req.body.firstname,
        _lastname: req.body.lastname,
        _email: req.body.email,
        _password: req.body.password,
        _repassword: req.body.repassword,
        _address: req.body.address,
        _city: req.body.city,
        _state: req.body.state,
        _postcode: req.body.postcode,
        _phonenumber: req.body.phonenumber},
        {overwrite: true},
        (err)=>{
            if(err) {res.send(err)}
            else {res.send("Successfully updated")}
        })
})
.delete((req, res)=>{
    IService.deleteOne({_email: req.params.temail},
        (err)=>{
            if(err) {res.send(err)}
            else {res.send("Successfully deleted")}
        })
})
.patch((req, res)=>{
    IService.update({_email: req.params.temail},
        {$set: {_address: req.body.address,
                _phonenumber: req.body.phonenumber,
                _password: req.body.password,
                _repassword: req.body.repassword}},
        (err)=>{
            if(err) {res.send(err)}
            else {res.send("Successfully updated")}
        })
})




app.listen(5000, function(request, response){
    console.log("server is running on port 5000")
})

