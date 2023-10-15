import { trusted } from 'mongoose';
import {hashPassword, comparePassword} from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validations
        if(!name) {
            return res.send({ errpr: 'Name is Required'})
        }
        if(!email) {
            return res.send({ errpr: 'Email is Required'})
        }
        if(!password) {
            return res.send({ errpr: 'Password is Required'})
        }
        if(!phone) {
            return res.send({ errpr: 'Phonenumber is Required'})
        }
        if(!address) {
            return res.send({ errpr: 'Address is Required'})
        }

        //check user
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Registered. Please Login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = new userModel({name, email, phone, address, password: hashedPassword}).save();
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}