document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4874

  const imageURL = `https://randopic.herokuapp.com/images/4874`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()

})

function fetchImage() {
  fetch(imageURL)
  .then(response => response.json())
  .then(json => renderImage(json))
}

function renderImage(image) {
  const imageCard = document.getElementById("image_card")
  
  imageCard.innerHTML = `
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
        <!-- <li> for each comment goes here -->
    </ul>
  `
}
