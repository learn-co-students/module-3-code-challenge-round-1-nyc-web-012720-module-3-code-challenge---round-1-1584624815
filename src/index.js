document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4872 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()

  document.addEventListener("click", function(event){
    console.log(event.target)
    if (event.target.id === "like_button"){
      addLike(event.target)

    }



  }) // click closer
  let form = document.querySelector("form#comment_form")
  form.addEventListener("submit", function(event){
    event.preventDefault()

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": `${imageId}`,
        "content": `${event.target.comment.value}`
      })
    })
    .then(resp => resp.json())
    .then(comment => renderComment(comment))
  }) // submit closer

  function addLike(button){
    let span = document.getElementById("likes")
      let likes = parseInt(span.innerText)
      likes++
      span.innerText = likes
      let id = button.dataset.id

      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: `${imageId}`
        })
      })
  }




  function fetchImage(){
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImage(image))
  }

  function renderImage(image){
    let img = document.querySelector("img")
    img.src = image.url 
    img.dataset.id = image.id

    let name = document.getElementById("name")
    name.innerText = image.name

    let likes = document.getElementById("likes")
    likes.innerText = image.like_count

    renderComments(image)
  }


  function renderComments(image){
    image.comments.forEach(comment => {
      let ul = document.getElementById("comments")
      let li = document.createElement("li")
      li.innerText = comment.content

      ul.append(li)
    })
  }

  function renderComment(comment){
    let ul = document.getElementById("comments")
      let li = document.createElement("li")
      li.innerText = comment.content

      ul.append(li)
  }
})
