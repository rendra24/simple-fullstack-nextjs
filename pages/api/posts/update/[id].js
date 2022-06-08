import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res){
    if(req.method !== 'PUT') return res.status(405).send('Method not allowed')

    const auth = await authorization(req, res)

    const {id} = req.query
    const {title, content} = req.body
    const update = await db('posts').where({id}).update({title, content})
    res.status(200)
    res.json({
        status: 'success',
        message: 'Successfully get a post!'
    })
}