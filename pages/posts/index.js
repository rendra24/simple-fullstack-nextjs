import { authPage } from '../../middlewares/authorizationPage'
import { useState } from 'react'
import Router from 'next/router'
import Nav from '../../components/nav'

export async function getServerSideProps(context){
    const { token } = await authPage(context)
    
    const postReq = await fetch('http://localhost:3000/api/posts',{
        headers: { 'Authorization': 'Bearer ' + token }
    })
    const posts = await postReq.json()
    return { 
        props: {
            token,
            posts: posts.data
            
        }
    } 
}

export default function Post(props){
    const [posts, setPosts] = useState(props.posts)

    async function deleteHandler(id, e){
        e.preventDefault()
    
        const ask = confirm('Apakah anda setuju post akan di hapus ?');
    
        if(ask){
            const { token } = props
            const deletePost = await fetch(`http://localhost:3000/api/posts/delete/${id}`,{
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method : 'DELETE',
            })
    
            const res = await  deletePost.json()

            const postFiltered = posts.filter(post => {
                return post.id !== id && post
            })

            setPosts(postFiltered)
    
        }
    }

    function editHandler(id){
        Router.push(`/posts/edit/${id}`)
    }

    return(
        <div>
            <h1>Post</h1>
            <Nav />
            {posts.map(post => (
                <div key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <div>
                        <button onClick={editHandler.bind(this, post.id)}>Edit</button>
                        <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
                    </div>
                    <hr/>
                </div>
                
            ))}
        </div>
    )
}