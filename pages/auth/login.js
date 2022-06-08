import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { unauthPage } from '../../middlewares/authorizationPage'


export async function getServerSideProps(context){
    await unauthPage(context)
    return { props: {}}
}

export default function Login(){

    const [filed , setField] = useState({
        email : '',
        password : '',
    })

    const [status, setStatus] = useState('idle')


    async function loginHandler(e){
        e.preventDefault()

        setStatus('loading')
        
        const loginReq = await fetch('/api/auth/login',{
            headers: {
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body : JSON.stringify(filed),
        })

        if(!loginReq.ok) return setStatus('error : '+ loginReq.status)

        const registerRes = await loginReq.json()

        Cookies.set('token', registerRes.token)

        setStatus(registerRes.message)

        console.log(registerRes)


    }

    function filedHandler(e){
        const name = e.target.getAttribute('name')
        setField({
            ...filed,
            [name] : e.target.value
        })
    }
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={loginHandler.bind(this)}>
            <input type="email" name="email" placeholder="Email" onChange={filedHandler.bind(this)} /> <br/>
            <input type="password" name="password" placeholder="Password" onChange={filedHandler.bind(this)}  /> <br/>

            <button type="submit">Login</button>

            <div>{status}</div>
        </form>

        </div>
    )
}