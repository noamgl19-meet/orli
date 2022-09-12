import React from 'react';

import './css/pagenotfound.css'

export default function NotFound() {
  return(
    <div className='page-not-found'>    
        <h4>404 Page Not Found - הדף אינו נמצא</h4>
        <a className='aa' href='/'>חזור לדף הבית</a>
    </div>
  );
}