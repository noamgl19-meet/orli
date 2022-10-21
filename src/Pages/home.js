import React from 'react';

// CSS
import './css/home.css';

export default function Home() {

  // Auto scroll to the products
  if(document.getElementById('video')) {
    document.getElementById('video').scrollIntoView()
  }

  return(
    <div className="containers body-content">
      <div className="containers">
        
        <div className="row justify-content-center">
          <video
            id='video'
            className='home-video'
            src="./videos/video.mp4"
            muted
            autoPlay
            loop 
          />
        </div>
        
        <div className="row justify-content-start home-sub-imgs-wrapper">
          <a className="col" href="/packages">
            <div className="col">
              <img className="home-sub-imgs" alt="Packages" width="90%" height="90%" src="./icons/packagesHome.jpg" />

              <p className='home-sub-titles' > מארזים </p>
            </div>
          </a>
          
          <a className="col" href="/cookies">     
            <div className="col">
              <img className="home-sub-imgs" alt="Cookies" width="90%" height="90%" src="./icons/cookiesHome.png" />

              <p className='home-sub-titles' > עוגיות </p>
            </div>
          </a>
          
          <a className="col" href="/cakes">
            <div className="col">
              <img className="home-sub-imgs" alt="Cakes" width="90%" height="90%" src="./icons/cakesHome.jpg" />
              
              <p className='home-sub-titles' > עוגות </p>
            </div>
          </a>


        </div>
                      
        <div className="row justify-content-center">
          <video
            className='slide-show'
            src="./videos/slideshow.mp4"
            muted
            autoPlay
            loop 
          />
        </div>
          
      </div>
    </div>
    );
}