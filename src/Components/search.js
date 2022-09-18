import React from 'react';

// CSS
import './css/search.css';

export default function Search(searchData) {

    // Get search phrase from url
    let searchPhrase = decodeURIComponent(window.location.search.substring(3));  

    
    // Call function 
    if(document.getElementById('search-space') && searchData.length!==0){
        createSearchResults(searchData);
    }
    

    // Functions

    // Create all of the results
    function createSearchResults(searchData) {
        // For id tagging
        let counter = 0;

        // Go through the result of the search
        for(let searchResult of searchData) {
            // ----------
           
            // Append search object to search space
            let searchObject = document.createElement('div'); 
                    
            // Set the settings 
            searchObject.id = 'search-object-' + counter;
            searchObject.className = 'search-object';

            // Append the a element
            document.getElementById('search-space').appendChild(searchObject);
            
            // Add event listner that transfer to the product page
            searchObject.addEventListener("click", () => { window.location = '/product?id=' + searchResult.id + '&object=' + searchResult.object });
            
            // --------------

            // Append search object wrapper to search object
            let searchObjectWrapper = document.createElement('div'); 
                    
            // Set the settings 
            searchObjectWrapper.id = 'search-object-wrapper-' + counter;
            searchObjectWrapper.className = 'search-object-wrapper';

            // Append the a element
            document.getElementById('search-object-'  + counter).appendChild(searchObjectWrapper);

            // --------------

            // Append search object img wrapper to search object wrapper
            let searchObjectImgWrapper = document.createElement('div'); 
                    
            // Set the settings 
            searchObjectImgWrapper.id = 'search-object-img-wrapper-' + counter;
            searchObjectImgWrapper.className = 'search-object-img-wrapper';

            // Append the a element
            document.getElementById('search-object-wrapper-' + counter).appendChild(searchObjectImgWrapper);

            // --------------

            // Append search object img to search object img wrapper
            let searchObjectImg = document.createElement('img'); 
                    
            // Set the settings 
            searchObjectImg.id = 'search-object-img-' + counter;
            searchObjectImg.className = 'search-object-img';
            searchObjectImg.src = searchResult.images[0];

            // Append the a element
            document.getElementById('search-object-img-wrapper-' + counter).appendChild(searchObjectImg);

            // --------------

            // Append search object info to search object wrapper
            let searchObjectInfo = document.createElement('div'); 
                    
            // Set the settings 
            searchObjectInfo.id = 'search-object-info-' + counter;
            searchObjectInfo.className = 'search-object-info';

            // Append the a element
            document.getElementById('search-object-wrapper-' + counter).appendChild(searchObjectInfo);

            // --------------

            // Append search object title to search object info
            let searchObjectTitle = document.createElement('p'); 
                    
            // Set the settings 
            searchObjectTitle.id = 'search-object-title-' + counter;
            searchObjectTitle.className = 'search-object-title';
            searchObjectTitle.innerHTML = searchResult.name;

            // Append the a element
            document.getElementById('search-object-info-' + counter).appendChild(searchObjectTitle);

            // --------------
            
            // Append search object info price to search object info
            let searchObjectPriceInfo = document.createElement('div'); 
                
            // Set the settings 
            searchObjectPriceInfo.id = 'search-object-price-info-' + counter;
            searchObjectPriceInfo.className = 'search-object-price-info';

            // Append the a element
            document.getElementById('search-object-info-' + counter).appendChild(searchObjectPriceInfo);

            // --------------

            // Append search object price to search object price info 
            let searchObjectPrice = document.createElement('h3'); 
                
            // Set the settings 
            searchObjectPrice.id = 'search-object-price-' + counter;
            searchObjectPrice.className = 'search-object-price';
            searchObjectPrice.innerHTML = searchResult.price;

            // Append the a element
            document.getElementById('search-object-price-info-' + counter).appendChild(searchObjectPrice);

            // --------------

            // Append search object info tag price to search object info
            let searchObjectPriceTag = document.createElement('span'); 
                
            // Set the settings 
            searchObjectPriceTag.id = 'search-object-price-tag-' + counter;
            searchObjectPriceTag.className = 'search-object-price-tag';
            searchObjectPriceTag.innerHTML = '₪';

            // Append the a element
            document.getElementById('search-object-price-info-' + counter).appendChild(searchObjectPriceTag);

            // --------------
              

            // Increase counter by one
            counter++;
        }
    }

    return(
        <div>
            <h3 id='searchPhrase' className='search-title'> תוצאות חיפוש עבור: { searchPhrase }</h3>
            
            <div id='search-space' className='search-space'>
                
            </div>
        </div>
    );
}