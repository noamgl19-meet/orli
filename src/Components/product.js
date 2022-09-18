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
        console.log(productData)

        // Set name of product 
        document.getElementById('name').innerHTML = productData.name;

        // Set description of product 
        document.getElementById('description').innerHTML = productData.description;

        // Set allergic of product 
        document.getElementById('allergic').innerHTML = productData.allergic;

        // Set price of product 
        document.getElementById('price').innerHTML = productData.price;
        
        // Set image of product

        // If more then one
        if(productData.images.length > 1) {

        }
        else {
            // if one
            document.getElementById('add').src = productData.images[0];
        }
    }

    // Swipe thourgh photos
    function prev() {
        // // Delete the image with add id in order to replace it
        // document.getElementById('add').remove();
        
        // // Create new img and upload it instead of the add sign
        // var output = new Image();
        // document.getElementById('image').appendChild(output);

        // // Uploading the picture and add the class
        // let index;
        // if(picNum===0) {
        //     index = files.length;
        // }
        // else {
        //     index = picNum;
        // }

        // output.src = URL.createObjectURL(files[index - 1]);
        
        // // Update index
        // setPicNum(index - 1);

        // output.classList.add("uploaded-image");

        // // For replace incase user regrades uplodaing an image
        // output.id = 'add';
        // output.onclick = uploadImage;
    }

    function next() {
        // // Delete the image with add id in order to replace it
        // document.getElementById('add').remove();
            
        // // Create new img and upload it instead of the add sign
        // var output = new Image();
        // document.getElementById('image').appendChild(output);

        // // Uploading the picture and add the class
        // let index;
        // if(picNum===files.length - 1) {
        //     index = -1;
        // }
        // else {
        //     index = picNum;
        // }
        
        // output.src = URL.createObjectURL(files[index + 1]);

        // // Update index
        // setPicNum(index + 1);

        // output.classList.add("uploaded-image");

        // // For replace incase user regrades uplodaing an image
        // output.id = 'add';
        // output.onclick = uploadImage;
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

        // Push new product
        productsInCart.push(object + ':' + id);

        // Reupload to local storage
        localStorage.setItem('shopping-bag-items', productsInCart)

        // Go back to the previous page
        window.location = "/" + productObject;
    }

    return(
        <div>
            <div id="productFrame" className='product-container'>
                <div className="imgcontainer">
                    <span onClick={quitProduct} className="close" title="Close Modal">&#10551;</span>
                </div>

                <div className='content'>
                    <div className='uploaded-image-product' id='image'>
                        <img id='add' alt="product-image" className=""/>

                        <img id='LArrow' src="./icons/left-arrow.png" alt="Left arrow" className="prev" onClick={prev}/>
                        <img id='RArrow' src="./icons/arrow-right.png" alt="Right arrow" className="next" onClick={next}/>
                    </div>
                
                    <div className='description-product'>
                        <h1 id='name' className='title-desc-product'></h1>

                        <p id='description' className='description-desc'></p>

                        <div className='alergic-desc'>
                            <p className='description-desc alergic'>אלרגנים:</p>
                            <p id='allergic' className='alergic-data'></p>
                        </div>

                        <div className='price-desc'>
                            <h1 id='price' className='price-product'></h1>
                            <span className='price-product'>&#8362;</span>
                        </div>

                        <div className='add-to-cart-wrapper'>
                            <button id='add-to-cart' className='add-to-cart' onClick={AddToCart}>הוספה לעגלה &#8678;</button>
                        </div>
                    </div>         
                </div>

            </div>
        </div>
    );
}