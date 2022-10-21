import React, { useState }  from 'react';


// import parseDataUrl from "data-uri-to-buffer";
import FormData from "form-data";

// CSS
import './css/administration.css'

export default function Administration() {
  const [option, setOption] = useState();
  const [files, setFiles] = useState();
  const [picNum, setPicNum] = useState();

  // Get saved data from sessionStorage
  let token = sessionStorage.getItem('access');

  // Check if user has permissions
  if(token!=='granted') {
    // Redirect back to login if user dont have permissions
    window.location = "/login";
  }

  // Data that being send to server
  const [object, setObject] = useState();
  const [imageslist, setImagesList] = useState();


  // Calls function that create edit page
  if(object!==undefined && document.getElementById('edit-checker')) {
    fetchData(object);
  }

  // This function will called only once
  async function fetchData(object) {
      // Get the products of the current page from server
      await fetch("https://orlibakeryboutique.herokuapp.com/objects/", {
          method: "POST",
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({'object' : object, 'tags': ''})
      })
      .then(function(response){ 
          return response.json();   
      })
      .then(function(data){ 
        createObjectResults(data.message)
      });
  }

  // Saves changes
  async function saveChanges(idOfProduct) {
    // Split id of product
    idOfProduct = idOfProduct.split('-');
    
    // Extract the id number 
    let objectNumber = idOfProduct[idOfProduct.length - 1];
    
    // Get the new price
    let newPrice = document.getElementById('edit-object-price-' + objectNumber).innerText;

    // Get the id of the product 
    let id = document.getElementById('edit-object-id-' + objectNumber).innerText;

    // Create data with new price
    var data = {
      "action" : "update",
      "object" : object,
      "id" : id,
      "price" : newPrice
    }
    
    // Send data to server
    await fetch("https://orlibakeryboutique.herokuapp.com/manage/", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){ 
      return response.json();   
    })
    .then(function(data){ 
      // console.log(data)
    });
  }

  // Delete product
  async function deleteProduct(idOfProduct) {
    // Split id of product
    idOfProduct = idOfProduct.split('-');
    
    // Extract the id number 
    let objectNumber = idOfProduct[idOfProduct.length - 1];
    
    // Get the id of the product 
    let id = document.getElementById('edit-object-id-' + objectNumber).innerText;

    // Remove the product from edit page
    document.getElementById('edit-object-' + objectNumber).remove();
    
    // Create data with new price
    var data = {
      "action" : "delete",
      "object" : object,
      "id" : id
    }
    
    // Send data to server
    await fetch("https://orlibakeryboutique.herokuapp.com/manage/", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){ 
      return response.json();   
    })
    .then(function(data){ 
      // console.log(data)
    });
  }

  // Create all of the results
  function createObjectResults(searchData) {
      // Remove edit checker so the function wont run twice
      document.getElementById('edit-checker').remove();

      // For id tagging
      let counter = 0;
      
      // Go through the result of the object
      for(let searchResult of searchData) {
          // ----------
          
          // Append edit object to edit space
          let editObject = document.createElement('div'); 
                  
          // Set the settings 
          editObject.id = 'edit-object-' + counter;
          editObject.className = 'edit-object';

          // Append the a element
          document.getElementById('edit-space').appendChild(editObject);
          
          // --------------

          // Append edit object wrapper to edit object
          let editObjectWrapper = document.createElement('div'); 
                  
          // Set the settings 
          editObjectWrapper.id = 'edit-object-wrapper-' + counter;
          editObjectWrapper.className = 'edit-object-wrapper';

          // Append the a element
          document.getElementById('edit-object-' + counter).appendChild(editObjectWrapper);

          // --------------

          // Append edit object trash wrapper to edit object wrapper
          let editObjectTrashWrapper = document.createElement('div'); 
                  
          // Set the settings 
          editObjectTrashWrapper.id = 'edit-object-trash-wrapper-' + counter;
          editObjectTrashWrapper.className = 'edit-object-trash-wrapper';

          // Append the a element
          document.getElementById('edit-object-wrapper-' + counter).appendChild(editObjectTrashWrapper);

          // --------------

          // Append edit object trash img to edit object wrapper
          let editObjectTrashImg = document.createElement('img'); 
                  
          // Set the settings 
          editObjectTrashImg.id = 'edit-object-trash-img-' + counter;
          editObjectTrashImg.className = 'edit-object-trash-img';
          editObjectTrashImg.src = './icons/trash-can.png'

          // Append the a element
          document.getElementById('edit-object-trash-wrapper-' + counter).appendChild(editObjectTrashImg);
        
          // Add event listner that transfer to the product page
          editObjectTrashImg.addEventListener("click", (e) => {deleteProduct(e.target.id)});
          
          // --------------

          // Append edit object img wrapper to edit object wrapper
          let editObjectImgWrapper = document.createElement('div'); 
                  
          // Set the settings 
          editObjectImgWrapper.id = 'edit-object-img-wrapper-' + counter;
          editObjectImgWrapper.className = 'edit-object-img-wrapper';

          // Append the a element
          document.getElementById('edit-object-wrapper-' + counter).appendChild(editObjectImgWrapper);

          // --------------

          // Append edit object img to edit object img wrapper
          let editObjectImg = document.createElement('img'); 
                  
          // Set the settings 
          editObjectImg.id = 'edit-object-img-' + counter;
          editObjectImg.className = 'edit-object-img';
          editObjectImg.src = searchResult.images.split(',')[0];

          // Append the a element
          document.getElementById('edit-object-img-wrapper-' + counter).appendChild(editObjectImg);

          // --------------

          // Append edit object info to edit object wrapper
          let editObjectInfo = document.createElement('div'); 
                  
          // Set the settings 
          editObjectInfo.id = 'edit-object-info-' + counter;
          editObjectInfo.className = 'edit-object-info';

          // Append the a element
          document.getElementById('edit-object-wrapper-' + counter).appendChild(editObjectInfo);

          // --------------

          // Append edit object title to edit object info
          let editObjectTitle = document.createElement('p'); 
                  
          // Set the settings 
          editObjectTitle.id = 'edit-object-title-' + counter;
          editObjectTitle.className = 'edit-object-title';
          editObjectTitle.innerHTML = searchResult.name;

          // Append the a element
          document.getElementById('edit-object-info-' + counter).appendChild(editObjectTitle);

          // --------------
          
          // Append edit object info price to edit object info
          let editObjectPriceInfo = document.createElement('div'); 
              
          // Set the settings 
          editObjectPriceInfo.id = 'edit-object-price-info-' + counter;
          editObjectPriceInfo.className = 'edit-object-price-info';

          // Append the a element
          document.getElementById('edit-object-info-' + counter).appendChild(editObjectPriceInfo);

          // --------------

          // Append edit object price to edit object price info 
          let editObjectPrice = document.createElement('h3'); 
              
          // Set the settings 
          editObjectPrice.id = 'edit-object-price-' + counter;
          editObjectPrice.className = 'edit-object-price';
          editObjectPrice.contentEditable = 'true';
          editObjectPrice.innerHTML = searchResult.price;
        
          // Append the a element
          document.getElementById('edit-object-price-info-' + counter).appendChild(editObjectPrice);

          // --------------

          // Append edit object info tag price to edit object info
          let editObjectPriceTag = document.createElement('span'); 
              
          // Set the settings 
          editObjectPriceTag.id = 'edit-object-price-tag-' + counter;
          editObjectPriceTag.className = 'edit-object-price-tag';
          editObjectPriceTag.innerHTML = '₪';

          // Append the a element
          document.getElementById('edit-object-price-info-' + counter).appendChild(editObjectPriceTag);

          // --------------

          // Append edit object save changes wrapper to edit object info
          let editObjectSaveChangesWrapper = document.createElement('div'); 
              
          // Set the settings 
          editObjectSaveChangesWrapper.id = 'edit-object-save-changes-wrapper-' + counter;
          editObjectSaveChangesWrapper.className = 'edit-object-save-changes-wrapper';
          

          // Append the a element
          document.getElementById('edit-object-info-' + counter).appendChild(editObjectSaveChangesWrapper);

          // --------------

          // Append edit object save changes wrapper to edit object info
          let editObjectSaveChangesButton = document.createElement('button'); 
              
          // Set the settings 
          editObjectSaveChangesButton.id = 'edit-object-save-changes-button-' + counter;
          editObjectSaveChangesButton.className = 'edit-object-save-changes-button';
          editObjectSaveChangesButton.innerHTML = 'שמור שינויים';

          // Append the a element
          document.getElementById('edit-object-save-changes-wrapper-' + counter).appendChild(editObjectSaveChangesButton);

          // Add event listner that transfer to the product page
          editObjectSaveChangesButton.addEventListener("click", (e) => {saveChanges(e.target.id)});
          
          // --------------
          
          // Append edit object save changes wrapper to edit object info
          let editObjectId = document.createElement('div'); 
              
          // Set the settings 
          editObjectId.id = 'edit-object-id-' + counter;
          editObjectId.className = 'edit-object-id';
          editObjectId.innerHTML = searchResult.id;

          // Append the a element
          document.getElementById('edit-object-save-changes-wrapper-' + counter).appendChild(editObjectId);

          // Make id be invisible
          document.getElementById('edit-object-id-' + counter).style.display = 'none';

          // Increase counter by one
          counter++;
      }
  }

  // Functions 

  // Show second form
  function handleSubmit0(e) {
    e.preventDefault();
    
    // Make initial form disapper
    const form = document.getElementById('id00');
    form.style.display = 'none';

    if(option==='bakery')
    {
      // Make second form apper
      const secondForm = document.getElementById('id01');
      secondForm.style.display = 'block';
    }
    else {
      // Make our story apper
      const ourStory = document.getElementById('id03');
      ourStory.style.display = 'block';
    } 
  }

  // Show third form
  function handleSubmit1(e) {
    e.preventDefault();
    
    // Make initial form disapper
    const form = document.getElementById('id01');
    form.style.display = 'none';

    // Make new product section apper
    const thirdForm = document.getElementById('id04');
    thirdForm.style.display = 'block';
  }

  // Show create page or edit page of products
  function handleSubmit2(e) {
    e.preventDefault();
    
    // Make initial form disapper
    const thirdForm = document.getElementById('id04');
    thirdForm.style.display = 'none';

    if(option==='new') {
      // Make new product section apper
      const newProductSection = document.getElementById('id02');
      newProductSection.style.display = 'block';
    }
    else {
      // Make new product section apper
      const editProductSection = document.getElementById('id05');
      editProductSection.style.display = 'block';
    }
  }


  // Cancel buttons
  function quit() {
    // clear session storage
    sessionStorage.clear();

    // Go back to the main page
    window.location = "/";
  }

  function backToFirst() {
    // // Disaapear forms if exists
    // document.getElementById('id02').style.display = 'none';
    // document.getElementById('id03').style.display = 'none';
    // document.getElementById('id05').style.display = 'none';

    // // Make third form disapper
    // const secondForm = document.getElementById('id01');
    // secondForm.style.display = 'none';

    // // Show second form
    // const firstForm = document.getElementById('id00');
    // firstForm.style.display = 'block';

    // Go back to the administration page
    window.location = "/administration";
  }

  function backToSecond() {
    // Make third form disapper
    const thirdForm = document.getElementById('id04');
    thirdForm.style.display = 'none';

    // Show second form
    const secondForm = document.getElementById('id01');
    secondForm.style.display = 'block';
  }

  // Api functions to imgbb
 
  // Create the api request with the blob and get back the new image urls and save them
  async function getUrlAfterApiToImgbb(blob) {
    
    const body = new FormData();

    body.append("image", blob);

    const result = await fetch(
      `https://api.imgbb.com/1/upload?key=4422534b146cec14f31fca7b7476c61f`, {
        method: "post",
        body
      }
      ).then(result => result.json())
      .then(data => {

        // Saves the url
        // Checks if  
        let images;
        
        if(sessionStorage.getItem('uploaded-images')) {
          // For multiple images
          images = sessionStorage.getItem('uploaded-images').split(',');
          
          // Push the new image
          images.push(data.data.display_url);

          // Reupload the updated list of images
          sessionStorage.setItem('uploaded-images', images)
        }
        else {
          // For first image
          sessionStorage.setItem('uploaded-images', data.data.display_url)
        }
       
        setImagesList(sessionStorage.getItem('uploaded-images'));
      });
  }

  // Create blob from image src
  function blobMaker(imgSrc) {
    // Get the remote image as a Blob with the fetch API
    fetch(imgSrc)
    .then((res) => res.blob())
    .then((blob) => {
        // Read the Blob and send api request to imgbb
        getUrlAfterApiToImgbb(blob);
    });
  }


  // Uploading an image for create product
  function uploadImage(e) {
    e.preventDefault();

    // Click on the input so the input box will pop up
    document.getElementById("file").click();
  }

  function loadFile(e) {
    e.preventDefault();

    // Incase of one picture upload
    if(e.target.files.length===1) {
      // Delete images with add id
      document.getElementById('add').remove();
      
      // Create new img and upload it instead of the add sign
      var output = new Image();
      document.getElementById('image').appendChild(output);

      // CSS fix
      document.getElementById('image').style.margin = 0;
      document.getElementById('LArrow').style.display = 'none';
      document.getElementById('RArrow').style.display = 'none';

      // Uploading the picture and add the class
      output.src = URL.createObjectURL(e.target.files[0]);

      output.classList.add("uploaded-image");

      // For replace incase user regrades uplodaing an image
      output.id = 'add';
      output.onclick = uploadImage;

      // Create blob and send api request to upload img to imgbb and save in setImagesList
      blobMaker(output.src);
    }

    // Incase of more then one picture upload
    if(e.target.files.length > 1) {
      // Save pictures and index
      setFiles(e.target.files);
      setPicNum(0);
  
      // Delete images with add id
      document.getElementById('add').remove();
      
      // Create new img and upload it instead of the add sign
      var output = new Image();
      document.getElementById('image').appendChild(output);

      // CSS fix
      document.getElementById('image').style.margin = 0;

      // Uploading the picture and add the class
      output.src = URL.createObjectURL(e.target.files[0]);

      // Add class
      output.classList.add("uploaded-image");

      // Fix CSS
      document.getElementById('image').style.position = 'relative';
      document.getElementById('LArrow').style.display = 'block';
      document.getElementById('RArrow').style.display = 'block';

      // For replace incase user regrades uplodaing an image
      output.id = 'add';
      output.onclick = uploadImage;

      // Saves the url
      for(let i=0; i<e.target.files.length; i++) {
        // Create blob and send api request to upload img to imgbb and save in setImagesList
        blobMaker(URL.createObjectURL(e.target.files[i]));
      }
    }
  }

  // Uploading an image for story
  function uploadImageAbout() {
    // Click on the input so the input box will pop up
    document.getElementById("fileAbout").click();
  }

  function loadFileAbout(e) {
    e.preventDefault();
    
    // Checks that user insert an image before deleting the current one
    if(e.target.files[0]) {
      // Delete images with add id
      document.getElementById('addAbout').remove();
      
      // Create new img and upload it instead of the add sign
      var output = new Image();
      document.getElementById('imageAbout').appendChild(output);

      // CSS fix
      document.getElementById('imageAbout').style.border = 'none';

      // Uploading the picture and add the class
      output.src = URL.createObjectURL(e.target.files[0]);
      
      // CSS fix
      output.classList.add("uploaded-image-about");

      // For replace incase user regrades uplodaing an image
      output.id = 'addAbout';
      output.onclick = uploadImageAbout;

      // Create blob and send api request to upload img to imgbb and save in setImagesList
      blobMaker(output.src);
    }
  }

  // Swipe thourgh photos
  function prev() {
    // Delete the image with add id in order to replace it
    document.getElementById('add').remove();
      
    // Create new img and upload it instead of the add sign
    var output = new Image();
    document.getElementById('image').appendChild(output);

    // Uploading the picture and add the class
    let index;
    if(picNum===0) {
      index = files.length;
    }
    else {
      index = picNum;
    }

    output.src = URL.createObjectURL(files[index - 1]);
    
    // Update index
    setPicNum(index - 1);

    output.classList.add("uploaded-image");

    // For replace incase user regrades uplodaing an image
    output.id = 'add';
    output.onclick = uploadImage;
  }

  function next() {
    // Delete the image with add id in order to replace it
    document.getElementById('add').remove();
          
    // Create new img and upload it instead of the add sign
    var output = new Image();
    document.getElementById('image').appendChild(output);

    // Uploading the picture and add the class
    let index;
    if(picNum===files.length - 1) {
      index = -1;
    }
    else {
      index = picNum;
    }
    
    output.src = URL.createObjectURL(files[index + 1]);

    // Update index
    setPicNum(index + 1);

    output.classList.add("uploaded-image");

    // For replace incase user regrades uplodaing an image
    output.id = 'add';
    output.onclick = uploadImage;
  }

  // Create new product
  async function sendDataNewProduct() {
    // Disabling the button
    document.getElementById('send-new-product').disabled = true;

    // Get all the data and combine it to a json
    let name, price, description, tags, allergic;

    name = document.getElementById('name').innerText;
    price = document.getElementById('price').innerText;
    description = document.getElementById('description').innerText;
    tags = document.getElementById('tags').innerText;
    allergic = document.getElementById('alergic').innerText;
    
    // Delete the images from session storage 
    sessionStorage.setItem('uploaded-images', '');

    var data = {
      "object": object,
      "name": name,
      "price": price,
      "description": description,
      "tags": tags,
      "allergic" : allergic,
      "images": imageslist
    }

    await fetch("https://orlibakeryboutique.herokuapp.com/create_product/", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){ 
      return response.json();   
    })
    .then(function(data){ 
      // console.log(data)
    });

    // Go back to the administration page
    window.location = "/administration";
  }

  // Create story page
  async function sendStory() {
    // Disabling the button
    document.getElementById('send-story').disabled = true;

    // Get all the data and combine it to a json
    let story;

    story = document.getElementById('story').innerText;
    // console.log(imageslist,story)
    var data = {
      "story" : story,
      "images" : imageslist
    }

    await fetch("https://orlibakeryboutique.herokuapp.com/set_story/", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){ 
      return response.json();   
    })
    .then(function(data){ 
      // console.log(data)
    });

    // Go back to the administration page
    window.location = "/administration";
  }

  return(
    <div>    
        {/* First form */}
        <div id="id00" className="modal-admin">
          <form className="modal-content-admin animate" onSubmit={handleSubmit0} method="post">
            <div className="imgcontainer">
              <span onClick={quit} className="close" title="Close Modal">&times;</span>
            </div>

            <div className="container-admin first-form">
              <h5 className='h5-admin'>בחר/י איזה עמוד לערוך:</h5>
              <button onClick={() => setOption('bakery')} className='button-admin' type="submit">קונדיטוריה</button>
              <button onClick={() => setOption('about')} className='button-admin' type="submit">הסיפור שלנו</button>
            </div>
          </form> 
        </div>

        {/* Second form */}
        <div id="id01" className="modal-admin">
          <form className="modal-content-admin animate" onSubmit={handleSubmit1} method="post">
            <div className="imgcontainer">
              <span onClick={backToFirst} className="close" title="Close Modal">&#10551;</span>
            </div>

            <div className="container-admin">
              <h5 className='h5-admin'>בחר/י באיזה קטגוריה לבצע שינויים:</h5>
              <button onClick={() => setObject('cakes') } className='button-admin' type="submit">עוגות</button>
              <button onClick={() => setObject('cookies') } className='button-admin' type="submit">עוגיות</button>
              <button onClick={() => setObject('packages') } className='button-admin' type="submit">מארזים</button>
            </div>
          </form> 
        </div>

        {/* Third form */}
        <div id="id04" className="modal-admin">
          <form className="modal-content-admin animate" onSubmit={handleSubmit2} method="post">
            <div className="imgcontainer">
              <span onClick={backToSecond} className="close" title="Close Modal">&#10551;</span>
            </div>

            <div className="container-admin">
              <h5 className='h5-admin'>בחר/י אם לערוך או להוסיף מוצר:</h5>
              <button onClick={() => setOption('edit')} className='button-admin' type="submit">עריכת מוצר</button>
              <button onClick={() => setOption('new')} className='button-admin' type="submit">מוצר חדש</button>
            </div>
          </form> 
        </div>
        
        {/* Bakery create */}
        <div id="id02" className='new-product-container'>
          <div className="imgcontainer">
            <span onClick={backToFirst} className="close" title="Close Modal">&times;</span>
          </div>

          <div className='content'>
            <div className='img-of-product' id='image'>
              <img id='add' src="./icons/plus.png" alt="Add" className="add" onClick={uploadImage}/>
              <input className='input-file' type="file" accept="image/*" name="image" id="file" onChange={loadFile} multiple></input>
              
              <img id='LArrow' src="./icons/left-arrow.png" alt="Left arrow" className="prev" onClick={prev}/>
              <img id='RArrow' src="./icons/arrow-right.png" alt="Right arrow" className="next" onClick={next}/>

            </div>
          
            <div className='description'>
              <h1 id='name' className='title-desc' contenteditable="true">הכניס/י שם מוצר...</h1>

              <p id='description' className='description-desc' contenteditable="true">הכניס/י תיאור למוצר...</p>

              <div className='alergic-desc'>
                <p className='description-desc alergic'>אלרגנים:</p>
                <p id='alergic' className='alergic-data' contenteditable="true">הכניס/י מידע לאלרגנים...</p>
              </div>

              <div className='price-desc'>
                <h1 id='price' className='price' contenteditable="true">הכניס/י מחיר....</h1>
                <span className='price'>&#8362;</span>
              </div>

              <p id='tags' className='description-desc' contenteditable="true">* הכנס/י את שם התיוג תחתיו יווצר המוצר...</p>

            </div>         
          </div>

          <div className='save-btn-space'>
            <button id='send-new-product' className='save-changes-btn' onClick={sendDataNewProduct}>שמור מוצר</button>
          </div>
        </div>

        {/* Bakery edit */}
        <div id="id05" className='edit-product-container'>
          <div className="imgcontainer">
            <span onClick={backToFirst} className="close" title="Close Modal">&times;</span>
          </div>

          <div className='title-wrapper'>
            <h3 className='title'> רשימת המוצרים לעריכה</h3>
          </div>

          <div id='edit-space' className='edit-space'>

          </div>
          <div id='edit-checker'></div>
        </div>

        {/* Our story */}
        <div id="id03" className='our-story'>
          <div className="imgcontainer">
            <span onClick={backToFirst} className="close" title="Close Modal">&times;</span>
          </div>

          <div className='img-of-about'>
            <div className='add-frame' id='imageAbout' onClick={uploadImageAbout}>
              <img id='addAbout' src="./icons/plus.png" alt="AddImage" className="add-about"/>
              <input id="fileAbout" className='input-file' type="file" accept="image/jpg, image/jpeg, image/png" name="image" onChange={loadFileAbout}></input>
            </div>

            <div className='about'>
              <p className='about-title'>הסיפור שלנו</p>
              
              <div id = 'story' contenteditable="true">הכנס/י את הסיפור שלנו...</div>
            </div>

            <div className='save-btn-space'>
              <button id='send-story' className='save-changes-btn' onClick={sendStory}>שמור סיפור</button>
            </div>

          </div>
          
        </div>

    </div>
  );
}