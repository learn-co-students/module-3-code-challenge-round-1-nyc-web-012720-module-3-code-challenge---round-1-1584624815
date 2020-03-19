document.addEventListener('DOMContentLoaded', () => {
console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4885 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  // start

   fetchImages()


  let body = document.getElementsByTagName('body')
// fetch all images
function fetchImages(){
  fetch(imageURL)
  .then(res => res.json())
  .then(function(image){
    
      addImage(image)
    
  })
}

// add image to the browser
function addImage(image){
  console.log(image.url)
  // let newDiv = document.createElement('div')
  body.innerHTML = `<div class="container">
  <div class="row" id="image_content">
    <div class="card col-md-4"></div>
    <div id="image_card" class="card col-md-4">
        <img src=${image.url} id="image" data-id=${image.id}/>
        <h4 id="name">${image.name}</h4>
        <span>Likes:
          <span id="likes">${image.like_count}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">
             <li> ${image.comment} </li>
        </ul>
      </div>
    <div class="card col-md-4"></div>
  </div>
</div>
  `
}

// add like
document.addEventListener('click', function(event){
  if (event.target.innertext === "Like"){
    increaseLike(event.target)
  }
})

function increaseLike(button){
  let parentNode = button.parentNode.getElementById('likes');
  let likesValue = parseInt(parentNode.innertext)
  likesValue++
  parentNode.innertext = likesValue
}

})
