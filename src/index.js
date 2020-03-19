let imageId = 4861

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

 

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //call functions
  getImage();
  newComment();
  // likePic();

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
  imgCard.dataset.id = object.id
  imgCard.innerHTML = `
      <img src=${object.url} id="image" data-id=""/>
      <h4 id="name">${object.name}</h4>
      <span>Likes:
            <span id="likes">${object.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
      <ul id="comments">
        <li> ${object.comments.forEach( x => { x.content.value})} </li>
      </ul>
  `
}

// function likePic() {
    // const likeButtton = document.getElementById("like_button")
    // const span = document.getElementById("new-likes")
    // console.log(span.innerText)

    // was having trouble getting the actual number of likes, despite changing tag names, ids, etc.
    //the idea is to get like amount thorough a split on the inner text then increment with ++
    //and append new score to page. since it is optimistic, the fetch( database persistence) comes after the dom is updated

//     document.addEventListener("click", event => {
//       if (event.target.id === "like_button") {
//         fetch('https://randopic.herokuapp.com/likes', {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             "accept": "application/json"
//           },
//           body: JSON.stringify({ image_id: `${imageId}`})
      
//         })
//       }
//     })
// }

function newComment() {
  const form = document.getElementById("comment_form")
      form.addEventListener("submit", event => {
        event.preventDefault()
        const commentList = document.getElementById("comments")
        let newComm = document.createElement("li")
        
        console.log(event.target)
        newComm = event.target.comment.value
        commentList.appendChild(newComm)

        fetch('https://randopic.herokuapp.com/comments', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            image_id: "",
           content: ""  })
        })
        // .then( //logic to append to dom))
      })
    }
