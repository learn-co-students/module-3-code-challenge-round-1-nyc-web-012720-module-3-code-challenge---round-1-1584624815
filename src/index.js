// DONE on load user should see an image, comments for the image, and number of likes
// DONE user can click a button to like image. like count should increase by 1 without refresh
// DONE user can submit comment via form, comments should append to existing list of comments
// DONE likes and comments must persist to the db

let image = document.getElementById('image')
let imageId = 4884 //Enter the id from the fetched image here
let imageCard = document.getElementById('image_card')
let imageTitle = document.getElementById('name')
let likes = document.getElementById('likes')
let likeButton = document.getElementById('like_button')
likeButton.className = 'like-btn'
let form = document.getElementById('comment_form')
let formField = document.getElementById('comment_input')
let commentsUl = document.getElementById('comments')

document.addEventListener('DOMContentLoaded', () => {
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchLayout(imageURL)
  likeImage(likeURL)
  commentImage(commentsURL)
  deleteComment(commentsURL)
})

function fetchLayout(imageURL) {
  fetch(imageURL)
  .then(response => response.json())
  .then(imageResponse => {
    image.src = imageResponse.url 
    imageTitle.innerText = imageResponse.name
    likes.innerText = imageResponse.like_count
    imageResponse.comments.forEach(comment => {
      let commentLi = document.createElement('li')
      let deleteButton = document.createElement('button')
      commentLi.innerText = comment.content
      deleteButton.innerText = 'x'
      deleteButton.className = 'delete-btn'
      deleteButton.dataset.id = comment.id
      
      commentLi.appendChild(deleteButton)
      commentsUl.append(commentLi)
    })
    imageCard.append(image, imageTitle, likes, likeButton, form, commentsUl)
  })
}

function likeImage(likeURL) {
  imageCard.addEventListener('click', function(event) {
    if (event.target.className === 'like-btn') {
      let likeCount = event.target.parentNode.querySelector('#likes').innerText
      event.target.parentNode.querySelector('#likes').innerText = parseInt(likeCount) + 1
  
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId
        })
      })
    }
  })
}

function commentImage(commentsURL) {
  form.addEventListener('submit', function(event) {
    event.preventDefault()
    let newCommentLi = document.createElement('li')
    newCommentLi.innerText = formField.value 
    commentsUl.append(newCommentLi)
    formField.value = ""
  
    fetch(commentsURL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: event.target.parentNode.querySelector('ul').lastChild.innerText
      })
    })
  })
}

function deleteComment(commentsURL){
  commentsUl.addEventListener('click', function(event) {
    if (event.target.className === 'delete-btn'){
      event.target.parentNode.remove()
      fetch(`${commentsURL}/${event.target.dataset.id}`, {method: 'DELETE'})
    }
  })
}

