import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';


export default async function handler(req, res){
    if(req.method !== 'GET') return res.status(405).send('Method not allowed')   

    const { id } = req.query
    
        const auth = await authorization(req, res)

        const post = await db('posts').where({id}).first()

        if(!post) return res.status(404).send('Post not found')
    
        res.status(200)
        res.json({
            status: 'success',
            message: 'Successfully get a post!',
            data: post
        })

}