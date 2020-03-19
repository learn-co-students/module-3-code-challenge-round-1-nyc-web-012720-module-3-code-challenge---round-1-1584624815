let imageId = 4883 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const getImageId = document.getElementById("image")


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  getImage = () => {
    fetch(imageURL)
    .then(response => response.json())
    .then(image => {
      console.log(image)
      renderImage(image)
    
    })
  }

  const renderImage = image => {
    getImageId.src=`${image}`
  }

})
