import db from '../../../libs/db';
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res){
    if(req.method !== 'POST') return res.status(405).send('Method not allowed')

    const auth = await authorization(req, res)

    const { title, content } = req.body;

    const create = await db('posts').insert({
        title: title,
        content: content
    })
    const createdData = await db('posts').where('id', create);
    res.status(200)
    res.json({
        status: 'success',
        message: 'Successfully created a post!',
        data: createdData
    })
}