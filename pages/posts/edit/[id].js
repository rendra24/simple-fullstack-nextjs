import { useState } from 'react'
import { authPage } from '../../../middlewares/authorizationPage'
import Router from 'next/router'
import Nav from '../../../components/nav'

export async function getServerSideProps(context){
    const { token } = await authPage(context)
    
    const { id } = context.query

    const postReq = await fetch('http://localhost:3000/api/posts/detail/'+id,{
                    headers: { 'Authorization': 'Bearer ' + token }
                    })

        const res = await postReq.json()
   
    return { 
        props: {
            token,
            post: res.data
        }
    } 
}


export default function PostCreate(props){
    const { post } = props
    const [filed , setField] = useState({
        title : post.title,
        content : post.content,
    })

    const [status, setStatus] = useState('idle')


    async function updateHandler(e){
        e.preventDefault()

        setStatus('loading')
        const { token } = props
        const postReq = await fetch('/api/posts/update/' + post.id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            method : 'PUT',
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
            <h1>Post Update</h1>
            <Nav/>
            <p>Post id: {post.id}</p>
            <form onSubmit={updateHandler.bind(this)}>
                <input type="text" name="title" placeholder="Title" onChange={filedHandler.bind(this)} defaultValue={post.title}  /> <br/>
                <textarea  name="content" placeholder="Content" onChange={filedHandler.bind(this)} defaultValue={post.content}></textarea> <br/>
                <button type="submit">Save Change</button>
            </form>
        </div>
    )
}