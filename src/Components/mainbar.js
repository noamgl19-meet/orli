import React, { useState, useEffect } from 'react';

// CSS
import './css/navbar.css'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function MainBar() {

    const [searchPhrase, setSearchPhrase] = useState();

    // Run function only after every thing is rendered
    useEffect(() => {
        // Shopping bag counter product
        shoppingBagCounter();
    }, []);

    // functions

    // Open side nav
    function openSideNav(e) {
        e.preventDefault();
      
        // Set open button css
        document.getElementById('openbtn').style.display = 'none'; 

        // Set side nav css
        document.getElementById('mySidenav').style.display = 'block';
        document.getElementById('mySidenav').style.width = '20%';
    }

    // Close side nav
    function closeSideNav(e) {
        e.preventDefault();
    
        // Set open button css
        document.getElementById('openbtn').style.display = 'block'; 

        // Set side nav css
        document.getElementById('mySidenav').style.display = 'none'; 
    }

    // Send search phrase to /search
    function Searching(e) {
        e.preventDefault();
        
        // Go to search and send search phrase
        window.location = "/search?q=" + searchPhrase;
    }

    // Count amount of products in the shopping bag from local storage
    function shoppingBagCounter() {
        let numberOfItems = 0;
        
        // Check if user filled shopping bag
        if(localStorage.getItem('shopping-bag-items'))
        {
            numberOfItems = (localStorage.getItem('shopping-bag-items').split(',')).length;
            
            // Check if number already exists if so delete it
            if(document.getElementById('shopping-bag-number')) {
                document.getElementById('shopping-bag-number').remove();
            }

            // Append number of products on the the shopping bag
            let productsNumber = document.createElement('span'); 
                    
            // Set the settings 
            productsNumber.className = 'shopping-bag-number';
            productsNumber.innerHTML = numberOfItems;

            // Append the a element to the shopping bag
            document.getElementById('shopping-bag-wrapper-collapse').appendChild(productsNumber);

            // ------------  Repet process
            productsNumber = document.createElement('span'); 
                    
            // Set the settings 
            productsNumber.className = 'shopping-bag-number';
            productsNumber.innerHTML = numberOfItems;

            // Append the a element to the shopping bag
            document.getElementById('shopping-bag-wrapper').appendChild(productsNumber);
        }
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
                
                <div id='search-form-collapse' className='search-form'>
                    <form id='searchBarCollapse' onSubmit={Searching} className="my-2 my-lg-0">
                            <input id='searchPhrasePhone' onChange={(e) => setSearchPhrase(e.target.value)} type="text" className='search-box' placeholder="חפש..." aria-required="true"/>
                            <button className="search-button" type="submit"><img src="./icons/search.png" height ="17" width="17" /></button>
                    </form>
                </div>

                <div id='shopping-bag-wrapper-collapse' className="shopping-bag-img-collapse">
                    <a href="/shopping-bag">
                        <img src="./icons/shopping-bag.png" alt='shopping bag' className='logo'></img>
                    </a>
                </div>

                <div className="collapse navbar-collapse nav-content">
                    <a className="aaa name" href="/"><img src='./icons/logo.png' alt='logo' className='logo' id='logo'/></a>

                    <form id='searchBar' onSubmit={Searching} className="my-2 my-lg-0">
                        <input onChange={(e) => setSearchPhrase(e.target.value)} type="text" className='search-box' placeholder="חפש..." aria-required="true"/>
                        <button className="search-button" type="submit"><img src="./icons/search.png" height ="17" width="17" /></button>
                    </form>

                    <ul className="menu my-2 my-lg-0">
                        <li>
                            <a className="aa" href="/shopping-bag">
                                <div id='shopping-bag-wrapper' className="shopping-bag-img">
                                    <img src="./icons/shopping-bag.png" alt='shopping bag' className='logo'></img>
                                </div>
                            </a>
                        </li>
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