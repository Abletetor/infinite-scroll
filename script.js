const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unplash API
const count = 30;
const apiKey = "nrlOTvYYCqjeVeCXgWQRdKccXxnxhHXJkD9S_NAmWs4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if imsges were loaded
function imageLoaded () {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
                ready = true;
                loader.hidden = true;
        }
}

//Helper function to set Attributes on DOM
function setAttributes (element, attributes) {
        for (const key in attributes) {
                element.setAttribute(key, attributes[key]);
        };
}

// create elements for links and images, add to DOM
function displayPhotos () {
        imagesLoaded = 0;
        totalImages = photosArray.length;
        // Run foreach loop on the photoArray
        photosArray.forEach((photo) => {
                // create <a> tag to link to Unsplash
                const item = document.createElement('a');
                // item.setAttribute("href", photo.links.html);
                // item.setAttribute("target", '_blank');
                setAttributes(item, {
                        href: photo.links.html,
                        target: '_blank',
                });

                // create <img> tag for photo
                const img = document.createElement('img');
                // img.setAttribute("src", photo.urls.regular);
                // img.setAttribute("alt", photo.alt_description);
                // img.setAttribute("title", photo.alt_description);
                setAttributes(img, {
                        src: photo.urls.regular,
                        alt: photo.alt_description,
                        title: photo.alt_description,
                });

                // Event Listener, check when each is finished loading
                img.addEventListener("load", imageLoaded);

                //Putting img into <a> and put both inside a imageContainer
                item.appendChild(img);
                imageContainer.appendChild(item);
        });
}

// Get photos from Unsplash API
async function getPhotos () {
        try {
                const response = await fetch(apiUrl);
                photosArray = await response.json();
                displayPhotos();
        } catch (error) {
                console.log(error);
        };
}

// Checking to see if scrolling near the bottom 0f the page, Load Moe Photos
window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
                ready = false;
                getPhotos();
        }
});


// On load
getPhotos();