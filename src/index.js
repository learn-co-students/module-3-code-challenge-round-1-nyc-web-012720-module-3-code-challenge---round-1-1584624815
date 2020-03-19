document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 'https://randopic.herokuapp.com/images/4875'

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

//get the image data. this is done by using fetch imageURL from the website given
//render image to the website

document.addEventListener("DOMContentLoaded", event => {
  getImage() //this is defining the function to use to make my code easier to read for the team/readers
})

const getImage = () => {
  fetch(imageURL)
  .then(response => response.json())
  .then((image) => {
    console.log(image);
  });
}
