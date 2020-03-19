let imageId = 4861

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

 

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //call functions
  getImage();
  likePic();

})

function getImage() {
  fetch(`${imageURL}`)
  .then( response => response.json())
  .then( object => {
    renderImage(object)
  })
}

function renderImage(object) {
  const imgCard = document.getElementById("image_card")
  imgCard.innerHTML = `
      <img src=${object.url} id="image" data-id=""/>
      <h4 id="name">${object.name}</h4>
        <span id="likes"> Likes:${object.like_count}</span>
      <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
      <ul id="comments">
        <li> ${object.comments.forEach( x => { x.content})} </li>
      </ul>
  `
}

function likePic() {
    const likeButtton = document.getElementById("like_button")
    const span = document.getElementById("likes")
    console.log(span.innerText)

}

