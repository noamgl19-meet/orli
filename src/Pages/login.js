import React, {useState} from 'react';

// CSS
import './css/login.css'

export default function LogIn() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    function handleSubmit(e){
        e.preventDefault();
        
        if(username==='orli' && password==='orli123456789')
        {
            // Save data to sessionStorage
            sessionStorage.setItem('access', 'granted');

            // Redirect to administration
            window.location = "/administration";
        }
        else {
            // Create pop up incase of wrong input
            if(!document.getElementById('warning-text')) {
                // Create new products div
                let warning = document.createElement('p'); 
                    
                // Set the settings 
                warning.id = 'warning-text';
                warning.className = 'warning-text';
                warning.innerText = 'שם המשתמש או הסיסמה אינם נכונים';

                // Append the a element to the products
                document.getElementById('warning').appendChild(warning);
            }
        }
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
                    
                    <div id='warning' className='warning'>
                    </div>

                    <div className="container">
                        <label htmlFor="username"><b>Username:</b></label>
                        <input onChange={(e) => setUserName(e.target.value) } className='input-login' type="text" placeholder="Enter Username" name="username" required/>
                      
                        <label htmlFor="password"><b>Password:</b></label>
                        <input onChange={(e) => setPassword(e.target.value) }className='input-login' type="password" placeholder="Enter Password" name="password" required/>

                        <div className='subimitation'>   
                            <button className='button-login' type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}