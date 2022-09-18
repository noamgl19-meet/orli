import React, { useEffect } from 'react';

// CSS
import './css/shoppingbag.css';

export default function ShoppingBag() {

    let totalPrice = 0; 

    // Run function only after every thing is rendered
    useEffect(() => {
        // Checks if cart is empty
        isCartEmpty();
    }, []);


    // Functions

    // --------

    // Calculate total price after load - 7
    function calcTotalPriceLoad(){
        // Get all the items
        let items = document.getElementById('cart-content-items').childNodes;
        let totalPrice = 0;

        for(let item of items) {
            // Get id of item
            item = item.id.split('-');
            let id = item[item.length - 1];
            
            // Get price of product
            let price = document.getElementById('cart-content-item-info-price-' + id).innerText.slice(2);
           
            // Calculate the total price
            totalPrice += parseFloat(price);
        }
        
        // If total price is 0 show empty basket 
        if(totalPrice===0) {
            // Create the basket empty cart
            isCartEmpty();

            // Remove the total price wrapper
            document.getElementById('total-price-wrapper').remove();
        }
        else{
            // Upload the new total price
            document.getElementById('total-price').innerHTML = '₪ ' + totalPrice;
        }
    }

    // Delete from cart - 6
    function deleteCartProduct(product, id) {
        
        // Get te id of the product
        id = id.split('-');
        id = id[id.length - 1];

        // Remove the product from the cart view
        document.getElementById('cart-content-item-' + id).remove();

        // Create local storage expretion from product
        let exp = product.object + ':'  + product.id;

        // Get all item experations
        let itemsIdObject = localStorage.getItem('shopping-bag-items').split(',');
        let newItemIdObejct = [];
        
        // Remove the exp from the local storage
        for(let i=0; i<itemsIdObject.length; i++) {
            if(itemsIdObject[i]!==exp) {
                newItemIdObejct.push(itemsIdObject[i]);
            }
        }

        // Rewrite the local storage
        localStorage.setItem('shopping-bag-items', newItemIdObejct);

        // Recalculate the total price
        calcTotalPriceLoad();
    }

    // Calculate total price before load - 5
    function calcTotalPrice(totalPrice, counterTotal) {
        
        // Check if all items have been created
        let numOfObject = document.getElementById('cart-content-items').childNodes.length;

        // Check if thats the last product
        if(numOfObject===counterTotal) {
            let TotalPrice = document.createElement('p'); 
                    
            // Set the settings
            TotalPrice.id = 'total-price';
            TotalPrice.className = 'total-price';
            TotalPrice.innerHTML = '₪ ' + totalPrice;

            // Append the a element to the cart items wrapper
            document.getElementById('total-price-wrapper').appendChild(TotalPrice);

            // -----------
        }
    }

    // Add product to cart list - 4
    function addProductToCartList(product, counter) {
        
        // Append cart item wrapper to cart items wrapper
        let cartItemWrapper = document.createElement('div'); 
                
        // Set the settings
        cartItemWrapper.id = 'cart-content-item-' + counter;
        cartItemWrapper.className = 'cart-content-item';

        // Append the a element to the cart items content wrapper
        document.getElementById('cart-content-items').appendChild(cartItemWrapper);

        // -----------

        // Append cart item info to cart item wrapper
        let cartItemInfo = document.createElement('div'); 
                
        // Set the settings
        cartItemInfo.id = 'cart-content-item-info-' + counter;
        cartItemInfo.className = 'cart-content-item-info';

        // Append the a element to the cart items content wrapper
        document.getElementById('cart-content-item-' + counter).appendChild(cartItemInfo);

        // -----------

       
       
        // Append cart item info name to cart item info wrapper
        let cartItemInfoName = document.createElement('p'); 
                
        // Set the settings
        cartItemInfoName.id = 'cart-content-item-info-name-' + counter;
        cartItemInfoName.className = 'cart-content-item-info-name';
        cartItemInfoName.innerHTML = product.name;

        // Append the a element to the cart items content info wrapper
        document.getElementById('cart-content-item-info-' + counter).appendChild(cartItemInfoName);

        // -----------

        // Append cart item info price to cart item info wrapper
        let cartItemInfoPrice = document.createElement('p'); 
                
        // Set the settings
        cartItemInfoPrice.id = 'cart-content-item-info-price-' + counter;
        cartItemInfoPrice.className = 'cart-content-item-info-price';
        cartItemInfoPrice.innerHTML = '₪ ' + product.price;

        // Append the a element to the cart items content info wrapper
        document.getElementById('cart-content-item-info-' + counter).appendChild(cartItemInfoPrice);

        // -----------

        // Append cart item edit panel wrapper to cart item wrapper
        let cartItemEdit = document.createElement('div'); 
                
        // Set the settings
        cartItemEdit.id = 'cart-content-item-edit-' + counter;
        cartItemEdit.className = 'cart-content-item-edit';

        // Append the a element to the cart items content wrapper
        document.getElementById('cart-content-item-' + counter).appendChild(cartItemEdit);

        // -----------

        
        
        // Append cart item edit panel to cart item edit panel wrapper
        let editPanel = document.createElement('div'); 
                
        // Set the settings
        editPanel.id = 'edit-panel-' + counter;
        editPanel.className = 'edit-panel';

        // Append the a element to the cart items edit panel wrapper
        document.getElementById('cart-content-item-edit-' + counter).appendChild(editPanel);

        // -----------

        // Append plus img to cart item edit panel wrapper
        let editPanelPlus = document.createElement('img'); 
                
        // Set the settings
        editPanelPlus.id = 'edit-panel-plus-img-' + counter;
        editPanelPlus.className = 'edit-panel-plus-img';
        editPanelPlus.src = './icons/plus-sign.png'

        // Append the a element to the cart items edit panel wrapper
        document.getElementById('edit-panel-' + counter).appendChild(editPanelPlus);

        // -----------

        // Append minus img to cart item edit panel wrapper
        let editPanelNumber = document.createElement('p'); 
                
        // Set the settings
        editPanelNumber.id = 'edit-panel-number-' + counter;
        editPanelNumber.className = 'edit-panel-number';
        editPanelNumber.innerHTML = '1';
        
        // Append the a element to the cart items edit panel wrapper
        document.getElementById('edit-panel-' + counter).appendChild(editPanelNumber);

        // -----------

        // Append minus img to cart item edit panel wrapper
        let editPanelMinus = document.createElement('img'); 
                
        // Set the settings
        editPanelMinus.id = 'edit-panel-minus-img-' + counter;
        editPanelMinus.className = 'edit-panel-minus-img';
        editPanelMinus.src = './icons/minus.png'
        
        // Append the a element to the cart items edit panel wrapper
        document.getElementById('edit-panel-' + counter).appendChild(editPanelMinus);

        // -----------


        // Append trash can wrapper to cart item edit panel wrapper
        let trashCanWrapper = document.createElement('div'); 
                
        // Set the settings
        trashCanWrapper.id = 'item-trash-can-wrapper-' + counter;
        trashCanWrapper.className = 'item-trash-can-wrapper';

        // Append the a element to the cart items edit panel wrapper
        document.getElementById('cart-content-item-edit-' + counter).appendChild(trashCanWrapper);

        // -----------

        // Append trash can to trash can wrapper
        let trashCan = document.createElement('img'); 
                
        // Set the settings
        trashCan.id = 'item-trash-can-' + counter;
        trashCan.className = 'item-trash-can';
        trashCan.src = './icons/trash-can.png';

        // Append the a element to the cart item trash can wrapper
        document.getElementById('item-trash-can-wrapper-' + counter).appendChild(trashCan);

        // Add event listner that transfer to the product page
        trashCan.addEventListener("click", (e) => {deleteCartProduct(product, e.target.id)});
          
        // -----------

    }

    // Get product from server - 3
    async function fetchProduct(productObject, productId, counter, counterTotal) {
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
            // Calculate total price
            totalPrice += parseFloat(productData.price);
            
            // Round the total price
            totalPrice = Number((totalPrice).toFixed(1));
            
            // Append total price to cart
            calcTotalPrice(totalPrice, counterTotal)

            // Create the product
            addProductToCartList(productData, counter);
        });
    }

    // Get products id and get them from server - 2
    async function getProdcutsFromCart() {
        let itemsIdObject = localStorage.getItem('shopping-bag-items').split(',');
        let counter = 0;

        for(let itemidobject of itemsIdObject) {
            // Split itemidobject
            let object = itemidobject.split(':')[0];
            let id = itemidobject.split(':')[1];
            
            // Fetch data and create cart content
            fetchProduct(object, id, counter, itemsIdObject.length - 1);

            counter++;
        }
    }

    // Checks if cart is empty if not creating the cart content - 1
    function isCartEmpty() {
        let cartItems = localStorage.getItem('shopping-bag-items');
        
        // Checks if empty
        if(!cartItems || cartItems===null)
        {
            // Append shopping basket wrapper to cart content
            let shoppingBasket = document.createElement('div'); 
                    
            // Set the settings
            shoppingBasket.id = 'shopping-basket';
            shoppingBasket.className = 'shopping-basket';

            // Append the a element to the cart content
            document.getElementById('cart-content').appendChild(shoppingBasket);

            // -----------

            // Append shopping basket img to shopping basket wrapper
            let shoppingBasketImg = document.createElement('img'); 
                    
            // Set the settings
            shoppingBasketImg.id = 'shopping-basket-img';
            shoppingBasketImg.className = 'shopping-basket-img';
            shoppingBasketImg.src = './icons/shopping-basket.png';

            // Append the a element to the shopping basket wrapper
            document.getElementById('shopping-basket').appendChild(shoppingBasketImg);

            // -----------

            // Append shopping basket title to shopping basket wrapper
            let shoppingBasketTitle = document.createElement('p'); 
                    
            // Set the settings
            shoppingBasketTitle.id = 'shopping-basket-title';
            shoppingBasketTitle.className = 'shopping-basket-title';
            shoppingBasketTitle.innerHTML = 'הסל שלך ריק';

            // Append the a element to the shopping basket wrapper
            document.getElementById('shopping-basket').appendChild(shoppingBasketTitle);

            // -----------

            // Disable pay button
            document.getElementById('pay-btn').disabled = true;
        }
        else {
            // Add css and html as preperation for items
            document.getElementById('cart-content').classList += ' cart-content-filled';

            // Append cart items wrapper to cart content
            let cartItemsWrapper = document.createElement('div'); 
                    
            // Set the settings
            cartItemsWrapper.id = 'cart-content-items';
            cartItemsWrapper.className = 'cart-content-items';

            // Append the a element to the cart content
            document.getElementById('cart-content').appendChild(cartItemsWrapper);

            // -----------

            // Append cart items wrapper to cart content
            let cartTotalPrice = document.createElement('div'); 
                    
            // Set the settings
            cartTotalPrice.id = 'total-price-wrapper';
            cartTotalPrice.className = 'total-price-wrapper';

            // Append the a element to the cart content
            document.getElementById('cart-content').appendChild(cartTotalPrice);

            // -----------

            // Append cart items title to cart items wrapper
            let cartTotalPriceTitle = document.createElement('p'); 
                    
            // Set the settings
            cartTotalPriceTitle.id = 'total-price-title';
            cartTotalPriceTitle.className = 'total-price-title';
            cartTotalPriceTitle.innerHTML = 'סה"כ';

            // Append the a element to the cart items wrapper
            document.getElementById('total-price-wrapper').appendChild(cartTotalPriceTitle);

            // -----------

            // Get product and fill cart
            getProdcutsFromCart();
        }
    }

    // --------

    // Send pay request to server
    function pay() {

    }

    // --------
    
    // Resets the order by deleting local storage
    function resetOrder() {
        localStorage.setItem('shopping-bag-items', '');

        // Remove the old items
        document.getElementById('cart-content-items').remove();
        document.getElementById('total-price-wrapper').remove();

        // Checks if cart is empty
        isCartEmpty();
    }

    // --------

    return(
        <div className='shopping-cart'>
           
            <div className="cart-wrapper">
                <div className="cart-header-title">
                    <div>
                        <h1>סיכום הזמנה</h1>
                    </div>
                </div>

                <div id='cart-content' className='cart-content'>

                </div>

                <div className='button-wrapper'>
                    <button onClick={pay} type="button" id='pay-btn' className="btn-approve-cart">לתשלום</button>

                    <button onClick={resetOrder} type="button" id='reset-order-btn' className="restart-order">איפוס הזמנה</button>
                </div>
            </div>
        </div>
    );
}