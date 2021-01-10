const express=require('express');
const mongoose=require('mongoose');
const app= express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/basicAuthApp', {useNewUrlParser: true});

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
})

const User= mongoose.model('User', userSchema);


app.post('/sign-up',async (req,res) => {
    const { name, email, age, password} = req.body;
    if(name.trim().length <= 4 || name.trim().length > 32) {
        res.status(500).send( { message:"failed to sign up"});
    }
    if(age < 0 || age >100) {
        res.status(500).send( { message:"failed to sign up"});
    }
    if(password.length < 8 || password.length>32) {
        res.status(500).send( { message:"failed to sign up"});
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)” + “(?=.*[-+_!@#$%^&*., ?]).+$/.test(password)) {
        res.status(500).send( { message:"failed to sign up"});
    }
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        res.status(500).send( { message:"failed to sign up"});
    }
    const newUser= new User({name, email, age, password});
    await User.save(newUser);
    res.send({message: "Sign up successful"});
});