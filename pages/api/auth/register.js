import db from '../../../libs/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res){
    if(req.method !== 'POST') return res.status(405).send('Method not allowed')

    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    
    
    const register = await db('users').insert({
        email: email,
        password: passwordHash
    })

    const registeredUser = await db('users').where('id', register).first()

    res.status(200)
    res.json({
        status: 'success',
        message: 'Successfully register!',
        data: registeredUser
    })
}