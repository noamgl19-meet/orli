import React from 'react';
import {  BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';

// Css
import './App.css';

// Components
import MainBar from './Components/mainbar.js';
import SiteFooter from './Components/sitefooter.js';
import Bakery from './Components/bakery.js';
import Product from './Components/product.js';
import Search from './Components/search.js';
import ShoppingBag from './Components/shoppingbag.js';


// Pages
import Home from './Pages/home.js';
import LogIn from './Pages/login.js';
import Administration from './Pages/administration.js';
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
  return <Administration />;
}

function product() {

  let productId, productObject;

  // Get product info picked by the user
  if(window.location.pathname==='/product') {
    const productInfo = decodeURIComponent(window.location.search.substring(4));
    
    // Split the data and create an api request
    if(productInfo!=='') {
      let productInfoSplit = productInfo.split('&');

      productId = productInfoSplit[0];
      productObject = productInfoSplit[1].substring(7);

      // Call function 
      fetchData(productId, productObject);
    }
  }

  // This function will called only once
  async function fetchData(productId, productObject) {
      // Get the products of the current page from server
      await fetch("https://orlibakeryboutique.herokuapp.com/object_id/", {
          method: "POST",
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({'id' : productId, 'object': productObject})
      })
      .then(function(response){ 
          return response.json();   
      })
      .then(function(productData){ 
          return Product(productData, productObject);
      });
  }
  
  // In case server is not returning anything
  return Product('', productObject);
}

function search() {
  // Get search phrase inserted bt the user
  const searchPhrase = decodeURIComponent(window.location.search.substring(3));
  
  // Call function
  searchProduct(searchPhrase);

  // Gets all of the objects containing phrase 
  async function searchProduct(searchPhrase) {
      // Get the products of the current page from server
      await fetch("https://orlibakeryboutique.herokuapp.com/search_object/", {
          method: "POST",
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({'string' : String(searchPhrase)})
      })
      .then(function(response){ 
          return response.json();   
      })
      .then(function(data){ 
          return Search(data);
      });
  }

  return Search('');
}

function shoppingBag() {
  return <ShoppingBag />
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

  return (
    <div className='outer-wrapper'>
        <MainBar />
        <div className='wrapper'>
          <Router>
            <Routes>
              <Route excat path="/" element={ home() }/>
              <Route path="/login" element={ logIn() } />
              <Route path="/administration" element={ administration() } />
              <Route path="/search" element={ search() } />
              <Route path="/shopping-bag" element={ shoppingBag() } />
              <Route path="/cakes" element={ cakesRoute() } />
              <Route path="/cookies" element={ cookiesRoute() } />
              <Route path="/packages" element={ packagesRoute() } />
              <Route path="/product" element={ product() } />
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