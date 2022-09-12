import React, { useState }  from 'react';

// CSS
import './css/administration.css'

export default function Administration() {
  const [option, setOption] = useState();
  const [files, setFiles] = useState();
  const [picNum, setPicNum] = useState();

  // Data that being send to server
  var images = [];
  const [object, setObject] = useState();
  const [imageslist, setImagesList] = useState();

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
    // Go back to the main page
    window.location = "/";
  }

  function backToFirst() {
    // Disaapear forms if exists
    document.getElementById('id02').style.display = 'none';
    document.getElementById('id03').style.display = 'none';
    document.getElementById('id05').style.display = 'none';

    // Make third form disapper
    const secondForm = document.getElementById('id01');
    secondForm.style.display = 'none';

    // Show second form
    const firstForm = document.getElementById('id00');
    firstForm.style.display = 'block';
  }

  function backToSecond() {
    // Make third form disapper
    const thirdForm = document.getElementById('id04');
    thirdForm.style.display = 'none';

    // Show second form
    const secondForm = document.getElementById('id01');
    secondForm.style.display = 'block';
  }


  // Uploading an image
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
      
      // Saves the url
      images.push(URL.createObjectURL(e.target.files[0]));
      setImagesList(images);

      output.classList.add("uploaded-image");

      // For replace incase user regrades uplodaing an image
      output.id = 'add';
      output.onclick = uploadImage;
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
      
      // Saves the url
      for(let i=0; i<e.target.files.length; i++) {
        images.push(URL.createObjectURL(e.target.files[i]));
      }
      
      setImagesList(images);
            
      output.classList.add("uploaded-image");

      // Fix CSS
      document.getElementById('image').style.position = 'relative';
      document.getElementById('LArrow').style.display = 'block';
      document.getElementById('RArrow').style.display = 'block';

      // For replace incase user regrades uplodaing an image
      output.id = 'add';
      output.onclick = uploadImage;
    }
  }

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

       // Saves the url
      images.push(URL.createObjectURL(e.target.files[0]));
      setImagesList(images);

      output.classList.add("uploaded-image-about");

      // For replace incase user regrades uplodaing an image
      output.id = 'addAbout';
      output.onclick = uploadImageAbout;
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

  async function sendDataNewProduct() {
    // Get all the data and combine it to a json
    let name, price, description, tags, allergic;

    name = document.getElementById('name').innerText;
    price = document.getElementById('price').innerText;
    description = document.getElementById('description').innerText;
    tags = document.getElementById('tags').innerText;
    allergic = document.getElementById('alergic').innerText;
   
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

  async function sendStory() {
    // Get all the data and combine it to a json
    let story;

    story = document.getElementById('story').innerText;

    var data = {
      "story" : story ,
      "images": imageslist
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
            <button className='save-changes-btn' onClick={sendDataNewProduct}>שמור מוצר</button>
          </div>
        </div>

        {/* Bakery edit */}
        <div id="id05" className='edit-product-container'>
          <div className="imgcontainer">
            <span onClick={backToFirst} className="close" title="Close Modal">&times;</span>
          </div>

          {/* <div className='img-of-about'>
            <div className='add-frame' id='imageAbout' onClick={uploadImageAbout}>
              <img id='addAbout' src="./icons/plus.png" alt="AddImage" className="add-about"/>
              <input id="fileAbout" className='input-file' type="file" accept="image/*" name="image" onChange={loadFileAbout}></input>
            </div>

            <div className='about'>
              <p className='about-title'>הeditו</p>
              
              <div id = 'story' contenteditable="true">הכנס/י את הסיפור שלנו...</div>
            </div>

            <div className='save-btn-space'>
              <button className='save-changes-btn' onClick={sendStory}>שמור מוצר</button>
            </div> */}

          {/* </div> */}
          
        </div>

        {/* Our story */}
        <div id="id03" className='our-story'>
          <div className="imgcontainer">
            <span onClick={backToFirst} className="close" title="Close Modal">&times;</span>
          </div>

          <div className='img-of-about'>
            <div className='add-frame' id='imageAbout' onClick={uploadImageAbout}>
              <img id='addAbout' src="./icons/plus.png" alt="AddImage" className="add-about"/>
              <input id="fileAbout" className='input-file' type="file" accept="image/*" name="image" onChange={loadFileAbout}></input>
            </div>

            <div className='about'>
              <p className='about-title'>הסיפור שלנו</p>
              
              <div id = 'story' contenteditable="true">הכנס/י את הסיפור שלנו...</div>
            </div>

            <div className='save-btn-space'>
              <button className='save-changes-btn' onClick={sendStory}>שמור סיפור</button>
            </div>

          </div>
          
        </div>

    </div>
  );
}