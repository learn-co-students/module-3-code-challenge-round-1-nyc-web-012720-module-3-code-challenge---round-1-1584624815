document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4873

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

  likesCounter = document.getElementById("likes")

  fetchAndRenderImageData()
  addLikesListener()

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
}

const addLikesListener = () => {
  const likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", (event) => {
    let elementId = event.target.parentNode.dataset.id
    console.log(elementId)
    let numberOfLikes = likesCounter.innerText
    likesCounter.innerText = ++numberOfLikes
    // make a POST request
    const postObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: elementId})
    }
    fetch('https://randopic.herokuapp.com/likes', postObj)
  })
}

// - As a user, when the page loads, I should see:
  // - √an image
  // - any comments that image has
  // - √the number of likes that image has

  // - As a user, I can click a button to like an image. 
  // When I click, the number of likes the image has should increase by one without the page refreshing.

  // - As a user, I can enter text in an input field, and submit the form that the input is in. 
  // When I do, the app should add comment to the image without the page refreshing. 
  // I should see my new comment *below* any previous comments.

  // - As a user, when I refresh the page, any comments or likes I have added should still be there. 
  // When a user adds a like or a comment, make sure their changes are sent to the backend API.
