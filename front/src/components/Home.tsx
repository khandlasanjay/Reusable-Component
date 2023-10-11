import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    console.log("in home ==================== ");
    const navigate = useNavigate();
    return (
        <>
            <div>Home</div>
            <h1>in home</h1>
            <button onClick={() => navigate('/login')}>Go to Login</button>
        </>
    )
}

export default Home