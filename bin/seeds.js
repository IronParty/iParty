const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/iParty2");

const Company = require("../models/Company");
const User = require("../models/User");

const users = [
    {
    userName:"Enrique Garcia",
    email:"jv@nkn.com",
    password:"123"
},
{
    userName:"aliz",
    email:"a@a.a",
    password:"a"
}
]

const companies = [
    {
    title:"Ricky Pics",
    owner:"",
    media:["http://gastv.mx/wp-content/uploads/2014/07/3d39.jpg"],
    description:"pictures for you",
    price:20037,
},
{
    title:"Le Tigre",
    owner:"",
    media:["http://cdn.ismorbo.com/wp-content/uploads/2016/09/le-tigre-2-1000x704.jpg"],
    description:"DJ JD, DJ KH & DJ JF",
    price:30037,
}
]


Company.collection.drop();
User.collection.drop();

User.create(users)
    .then(result => {
        console.log(result);
        companies.forEach(function (e){
            e.owner=result[0]._id
        })
        Company.create(companies)
            .then(result2=>console.log(result2))
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err));



// Company.create(companies, function(err, result){
//     if(err) console.log("Nel",err);
//     console.log("lo lograste", result);
// });

// mongoose.connection.close();