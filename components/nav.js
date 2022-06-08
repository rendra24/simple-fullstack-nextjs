import Link from 'next/link'
import Router from 'next/router'
import Cookies from 'js-cookie'

export default function Nav(){
    function logoutHandler(e){
        e.preventDefault();

        Cookies.remove('token')

        Router.push('/auth/login')
    }
    return (
        <>
         <Link href="/posts">POST</Link>&nbsp; | &nbsp;
        <Link href="/posts/create">Buat Baru</Link> &nbsp; | &nbsp;
        <a href="#" onClick={logoutHandler.bind(this)}>Logout</a>
        </>
    )
}