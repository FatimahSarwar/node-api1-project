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
//GET
server.get('/api/users/:id', (req, res) => {
   User.findById(req.params.id)
    .then(user => {
        if(user == null){
            res.status(404).json({message: `does not exist`})
        }else{
            res.status(200).json(user)
        }
    })
    .catch(() => {
        res.status(400).json({message: `Could not get user`})
    })
})
//POST
server.post('/api/users', (req, res) =>{
    const body = req.body;
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ message:  "Please provide name and bio for the user" });
        return;
    }
  

User.insert(body)
.then(user =>{
    res.status(201).json(user);
})
.catch(() =>{
    res.status(500).json({message:"There was an error while saving the user to the database"})
})
})

//PUT
server.put('/api/users/:id', (req, res) => {
    const user = req.body;

    if(!req.body.name) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    } else if(!req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    }

    User.update(req.params.id, user)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: `The user with the specified ID does not exist`});
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message:"The user information could not be modified" });
        });
});

//Delete
server.delete('/api/users/:id', (req, res) => {
    
    User.remove(req.params.id)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: `does not exist` });
                
            } else {res.status(200).json(user);}

            
        })
        .catch(() => {
            res.status(400).json({ message: `could not delete user!` });
        });
});



module.exports = server; // EXPORT YOUR SERVER instead of {}
