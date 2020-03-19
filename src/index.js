let imageId = 4883 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const getLikeId = document.getElementById("likes")
const likeButton = document.getElementById("like_button")
const submitButton = document.querySelector('submit')
const ul = document.getElementById("comments")


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  getImage = () => {
    fetch(imageURL)
    .then(response => response.json())
    .then(image => {
      renderImage(image.url)
      updateScore(image.like_count, image.id)
      
    })
  }
  
  const renderImage = image => {
    const getImageId = document.getElementById("image")
    getImageId+=`img src="${image.url}" id="${image.id}" data-id="${image.id}"/>`
  }

  const setLikes = like => {
    getLikeId.innerText = `${like}`
    let likes = parseInt(getLikeId.innerText)
    likes++
        
    updateScore(likes)
    }

  likeButton.addEventListener("click", event => {
    if(event.target.innerText === "Like"){

    }
  })
  
  const updateScore = (likes, id) => {
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({like: likes, id: id})
    })
    .then(response => response.json())
    .then(console.log)
  }

  submitButton.addEventListener('submit', event => {
    event.preventDefault()
    let comment = event.target.value
    let li = document.createElement('LI')
    li.setAttribute('class', 'comment')
    li.innerText+=`${event.target.value}`
    ul.append(li)
  })
})
