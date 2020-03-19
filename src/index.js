let imageId = 4880 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageCard = document.getElementById("image_card")
const commentTag = imageCard.querySelector('ul')
const likeBtn = imageCard.querySelector("#like_button")

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getImage()
  likeImage()
})


const getImage = () => {
  // use a GET fetch to grab the image
  // create a function that renders that image onto the page
  fetch(imageURL)
  .then(res => res.json())
  .then(image => renderImage(image))
}

const renderImage = image => {
  const imageTag = imageCard.querySelector('img')
  imageTag.src = image.url
  imageTag.dataset.id = image.id

  const nameTag = imageCard.querySelector('#name')
  nameTag.innerText = image.name

  const likeTag = imageCard.querySelector('span').querySelector('span')
  likeTag.innerHTML = image.like_count

  const commentTag = imageCard.querySelector('ul')
  commentTag.innerHTML = renderComments(image.comments)
  // console.log(image)
  // console.log(imageCard)
}

const renderComments = comments => {
  comments.addEventListener('submit', event =>{
    event.preventDeful
  })
  
  // create an event listener to grab the user's input when the submit the comment
  // use a POST fetch to store the user's input in the db
  // render the new post
  comments.forEach(comment => {
    renderComment(comment)
  });
}

const renderComment = comment => {
  // console.log("here for the comment")
  console.log(comment)
}

const likeImage = () => {
  // √ add an event listener for the click on the like button
  // √ grab the number of likes, √ parseInt and √ increment the likes
  // √render it to show on the DOM √ without refreshing and √ stays when refreshed
  likeBtn.addEventListener('click', event =>{
    if (event.target.id === "like_button"){
      increaseLikes(event.target)
    }
  })
}

const increaseLikes = button => {
  const imgId = button.parentNode.querySelector('img').dataset.id
  const likes = button.parentNode.querySelector('#likes').innerHTML
  let num = parseInt(likes)
  num ++
  button.parentNode.querySelector('#likes').innerHTML = num
  updateLikes(imgId)
}

const updateLikes = imgId => {
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imgId
    })
  })
  .then(res => res.json())
  // .then(console.log)
}