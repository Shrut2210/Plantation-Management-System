import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

router.post('/signup', async (req, res) => {
    let { username, email, contactNo, location, password, isadmin, adminName } = req.body;

    if (!username || !email || !contactNo || !location || !password) {
        return res.status(422).json({ error: 'please fill the fields properly' })
    }
    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            console.log('user exist!!!');
            return res.status(422).json({ error: 'User already exists' });
        }

        let hashPassword = await bcrypt.hash(password, 12);
        password = hashPassword;

        const newUser = new User({ username, email, contactNo, location, password, isadmin, adminName });
        await newUser.save();

        if (newUser.isadmin == true) {
            return res.status(201).send({ message: "admin registered successfully" + User.email + " and password " + User.password })
        }
        else {
            return res.status(200).send({ message: "user registered successfully" + User.email + " and password " + User.password });
        }

    } catch (err) {
        console.log(err);
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'please enter required details' });
    }

    const Loginuser = await User.findOne({ email: email });

    if (!Loginuser) {
        return res.status(400).send({ message: 'Invalid details' });
    }

    const isMatch = await bcrypt.compare(password, Loginuser.password);

    if (!isMatch) {
        return res.status(400).send({ message: 'Invalid details' });
    }

    if (Loginuser.isadmin == true) {
        return res.status(201).send({ message: "Found the required admin with email" + User.email + " and password " + User.password })
    }
    else {
        return res.status(200).send({ message: "Found the required user with email" + User.email + " and password " + User.password });
    }

})


router.get('/', async (req, res) => {
    let user = await User.find();
    return res.json(user);
})

router.get('/:id', async (req, res) => {
    let user = await User.findOne({email : req.params.id});
    return res.json(user);
});


export default router;