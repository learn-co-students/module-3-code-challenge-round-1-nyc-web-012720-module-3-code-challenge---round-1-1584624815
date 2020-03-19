let imageId = 4883 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const getLikeId = document.getElementById("likes")
const likeButton = document.getElementById("like_button")


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
    getImageId+=`img src="${image.url}" id="${image.id}" data-id="${image.id}"/>`
  }

  likeButton.addEventListener("click", event => {
    if(event.target.innerText === "Like")
      setLikes(event)
  })
  
  const setLikes = like => {
    getLikeId.innerText = `${like}`
    let likes = parseInt(getLikeId.innerText)
    likes++

    updateScore(likes, id)
  }

  const updateScore = (likes, id)
  let id = 
  
})
