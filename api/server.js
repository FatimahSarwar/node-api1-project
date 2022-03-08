const express = require('express')
const server = express();
const User = require('./users/model')
// BUILD YOUR SERVER HERE
server.use(express.json());
server.get('/api/users',(req, res) => {
User.find()
.then(users => {
    res.json(users);
});
});

server.get('/api/users/:id', (req, res) => {
   User.findById(req.params.id)
    .then(user => {
        if(user == null){
            res.status(404).json({message: `does not exist`})
        }else{
            res.json(user)
        }
    })
    .catch(() => {
        res.status(400).json({message: `Could not get user`})
    })
})






module.exports = server; // EXPORT YOUR SERVER instead of {}
