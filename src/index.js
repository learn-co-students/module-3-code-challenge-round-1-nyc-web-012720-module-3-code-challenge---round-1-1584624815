let imageId = 4880 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')


  getImage()

})





const getImage = () => {
  // use a GET fetch to grab the image
  // create a function that renders that image onto the page
  fetch(imageURL)
  .then(res => res.json())
  .then(image => renderImage(image))
}


const imageCard = document.getElementById("image_card")

const renderImage = image => {
  const imageTag = imageCard.querySelector('img')
  imageTag.src = image.url
  imageTag.dataset.id = image.id

  const nameTag = imageCard.querySelector('#name')
  nameTag.innerText = image.name

  const likeTag = imageCard.querySelector('span').querySelector('span')

  console.log(image)
  console.log(imageCard)
}