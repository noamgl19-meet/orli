import React from 'react';

// CSS
import './css/product.css'

export default function Product(productData, productObject) {


    // Create info of product
    if(productData.length!==0) {
        // Save viewed product
        localStorage.setItem('viewed-product-object', productData.object);
        localStorage.setItem('viewed-product-id', productData.id);

        // Create info product
        createInfoProduct();
    }
    
    // Functions

    // Fill every thing
    function createInfoProduct() {

        // Set name of product 
        document.getElementById('name').innerHTML = productData.name;

        // Set description of product 
        document.getElementById('description').innerHTML = productData.description;

        // Set allergic of product 
        document.getElementById('allergic').innerHTML = productData.allergic;

        // Set price of product 
        document.getElementById('price').innerHTML = productData.price;
        
        // Set image of product
        let images = productData.images.split(',');
        
        // If more then one
        if(images.length > 1) {
            console.log(images);
            // Create navigation arrows
            document.getElementById('LArrow').style.display = 'block';
            document.getElementById('RArrow').style.display = 'block';

            // Reheight th arrows
            let height = document.getElementById('product-img').offsetHeight;
            
            document.getElementById('LArrow').style.paddingTop = height/2 + 'px';
            document.getElementById('RArrow').style.paddingTop = height/2 + 'px';
            // 

            // Create image
            document.getElementById('product-img').src = images[0];

            // Save the rest of the images
            // if(sessionStorage.getItem('images')) {
            //     // Remove any old lists
            //     // sessionStorage.setItem('images', '')
            //   }
            //   else {
            //     // Upload images
            //     sessionStorage.setItem('images', images)
            //   }
            sessionStorage.setItem('images', images)
        }
        else {
            // if one
            document.getElementById('product-img').src = images[0];
        }
    }

    // Swipe thourgh photos
    function prev() {
        // Get list of all of the images 
        let images = sessionStorage.getItem('images').split(',');

        //  Get the current img on display
        let src = document.getElementById('product-img').src;
        
        for(let i = 0; i<images.length ; i++) {
            if(images[i]===src) {
                if(i===0) {
                    document.getElementById('product-img').src = images[images.length-1];
                }
                else {
                    document.getElementById('product-img').src = images[i-1];
                }
            }
        }
    }

    function next() {
        // Get list of all of the images 
        let images = sessionStorage.getItem('images').split(',');

        //  Get the current img on display
        let src =  document.getElementById('product-img').src;

        for(let i = 0; i<images.length ; i++) {
            if(images[i]===src) {
                if(i===images.length - 1) {
                    document.getElementById('product-img').src = images[0];
                }
                else {
                    document.getElementById('product-img').src = images[i+1];
                }
            }
        }
    }

    //  Quit product page
    function quitProduct() {
        // Go back to the main page
        window.location = "/" + productObject;
    }

    // Add to cart by adding product to local storage
    function AddToCart() {
        let productsInCart = [];

        // Checks if exists and retrives cart products if so
        if(localStorage.getItem('shopping-bag-items')) {
            productsInCart = localStorage.getItem('shopping-bag-items').split(',');
        }
        
        // Get viewed product id and object
        let id = localStorage.getItem('viewed-product-id');
        let object = localStorage.getItem('viewed-product-object');
        
        // Create the phrase
        let phrase = object + ':' + id;

        // Save list of new products
        let newProductsInCart = [];
        let exists = false;

        // Check if phrase already exists in cart
        for(let product of productsInCart) {
            // Check if there is already more then one 
            if(product.split('+')[0]===phrase) {
                // Check if its about to be the second product
                if(product.split('+')[1]===undefined) {
                    newProductsInCart.push(phrase + '+2');
                }
                else {
                    // If more then two take the last amount and increase it by 1
                    let amount = parseInt(product.split('+')[1]);
                    newProductsInCart.push(phrase + '+' + (amount + 1));
                }

                // Turn flag into true  
                exists = true;
            }
            else {
                // If its the first of that product just insert it
                newProductsInCart.push(product);
            }
        }

        // If object not exits just insert new object
        if(!exists) {
            // Push new product
            newProductsInCart.push(phrase);
        }
        
        // Reupload to local storage
        localStorage.setItem('shopping-bag-items', newProductsInCart)

        // Go back to the previous page
        window.location = "/" + productObject;
    }

    return(
        <div>
            <div id="productFrame" className='product-container'>
                <div className="imgcontainer">
                    <span onClick={quitProduct} className="close" title="Close Modal">&#10551;</span>
                </div>

                <div className='product-content'>
                    <div className='uploaded-image-product' id='image'>
                        
                        <div className='nav-col-left' onClick={prev}>
                            <img id='LArrow' src="./icons/arrow-right.png" alt="Left arrow" className="product-prev" />
                        </div>

                        <img id='product-img' alt="product-image" className="product-image"/>
                        
                        <div className='nav-col-right' onClick={next}>
                            <img id='RArrow' src="./icons/arrow-right.png" alt="Right arrow" className="product-next"/>
                        </div>
                        
                    </div>
                
                    <div className='description-product'>
                        <h1 id='name' className='title-desc-product'></h1>

                        <p id='description' className='description-desc'></p>

                        <div className='alergic-desc'>
                            <p className='description-desc alergic'>אלרגנים:</p>
                            <p id='allergic' className='alergic-product-data'></p>
                        </div>

                        <div className='price-desc'>
                            <h1 id='price' className='price-product'></h1>
                            <span className='price-product'>&#8362;</span>
                        </div>

                        {/* <div className='add-to-cart-wrapper'>
                            <button id='add-to-cart' className='add-to-cart' onClick={AddToCart}>הוספה לעגלה &#8678;</button>
                        </div> */}
                    </div>         
                </div>

            </div>
        </div>
    );
}