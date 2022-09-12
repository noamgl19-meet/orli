import React, { useState } from 'react';

// CSS
import './css/navbar.css'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function MainBar(searchData) {

    const [searchPhrase, setSearchPhrase] = useState();

    function openSideNav(e) {
        e.preventDefault();
      
        // Set open button css
        document.getElementById('openbtn').style.display = 'none'; 

        // Set side nav css
        document.getElementById('mySidenav').style.display = 'block';
    }

    function closeSideNav(e) {
        e.preventDefault();
    
        // Set open button css
        document.getElementById('openbtn').style.display = 'block'; 

        // Set side nav css
        document.getElementById('mySidenav').style.display = 'none'; 
    }

    function Searching(e) {
        e.preventDefault();
        
        // Go to search and send search phrase
        window.location = "/search?q=" + searchPhrase;
    }

    return(
        <div className='nav-bar'>
            <nav className="navbar navbar-expand-lg navbar-light nav-right">
                
                <div id='toggler' className="navbar-toggler">
                    <button onClick={openSideNav}  id='openbtn' className='openbtn' type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div id="sidenav-wrapper">
                        <div id="mySidenav" className="sidenav">
                            <a className="closebtn" onClick={closeSideNav}>&times;</a>
                            <a className="sidenav-img" href="/"><img src='./icons/logo.png' alt='logo' className='logo' id='logo'/></a>
                            <a className="aa" href="/">בית</a>
                            <a className="aa" href="/cakes">עוגות</a>
                            <a className="aa" href="/cookies">עוגיות</a>
                            <a className="aa" href="/packages">מארזים</a>
                            <a className="aa" href="/about">הסיפור שלנו</a>
                            <a className="aa" href="/contact">צור קשר</a>
                        </div>
                    </div>
                </div>

                <div className="collapse navbar-collapse nav-content">
                    <a className="aaa name" href="/"><img src='./icons/logo.png' alt='logo' className='logo' id='logo'/></a>
                    
                    <form onSubmit={Searching} className="my-2 my-lg-0">
                        <input onChange={(e) => setSearchPhrase(e.target.value)} type="text" className='search-box' placeholder="חפש..." aria-required="true"/>
                        <button className="search-button" type="submit"><img src="./icons/search.png" height ="17" width="17" /></button>
                    </form>
                    
                    <ul className="menu my-2 my-lg-0">
                        <li>
                            <a className="aa" href="/">
                                בית
                            </a>
                        </li>
                        <li>
                            <a className="aa" href="/cakes">
                                עוגות
                            </a>
                        </li>
                        <li>
                            <a className="aa" href="/cookies">
                                עוגיות
                            </a>
                        </li>
                        <li>
                            <a className="aa" href="/packages">
                                מארזים
                            </a>
                        </li>
                        <li>
                            <a className="aa"  href="/about">
                                הסיפור שלנו
                            </a>
                        </li>
                        <li>
                            <a className="aa"  href="/contact">
                                צור קשר
                            </a>
                        </li>
                    </ul>
                </div>
            </nav> 
        </div>
    );
}