const User = require('../models/user')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
dotenv.config();


async function registerUser(req, res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({'message':'Please enter email and password'})
        }
        let user = await User.findOne({email: email});
        if (user) {
            return res.status(400).json({message:'Email already taken'})
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user = await User.create({email, password: hashedPassword});
        let jwtToSend = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})

        return res.status(201).json({token: jwtToSend});


    } catch (e) {
        return res.status(500).json({'message': 'Error during creation of user .' + e});

    }

}

async function login(req, res) {
    try {
        console.log("request")
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message:'Please enter email and password'})
        }
        let user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({message:'Not account found'})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            let jwtToSend = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
            return res.status(201).json({token: jwtToSend});

        } else {
            return res.status(400).json({message: "Invalid password"});
        }


    } catch (e) {
        return res.status(500).json({'message': 'Error during creation of user .' + e});

    }

}

async function deleteUser(req, res) {
    try {
        const userId = req.user.id; // Assume this comes from authentication middleware

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        console.log(user)
        return res.status(200).json({message: 'User deleted successfully'});


    } catch (e) {
        return res.status(500).json({'message': 'Error during deleting of user .' + e});

    }

}
async function getCurrentUser(req, res) {
    try {
        return res.status(200).json(req.user );

    } catch (e) {
        return res.status(500).json({'message': 'Error during deleting of user .' + e});

    }

}

module.exports = {registerUser, login, deleteUser,getCurrentUser}
