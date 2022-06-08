import cookies from 'next-cookies'

export function unauthPage(context){
    return new Promise(resolve => {
        const allcookies = cookies(context)
        
        if(allcookies.token)
        return context.res.writeHead(302, {
            location: '/posts'
        }).end()   

        return resolve('unautothorized')
    })
}

export function authPage(context){
    return new Promise(resolve => {
        const allcookies = cookies(context)
        
        if(!allcookies.token)
        return context.res.writeHead(302, {
            location: '/auth/login'
        }).end()   

        return resolve({
            token: allcookies.token
        })
    })
}