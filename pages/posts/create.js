import { useState } from 'react'
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router'
import Nav from '../../components/nav'

export async function getServerSideProps(context){
    const { token } = await authPage(context)
    
   
    return { 
        props: {
            token
        }
    } 
}


export default function PostCreate(props){
    const [filed , setField] = useState({
        title : '',
        content : '',
    })

    const [status, setStatus] = useState('idle')


    async function createHandler(e){
        e.preventDefault()

        setStatus('loading')
        const { token } = props
        const postReq = await fetch('/api/posts/create',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            method : 'POST',
            body : JSON.stringify(filed),
        })

        if(!postReq.ok) return setStatus('error : '+ postReq.status)

        const postRes = await postReq.json()

        setStatus(postRes.message)

        Router.push('/posts')


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
            <h1>Post Create</h1>
            <Nav/>
            <form onSubmit={createHandler.bind(this)}>
                <input type="text" name="title" placeholder="Title" onChange={filedHandler.bind(this)}  /> <br/>
                <textarea  name="content" placeholder="Content" onChange={filedHandler.bind(this)} ></textarea> <br/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}