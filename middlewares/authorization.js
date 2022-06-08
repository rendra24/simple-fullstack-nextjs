import jwt from 'jsonwebtoken';

export default function authorization(req, res){

    return new Promise(function(resolve, reject){

        const {authorization} = req.headers

        if(!authorization) return res.status(401).send('No token provided')

        const token = authorization.split(' ')

        const [authType, authToken] = [
            token[0],
            token[1]
        ]

        if(authType !== 'Bearer') return res.status(401).send('Invalid token')

        return jwt.verify(authToken, 'ibukusupercantiklo', function(err, decoded){
            if(err) return res.status(401).send('Invalid token')
            return resolve(decoded)
        })

    })
}
