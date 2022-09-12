import React, { useState } from 'react';

// CSS
import './css/contact.css';

export default function Contact() {

    const [fullname, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [content, setContent] = useState();

    function handleSubmit(e){
        e.preventDefault();
        
        // Combine all data to a json
        var data = {
          "fullname" : fullname ,
          "phone": phone ,
          "email" : email ,
          "content": content
        }
    
        fetch("http://127.0.0.1:8000/sendmail/", {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(function(response){ 
          return response.json();   
        })
        .then(function(data){ 
        //   console.log(data)
        });

        // Reload to the contact page
        window.location = "/contact";
    }

    return(
        <div className='contact'>  
            <div className='info'>
                <h1 className='title-contact'>רעבים לעוד?</h1>
                <div className='information'>
                    <p>מייל: orlizaurov10@gmail.com</p>
                    <p>טלפון: 0543083244</p>
                </div>
            </div>  
            <div className='frame-wrapper'>
                <div className='frame'>
                    <h1 className='title-contact'>צרו איתנו קשר</h1>
                    <p className='information'>נשמח לשמוע מכם</p>

                    <form className='form-contact' onSubmit={handleSubmit} method="post">
                        <div className="container-contact">
                            <div className='user-info'>
                                <input onChange={(e) => setFullName(e.target.value)} className='input-contact' type="text" placeholder="* שם מלא" name="fullname" required/>
                            
                                <input onChange={(e) => setPhone(e.target.value)} className='input-contact' type="text" placeholder="* טלפון" name="phone" required/>

                                <input onChange={(e) => setEmail(e.target.value)} className='input-contact' type="text" placeholder="* אימייל" name="email" required/>
                            </div>

                            <div>
                                <textarea onChange={(e) => setContent(e.target.value)} className='content' type="text" placeholder="* תוכן הפנייה" name="content" required/>
                            </div>
                            
                            <div className='subimitation-contact'>   
                                <button className='button-contact' type="submit">שליחה</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}