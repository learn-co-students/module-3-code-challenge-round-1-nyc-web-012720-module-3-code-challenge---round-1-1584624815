document.addEventListener('DOMContentLoaded', () => {
console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4885 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let img = document.getElementById('image')
  let imgName = document.getElementById('name')
  let likes = document.getElementById('likes')
  let ul = document.getElementById('comments')

  fetchImage()

  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    // .then(console.log)
    .then(image => {
      addImageToBrowser(image)
    })
  }
  function addImageToBrowser(image){
    // let img = document.getElementById('image')
    img.src = image.url 
    img.dataset.id = image.id
    // let imgName = document.getElementById('name')
    imgName.innerHTML = image.name
    // let likes = document.getElementById('likes')
    likes.innerHTML = image.like_count

    let comments = image.comments
    comments.forEach(comment => {
      addCommentTOBrowser(comment)
    })
  }
  
  function addCommentTOBrowser(comment) {
    // let ul = document.getElementById('comments')
    let li = document.createElement('li')
    li.innerHTML = `<h3> ${comment.content} </h3>`
    ul.appendChild(li)
  }


// ************** increase like in browser 
document.addEventListener('click', function(event){
  if (event.target.innerText === 'Like'){
    increaseLike(event.target)
  }
})
function increaseLike(button){
  let newLikeScore = parseInt(likes.innerHTML) 
  newLikeScore++
  likes.innerHTML = newLikeScore
  let id = button.parentNode.querySelector('img').dataset.id 
  console.log(id)
  updateLikeInDb(newLikeScore, id)
}
// ************** increase like in db 

function updateLikeInDb(newLikeScore, id){
  fetch(`https://randopic.herokuapp.com/likes/`,{
    method: 'POST',
    headers:{
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 'image_id': id})

  })
  .then(res => res.json())
  .then(console.log)
}

// ************** add comment in the browser

document.addEventListener('submit', function(event) {
    event.preventDefault()
    console.log('submit was clicked')
    createComment(event.target)
})

function createComment(button){
  let comment = document.getElementById('comment_input').value
  let image_id = parseInt(document.getElementById('image').dataset.id)
  // let content = button.name.value 
  console.log(image_id)
  console.log(comment)
  let newComment = {content: comment, image_id: image_id}

  addCommentTOBrowser(newComment)
  document.getElementById('comment_input').value = null
  addCommentToDb(newComment)
}

// ************** add comment in the db

function addCommentToDb(comment){
  fetch(`https://randopic.herokuapp.com/comments/`,{
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ image_id: comment.image_id, content: comment.content})
  })
  .then(res => res.json())
  .then(console.log)
}

})
