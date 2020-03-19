// DONE on load user should see an image, comments for the image, and number of likes
// user can click a button to like image. like count should increase by 1 without refresh
// user can submit comment via form, comments should append to existing list of comments
// likes and comments must persist to the db

let image = document.getElementById('image')
let imageCard = document.getElementById('image_card')
let imageTitle = document.getElementById('name')
let likes = document.getElementById('likes')
let likeButton = document.getElementById('like_button')
likeButton.classname = 'like-btn'
let form = document.getElementById('comment_form')
let formField = document.getElementById('comment_input')
let commentsUl = document.getElementById('comments')

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  let imageId = 4884 //Enter the id from the fetched image here
  
  fetchLayout(imageId)
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
})

imageCard.addEventListener('click', function(event) {
  if (event.target.classname === 'like-btn') {
    let likeCount = event.target.parentNode.querySelector('#likes').innerText
    event.target.parentNode.querySelector('#likes').innerText = parseInt(likeCount) + 1

    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: 4884
      })
    })
  }
})

// form.addEventListener('submit', function(event) {
//   event.preventDefault()
//   let newCommentLi = document.createElement('li')
//   newCommentLi.innerText = formField.value 
//   commentsUl.append(newCommentLi)
//   formField.value = ""

//   fetch('https://randopic.herokuapp.com/comments', {
//     method:
//   })
// })


function fetchLayout(imageId) {
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(response => response.json())
  .then(imageResponse => {
    image.src = imageResponse.url 
    imageTitle.innerText = imageResponse.name
    likes.innerText = imageResponse.like_count
    imageResponse.comments.forEach(comment => {
      let commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentsUl.append(commentLi)
    })
    imageCard.append(image, imageTitle, likes, likeButton, form, commentsUl)
  })
}

