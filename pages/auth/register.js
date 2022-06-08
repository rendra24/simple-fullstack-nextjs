import React , { useState } from 'react'
import { unauthPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps(context){
    await unauthPage(context)
    return { props: {}}
}

export default function Register(){
    const [filed , setField] = useState({
        email : '',
        password : '',
    })

    const [status, setStatus] = useState('idle')
    async function registerHandler(e){
        e.preventDefault()

        setStatus('loading')
        
        const registerReq = await fetch('/api/auth/register',{
            headers: {
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body : JSON.stringify(filed),
        })

        if(!registerReq.ok) return setStatus('error '+ registerReq.status)

        const registerRes = await registerReq.json()

        setStatus('success')

        console.log(registerRes)


    }

    function filedHandler(e){
        const name = e.target.getAttribute('name')
        setField({
            ...filed,
            [name] : e.target.value
        })
    }

    return(
        <div>
        <h1>Register</h1>

        <form onSubmit={registerHandler.bind(this)}>
            <input type="email" name="email" placeholder="Email" onChange={filedHandler.bind(this)} /> <br/>
            <input type="password" name="password" placeholder="Password" onChange={filedHandler.bind(this)}  /> <br/>

            <button type="submit">Register</button>

            <div>{status}</div>
        </form>
        </div>
    )
}