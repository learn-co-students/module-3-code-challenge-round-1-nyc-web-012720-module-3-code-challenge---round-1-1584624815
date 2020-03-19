document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4870 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageNode = document.getElementById("image")
  let titleNode = document.getElementById("name")
  let likesNode = document.getElementById("likes")
  let likesBTN = document.getElementById("like_button")
  let commentsNode = document.getElementById("comments")

  
  fetch(imageURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    imageNode.src = data.url
    titleNode.innerText = data.name
    likesNode.innerText = data.like_count
  });

  likesBTN.addEventListener("click", liked)

  function liked() {
    let currentLikes = likesNode.innerText
    currentLikes ++
    likesNode.innerText = currentLikes

    fetch(likeURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({image_id: imageId}) // body data type must match "Content-Type" header
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.dir(data);
    });
  }

  document.addEventListener("submit", event => {
    event.preventDefault()
    let newCommentNode = document.createElement("LI")
    let userText = event.target.elements[0].value
    newCommentNode.innerText = userText
    event.target.elements[0].value =""
    commentsNode.appendChild(newCommentNode)

    fetch(commentsURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        image_id: imageId,
        content = userText
      }) // body data type must match "Content-Type" header
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.dir(data);
    });
  })

})
