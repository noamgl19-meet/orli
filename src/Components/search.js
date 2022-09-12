import React from 'react';

// CSS
import './css/search.css';

export default function Search(data) {
    // Get search phrase from url
    const searchphrase = decodeURIComponent(window.location.search.substring(3));
    
    return(
        <div>
            <h3 className='search-title'> תוצאות חיפוש עבור: { searchphrase }</h3>
            <div className='search-space'>
                <div className='search-object'>
                    
                </div>

            </div>
        </div>
    );
}