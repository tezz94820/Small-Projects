(function(){
    "use strict";
     
    //making an array of the images in the myPhotos variable
    const myPhotos =["slides/image1.jpg","slides/image2.jpg","slides/image3.jpg","slides/image4.jpg","slides/image5.jpg"];
    const container = document.querySelector('#content');
    const next = document.querySelector('#next');
    const previous = document.querySelector('#previous');
    //created a variable that wil help in incrementing or decrementing the image array
    let currentImage = 0;

    //making a function swap() to just swap the images one by one with the fade in effect
    function swap(){
        //1) created a new img element
        const newSlide = document.createElement('img');
        //2) set the source of the new image
        newSlide.src = myPhotos[currentImage];
        //3) assigned the class fadeinimg to the new img
        newSlide.className = "fadeinimg";
        //4) added the img to div(container)
        container.appendChild(newSlide);

        //this is very interesting :- here we have just used if statement to remove the image which 
        //was not going to use ever .
        //for this we created if children of container that is images of the div ar > 2 then we remove
        //the first child of container(div) 
        if(container.children.length > 2){container.removeChild(container.children[0]);}
    }


    //next button
    next.addEventListener('click',function(){
        //incrementing current image through the array
        currentImage++;
        //here we tried to loop the image array with if statement
        //if currentImage is > total image then give current image to initial
        if(currentImage > myPhotos.length-1){currentImage = 0;}
        swap();
    })


    //similar to next button
    previous.addEventListener('click',function(){
        currentImage--;
        if(currentImage < 0){currentImage = myPhotos.length - 1;}
       swap();
       
    })
})();