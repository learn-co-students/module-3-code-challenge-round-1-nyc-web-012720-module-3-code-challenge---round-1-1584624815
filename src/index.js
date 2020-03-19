
/*
step1.
  1.[√]Get request to load image on page.
*/
let fetchImage;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = 4860; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;


  fetchImage = function () {
    fetch(imageURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (image) {
        renderImage(image);
      });
  };
  fetchImage();

});

function renderImage(image) {
  let img = document.getElementById("image");
  return img.src = image.url;
}


