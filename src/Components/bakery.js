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
    
    // Filter the initial data
    function filterData(data) {
        // Filter data to get only specific product by usign current url
        if(data.message[0].object===window.location.pathname.substring(1)) {
            filteredData = data;
        }
    }
    
    // Get all the tags and create them
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
    
    // On button click transfer to product page
    function productLink(product) {
        // Go to the product page and send what product have been choosen
        window.location = '/product?id=' + product.id + '&object=' + product.object;
    }

    // Build the row in each tag
    function buildProduct(rowProducts, rowNumber) {
        // Create product row div element.
        let productRow = document.createElement('div'); 
                  
        // Set the settings 
        productRow.id = 'product-row-' + rowNumber;
        productRow.className = 'product-row';

        // Append the a element to the products
        document.getElementById('products').appendChild(productRow);

        for(let product of rowProducts)
        {
            // ----- Create product frame div element.
            let productFrame = document.createElement('div'); 
            
            // Set the settings
            productFrame.id = 'product-frame-' + product.name; 
            productFrame.className = 'product-frame';
        
            // Append the a element to the current row
            document.getElementById('product-row-' + rowNumber).appendChild(productFrame);

            // Add event listner that transfer to the product page
            productFrame.addEventListener("click", () => { productLink(product) });
            

            // ------ Create div that will wrap around the img
            let productImgWrapper = document.createElement('div'); 

            // Set the settings
            productImgWrapper.className = 'product-img-wrapper';
            productImgWrapper.id = 'product-img-wrapper-' + product.name; 

            // Append the a element to the current row
            document.getElementById('product-frame-' + product.name).appendChild(productImgWrapper);

            // ------ Upload img to its wrapper
            let productImg = document.createElement('img'); 

            // Set the settings
            productImg.className = 'product-img';
            productImg.id = 'product-img-' + product.name; 

            productImg.src = product.images;

            // Append the a element to the current img wrapper
            document.getElementById('product-img-wrapper-' + product.name).appendChild(productImg);


            // ------ Upload title to product frame
            let productTitle = document.createElement('p'); 

            // Set the settings
            productTitle.className = 'product-title';
            productTitle.id = 'product-title-' + product.name; 

            productTitle.innerText = product.name;

            // Append the a element to the current frame
            document.getElementById('product-frame-' + product.name).appendChild(productTitle);


            // ------ Upload price to product frame
            let productPrice = document.createElement('p'); 

            // Set the settings
            productPrice.className = 'product-price';
            productPrice.id = 'product-price-' + product.name; 

            productPrice.innerText = `₪`+ product.price;

            // Append the a element to the current frame
            document.getElementById('product-frame-' + product.name).appendChild(productPrice);
        }
    }

    // Locigicly create rows for each tag
    function getAllProductsFromTag(filteredData, tag) {
        
        // Rename title to tags name
        document.getElementById('link-title').innerHTML = tag;
        
        // Delete all other tag views
        let products = document.getElementById('products');
        if(products)
        {
            // Remove the old products
            products.remove();

            // Create new products div
            products = document.createElement('div'); 
                  
            // Set the settings 
            products.id = 'products';
            products.className = 'products';
    
            // Append the a element to the products
            document.getElementById('bakeryWrapper').appendChild(products);
        }

        // Get all products from tag
        let rowProducts = []; 

        let numberOfProduct = 0, rowNumber = 1;

        // Get number of product in a tag
        for (let product of filteredData.message) { 
            if(product.tags===tag) {
                numberOfProduct++;
            }
        }
        
        for (let product of filteredData.message) { 
            if(product.tags===tag) {
                // Start saving at least 3 products
                rowProducts.push(product);
                
                // Calculate how many product we have left
                if(rowProducts.length===3){
                    // Run build product on 3 products togther
                    buildProduct(rowProducts, rowNumber);
                  
                    // Reset products to get new ones
                    rowProducts = [];
                
                    // Save row number
                    rowNumber++;
                }

                if(numberOfProduct===1 && rowProducts.length!==0){
                    // Run build product on under then 3 products togther
                    buildProduct(rowProducts, rowNumber);
        
                    // Reset products to get new ones
                    rowProducts = [];
                }

                numberOfProduct--;
            }
        }

        // Auto scroll to the products
        document.getElementById('links-wrapper').scrollIntoView()
    }

    return(
        <div>
            <div>
                <div id='bakeryWrapper' className='bakery-wrapper'>
                    <div>
                        <img src={bannerPath} alt='banner' className='bakery-banner' id='banner'/>
                    </div>

                    <div id='links-wrapper' className='link-wrapper'>
                        <h3 id='link-title' className='link-title'>{route}</h3>
                        
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