import React, { useState, useEffect } from 'react';
import {  BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';

// Css
import './App.css';

// Components
import MainBar from './Components/mainbar.js';
import SiteFooter from './Components/sitefooter.js';
import Bakery from './Components/bakery.js';

// Pages
import Home from './Pages/home.js';
import LogIn from './Pages/login.js';
import Administration from './Pages/administration.js';
import Search from './Components/search.js';
import About from './Pages/about.js';
import Contact from './Pages/contact.js';
import NotFound from './Pages/notfound.js';

// Functions
function home() {
  return <Home />;
}

function logIn() {
  return <LogIn />;
}

function administration() {
  let token = true;
  if(!token)
  {
    logIn();
  }
  else{
    return <Administration />;
  }
}

function search(searchData) {
  return Search(searchData);
}

function cakesRoute() {
  
  // Call function 
  fetchData('cakes');

  // This function will called only once
  async function fetchData(route) {

      // Get the products of the current page from server
      await fetch("https://orlibakeryboutique.herokuapp.com/objects/", {
          method: "POST",
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({'object' : route, 'tags': ''})
      })
      .then(function(response){ 
          return response.json();   
      })
      .then(function(data){ 
          return Bakery('עוגות', data, './icons/cakes-banner.png');
      });
  }
  
  // In case server is not returning anything
  return Bakery('עוגות', '', './icons/cakes-banner.png');
}

function cookiesRoute() {
  
  // Call function 
  fetchData('cookies');

  // This function will called only once
  async function fetchData(route) {

      // Get the products of the current page from server
      await fetch("https://orlibakeryboutique.herokuapp.com/objects/", {
          method: "POST",
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({'object' : route, 'tags': ''})
      })
      .then(function(response){ 
          return response.json();   
      })
      .then(function(data){ 
          return Bakery('עוגיות', data, './icons/cookies-banner.png');
      });
  }

  return Bakery('עוגיות', '', './icons/cookies-banner.png');
}

function packagesRoute() {

  // Call function 
  fetchData('packages');

  // This function will called only once
  async function fetchData(route) {

      // Get the products of the current page from server
      await fetch("https://orlibakeryboutique.herokuapp.com/objects/", {
          method: "POST",
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({'object' : route, 'tags': ''})
      })
      .then(function(response){ 
          return response.json();   
      })
      .then(function(data){ 
          return Bakery('מארזים', data, './icons/plates-banner.png');
      });
  }

  return Bakery('מארזים', '', './icons/plates-banner.png');
}

function about() {
  return About();
}

function contact() {
  return <Contact />;
}

function notFound() {
  return <NotFound />;
}

function App() {
  // const [cakes, setCakes] = useState();
  // const [cookies, setCookies] = useState();
  // const [packages, setPackages] = useState();

  // // Contains all of the products
  let searchData = [];
  
  // // This function will called only once
  // useEffect(() => {
  //   // Fetch all data from server

  //   // Get cakes
  //   // fetch("http://127.0.0.1:8000/objects/", {
  //   //   method: "POST",
  //   //   headers:{
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({'object' : 'cakes'})
  //   // })
  //   // .then(function(response){ 
  //   //   return response.json();   
  //   // })
  //   // .then(function(data){ 
  //   //   console.log(data)
  //   // });

  //   // // Get cookies
  //   // fetch("http://127.0.0.1:8000/objects/", {
  //   //   method: "POST",
  //   //   headers:{
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({'object' : 'cookies'})
  //   // })
  //   // .then(function(response){ 
  //   //   return response.json();   
  //   // })
  //   // .then(function(data){ 
  //   //   console.log(data)
  //   // });

  //   // // Get packages
  //   // fetch("http://127.0.0.1:8000/objects/", {
  //   //   method: "POST",
  //   //   headers:{
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify({'object' : 'packages'})
  //   // })
  //   // .then(function(response){ 
  //   //   return response.json();   
  //   // })
  //   // .then(function(data){ 
  //   //   console.log(data)
  //   // });

  // }, [])

  return (
    <div className='outer-wrapper'>
        
        {MainBar(searchData)}

        <div className='wrapper'>
          <Router>
            <Routes>
              <Route excat path="/" element={ home() }/>
              <Route path="/login" element={ logIn() } />
              <Route path="/administration" element={ administration() } />
              <Route path="/search" element={ search(searchData) } />
              <Route path="/cakes" element={ cakesRoute() } />
              <Route path="/cookies" element={ cookiesRoute() } />
              <Route path="/packages" element={ packagesRoute() } />
              <Route path="/about" element={ about() } />
              <Route path="/contact" element={ contact() } />
              <Route path="*" element={ notFound() } />
            </Routes>
          </Router>
        </div>

      <SiteFooter />

    </div>
  );
}

export default App;