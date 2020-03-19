let imageId = 4883 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const getLikeId = document.getElementById("likes")


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  getImage = () => {
    fetch(imageURL)
    .then(response => response.json())
    .then(response => {
      renderImage(response.url)
      setLikes(response.like_count)
      
    })
  }
  
  const renderImage = image => {
    const getImageId = document.getElementById("image")
    getImageId+=`img src="${image}" id="image" data-id=""/>`
  }
  
  const setLikes = likes => {
    getLikeId.innerText = `${like}`
  }

})
