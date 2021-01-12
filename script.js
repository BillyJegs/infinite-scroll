const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'vx2b8EqWlIS5L8r-OVR5rsyApfml50PCTTywmz_5uic';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();




// const imageContainer = document.getElementById('image-container');
// const loader = document.getElementById('loader');

// let ready = false;
// let imagesLoaded = 0;
// let totalImages = 0;

// // array of photos
// let photosArray = [];

// // Unsplash Api
// const count = 30;
// const apiKey = 'vx2b8EqWlIS5L8r-OVR5rsyApfml50PCTTywmz_5uic';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// // check if all images are loaded
// function imageLoaded() {
//     imagesLoaded++;
//     if (imagesLoaded === totalImages) {
//         ready = true;
//         loader.hidden = true;
//     }
// }

// // create elements for links and photos, add to DOM
// function displayPhotos() {
//     imagesLoaded = 0;
//     totalImages = photosArray.length;

//     // run function for each object in photosArray
//     photosArray.forEach((photo) => {
//         // create <a> to link to unsplash
//         const item = document.createElement ('a');
//         item.setAttribute('href', photo.links.html);
//         item.setAttribute('target', '_blank');
//         //creat <img> for photo
//         const img = document.createElement('img');
//         img.setAttribute('src', photo.urls.regular);
//         img.setAttribute('alt', photo.alt_description);
//         img.setAttribute('title', photo.alt_description);

//         // event listener, check when each is finished loading
//         img.addEventListener('load', imageLoaded);

//         // put <img> inside <a>, then put both inside imageContainer element
//         item.appendChild(img);
//         imageContainer.appendChild(item);
//     });    
// }

// // Get photos from unsplash api
// async function getPhotos() {
//     try {
//         const response = await fetch(apiUrl);
//         photosArray = await response.json();
//         displayPhotos();
//     } catch (error) {
//         // catch error
//     }
// }

// // check to see if scrolling near bottom of page
// window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
//         ready = false;
//         getPhotos();
//     }
// });

// // On load
// getPhotos();