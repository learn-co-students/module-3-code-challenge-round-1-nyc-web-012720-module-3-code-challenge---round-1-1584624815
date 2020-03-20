document.addEventListener('DOMContentLoaded', () => {
console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4885 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // fetch all images
  // document.getElementById('comment_input').value=null
  let body = document.getElementsByTagName('body')
  let name = document.getElementById("name")
  let ul = document.getElementById('comments')

   fetchImages()

    function fetchImages(){
      fetch(imageURL)
      .then(res => res.json())
      .then(function(image){
          addImage(image)
      })
    }

    // add image to the browser
    function addImage(image){
      let img = document.getElementById("image")
      img.dataset.beef = image.id
      img.src = image.url 
      name.innerText = image.name
      likes.innerText = image.like_count
      let comments = image.comments
      comments.forEach(function(comment){
        createComment(comment, ul)
      })
    }

    function createComment(comment, ul){
      let li = document.createElement('li')
      li.innerHTML = `<h4>content: ${comment.content}</h4>`
      ul.appendChild(li)
    }

    // ***************** increase like
    document.addEventListener('click', function(event){
      if (event.target.innerText === "Like"){
        increaseLike()
      }
    })
    
    function increaseLike(){
      let likesValue = parseInt(likes.innerText)
      likesValue++
      likes.innerText = likesValue
      let id = document.getElementById('image').dataset.beef
      updateLikeDb(likesValue, id)
    }
    
    function updateLikeDb(likesValue, id) {
      fetch(likeURL, {
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: id, like_count: likesValue})
      })
      .then(res => res.json())
      .then(console.log)
    }

    // ******************** add comments
    document.addEventListener('submit', function(event){
      event.preventDefault()
      console.log('submit was clicked')
      addCommentToBrowser()  
    
    
    })

    function addCommentToBrowser(){
      let comment = document.getElementById('comment_input').value
      let image_id = parseInt(document.getElementById("image").dataset.beef)
      let newComment = { content: comment, image_id: image_id }
      createComment(newComment, ul)
      let id = document.getElementById('image').dataset.beef
      
      addCommentToDb(comment, id )
      document.getElementById('comment_input').value=null
    }

    function addCommentToDb(comment, id ){
      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: JSON.stringify({image_id:id, content: comment})
      })
      .then(res => res.json())
      .then(console.log)
    }
})
