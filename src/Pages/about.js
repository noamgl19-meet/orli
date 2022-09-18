import React from 'react';

// CSS
import './css/about.css';

export default function About() {
    
    
    fetchAbout();

    async function fetchAbout() {
        //  Get data from server
        await fetch("https://orlibakeryboutique.herokuapp.com/get_story/", {
        // method: "POST",
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(function(response){ 
            return response.json();   
        })
        .then(function(data){ 
            // Insert data to the right place
            // console.log(data)
            if(document.getElementById('story') && document.getElementById('banner')) {
                document.getElementById('story').innerText = data.story;
                document.getElementById('banner').src = data.images;
            }
        });
    }
    
    return(
        <div>
            <div>
                <div className='img-of-about'>
                    <div>
                        <img alt='banner' className='banner' id='banner'/>
                    </div>

                    <div className='about'>
                        <p className='about-title'>הסיפור שלנו</p>
                        
                        <div id='story'></div>
                    </div>
                </div>
            </div>

        </div>
    );
}