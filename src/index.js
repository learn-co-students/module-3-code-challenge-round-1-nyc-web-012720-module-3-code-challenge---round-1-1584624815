document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  imageId = 4873

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

  likeButton = document.getElementById("like_button")
  likesCounter = document.getElementById("likes")
  commentsUl = document.getElementById("comments")
  commentForm = document.getElementById("comment_form")

  fetchAndRenderImageData()
  addLikesListener()
  addCommentListener()
  addClickListener()

})

const fetchAndRenderImageData = () => {
  fetch(imageURL)
  .then(response => response.json())
  .then(imageData => renderImage(imageData))
}

const renderImage = (imageData) => {
  const imageCard = document.getElementById("image_card")
  const imageUrlTag = imageCard.getElementsByTagName("img")[0]
  const imageH4 = imageCard.getElementsByTagName("h4")[0]

  imageCard.dataset.id = imageData.id
  imageUrlTag.src = imageData.url
  imageH4.innerText = imageData.name
  likesCounter.innerText = imageData.like_count
  renderComments(imageData)
}

const renderComments = (imageData) => {
  imageData.comments.forEach(comment => {
    renderNewComment(comment)
  })
}

const renderNewComment = (commentData) => {
  const li = document.createElement('li')
  li.dataset.id = commentData.id
  li.innerText = commentData.content
  addDeleteButton(li)
  commentsUl.append(li)
}

const addDeleteButton = (element) => {
  const button = document.createElement('button')
  button.innerText = "Delete"
  button.className = "delete-button"
  element.append(button)
}

const addLikesListener = () => {
  likeButton.addEventListener("click", event => {    
    let numberOfLikes = likesCounter.innerText
    likesCounter.innerText = ++numberOfLikes
    
    createNewLike()
  })
}

const createNewLike = () => {
  const postObj = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: imageId})
  }
  fetch(likeURL, postObj)
}

const addCommentListener = () => {
  commentForm.addEventListener("submit", event => {
    event.preventDefault()
    let content = event.target.comment.value
    
    const commentObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: content
      })
    }

    createAndRenderNewComment(commentObj)
    commentForm.reset()
  })
}

const createAndRenderNewComment = (commentObj) => {
  fetch(commentsURL, commentObj)
  .then(response => response.json())
  .then(comment => renderNewComment(comment))
}

const addClickListener = () => {
  commentsUl.addEventListener("click", event => {
    if (event.target.className === "delete-button") {
    let commentId = event.target.parentNode.dataset.id
    fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(answerMessage => event.target.parentNode.remove())
    }
  })
}

// - As a user, when the page loads, I should see:
  // - √an image
  // - √any comments that image has
  // - √the number of likes that image has

  // - √As a user, I can click a button to like an image. 
  // √When I click, the number of likes the image has should increase by one without the page refreshing.

  // - √As a user, I can enter text in an input field, and submit the form that the input is in. 
  // √When I do, the app should add comment to the image without the page refreshing. 
  // √I should see my new comment *below* any previous comments.

  // - √As a user, when I refresh the page, any comments or likes I have added should still be there. 
  // √When a user adds a like or a comment, make sure their changes are sent to the backend API.
