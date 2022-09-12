import React from 'react';

// CSS
import './css/bakery.css';

export default function Bakery(route, data, bannerPath) {

    let tags = [], filteredData;

    // Call functions
    if(data && data.message[0])
        filterData(data)

    if(filteredData)
        getAllTags(filteredData);

    //  Fucntions
    function filterData(data) {
        // Filter data to get only specific product by usign current url
        if(data.message[0].object===window.location.pathname.substring(1)) {
            filteredData = data;
        }
    }
    
    function getAllTags(filteredData) {
        // Get all tags from data 
        for (let product of filteredData.message) { 
            if(!tags.includes(product.tags))
                tags.push(product.tags);
        }

        // Insert tags to the link section
        for (let tag of tags) { 
            // Create anchor element.
            let a = document.createElement('a'); 
                  
            // Set the settings
            a.id = 'link'; 
            a.className = 'link';
            a.innerText = tag;

            // Append the a element to links
            document.getElementById('links').appendChild(a);

            // Add event listner that will show the products
            a.addEventListener("click", () => { getAllProductsFromTag(filteredData, tag) });
        }
    }
    
    function buildProduct(product) {
        console.log(product);

        // Create anchor element.
        let productFrame = document.createElement('div'); 
                  
        // Set the settings
        productFrame.id = 'product-' + product.name; 
        productFrame.className = 'product-frame';
        // productFrame.innerText = tag;

        // Append the a element to links
        document.getElementById('products').appendChild(productFrame);

        // Add event listner that will show the products
        // a.addEventListener("click", () => { getAllProductsFromTag(filteredData, tag) });
    }

    function getAllProductsFromTag(filteredData, tag) {
        // Get all tags from data
        console.log(tag) 
        for (let product of filteredData.message) { 
            if(product.tags===tag) {
                buildProduct(product);
            }
        }
    }

    return(
        <div>
            <div>
                <div className='bakery-banner-wrapper'>
                    <div>
                        <img src={bannerPath} alt='banner' className='bakery-banner' id='banner'/>
                    </div>

                    <div className='link-wrapper'>
                        <h3 className='link-title'>{route}</h3>
                        
                        <div id='links' className='links'>
                            
                        </div>
                    </div>

                    <div id='products' className='products'>

                    </div>
                </div>
            </div>

        </div>
    );
}