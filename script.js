const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

let count = 5
const apiKey = 'VeqlCqJoaxs0HKOORlEE30vSsUrv2iA-k3I9Ux5jYDg'
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

function imageLoaded() {
  imagesLoaded++

  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true
    count = 30
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length

  photosArray.forEach((photo) => {
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })

    img.addEventListener('load', imageLoaded)

    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}


// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL)
    photosArray = await response.json(); // returns an array
    displayPhotos();

  } catch (error) {

  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos();