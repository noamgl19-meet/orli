import React from 'react';

// Css
import './css/sitefooter.css'

export default function SiteFooter() {
  return(
    <div className='footer'>
        <div>
          <ul className="bottom-menu">
                      <li>
                          <a className="aa" href="/about">
                              אודות
                          </a>
                      </li>
                      <li>
                          <a className="aa" href="/cakes">
                              עוגות
                          </a>
                      </li>
                      <li >
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
                          <a className="aa"  href="/contact">
                              צור קשר
                          </a>
                      </li>
          </ul>

          <div className='icons'>
            <a className='icon-link' href="https://www.instagram.com/orlizaurov/" target="_blank"><img src="./icons/instagram.png" height ="20" width="20" /></a>
            <a className='icon-link' href="https://www.facebook.com/profile.php?id=100005022487732" target="_blank"><img src="./icons/facebook.png" height ="20" width="20" /></a>
            <a className='icon-link' href="https://wa.me/972543083244" target="_blank"><img src="./icons/whatsapp.png" height ="20" width="20" /></a>
          </div>
        </div>

        <div className='footfooter'>
          Powered By Shlomi & Noam
        </div>
    </div>
  );
}