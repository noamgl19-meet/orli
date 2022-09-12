import React from 'react';

// CSS
import './css/login.css'

export default function logIn() {
    
    function handleSubmit(e){
        e.preventDefault();
        console.log('hii');
    }

    function quit(){
        window.location = "/";
    }

    return(
        <div className='body-login'>    
            <div id="id01-login" className="modal">
                <form className="modal-content animate" onSubmit={handleSubmit} method="post">
                    <div className="imgcontainer">
                        <span onClick={quit} className="close" title="Close Modal">&times;</span>
                        <img src="./icons/user.png" alt="Avatar" className="avatar" />
                    </div>

                    <div className="container">
                        <label htmlFor="username"><b>Username:</b></label>
                        <input className='input-login' type="text" placeholder="Enter Username" name="username" required/>
                      
                        <label htmlFor="password"><b>Password:</b></label>
                        <input className='input-login' type="password" placeholder="Enter Password" name="password" required/>

                        <div className='subimitation'>   
                            <button className='button-login' type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}