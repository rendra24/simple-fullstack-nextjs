import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){

    if(req.method !== 'POST') return res.status(405).send('Method not allowed')

    const {email, password} = req.body

    const checkUser = await db('users').where({email}).first()

    if(!checkUser) return res.status(401).send('User not found')

    const checkPassword = await bcrypt.compare(password, checkUser.password)

    if(!checkPassword) return res.status(401).send('Password is incorrect')

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, 'ibukusupercantiklo', {
        expiresIn: '3d'
    })



    res.status(200)
    res.json({
        status: 'success',
        message: 'Successfully Login!',
        token
    })
}