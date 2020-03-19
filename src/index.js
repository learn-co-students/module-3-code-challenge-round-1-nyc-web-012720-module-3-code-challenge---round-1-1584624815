document.addEventListener('DOMContentLoaded', () => {
  getImage() //this is defining the function to use to make my code easier to read for the team/readers
}) 

  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = '4875' //had to remove url link as it created a duplication during interpolation below

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
 

  
const getImage = () => {
  fetch(imageURL, {method: 'Get'})
  .then(response => response.json())
  .then(images => {
    renderImages(images)
  })
  }

  const renderImages = images => {
    console.log(images)
  }


//get the image data. this is done by using fetch imageURL from the website given
//render image to the website



