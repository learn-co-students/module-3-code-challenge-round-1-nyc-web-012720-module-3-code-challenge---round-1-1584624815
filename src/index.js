document.addEventListener('DOMContentLoaded', () => {
  image() //this is defining the function to use to make my code easier to read for the team/readers
}) 

  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = '4875' //had to remove url link as it created a duplication during interpolation below

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image_card = document.getElementById('image_card')
  console.log(image_card)

 //get the image data. this is done by using fetch imageURL from the website given
//render image to the website

  
const image = () => {
  fetch(imageURL, {method: 'GET'})
  .then(response => response.json())
  .then(images => {
    renderImages(images)
    // image.message.forEach(function (imageURL) {
     image_card.innerHTML += `<img src=${imageURL}>`
  })
  }

  const renderImages = images => {
    console.log(images)
  }






