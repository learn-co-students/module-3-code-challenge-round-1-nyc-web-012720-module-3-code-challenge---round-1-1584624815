document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4877 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imgEl = document.querySelector("#image");
  const h4 = document.querySelector("#name");
  const span = document.querySelector("#likes");
  const commentList = document.querySelector("#comments");
  const likeButton = document.querySelector("#like_button");
  const commentForm = document.querySelector("#comment_form");
  const commentValue = document.querySelector("#comment_input").value;

  // <div class="container">
  //   <div class="row" id="image_content">
  //     <div class="card col-md-4"></div>
  //     <div id="image_card" class="card col-md-4">
  //         <img src="" id="image" data-id=""/>
  //         <h4 id="name">Title of image goes here</h4>
  //         <span>Likes:
  //           <span id="likes">Likes Go Here</span>
  //         </span>
  //         <button id="like_button">Like</button>
  //         <form id="comment_form">
  //           <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  //           <input type="submit" value="Submit"/>
  //         </form>
  //         <ul id="comments">
  //              <!-- <li> for each comment goes here -->
  //         </ul>
  //       </div>
  //     <div class="card col-md-4"></div>
  //   </div>
  // </div>

//   Example Response:
// {
//   "id": 1,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
//   "name": "The Internet!",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 5941,
//       "content": "first comment!",
//       "image_id": 1158,
//       "created_at": "2018-10-18T17:06:14.859Z",
//       "updated_at": "2018-10-18T17:06:14.859Z"
//     }
//   ]
// }

  const renderImg = (img) => {
    imgEl.setAttribute("src", img.url);
    h4.innerHTML = img.name;
    span.innerHTML = img.like_count;
    img.comments.forEach(comment => {
      const li = document.createElement("li");
      li.innerHTML = comment.content;
      commentList.appendChild(li);
    });

  }

  const getImage = () => {
    fetch(imageURL)
      .then(res => res.json())
      .then(img => renderImg(img))
      .catch(err => console.log(err));
  }

  const addLikeBack = () => {
    newLikeObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({image_id: imageId})
    };

    fetch(likeURL, newLikeObj)
      .then(res => res.json())
      .then(like => console.log(like))
      .catch(err => console.log(err));
  }

  const addLikeFront = () => {
    let likeCount = parseInt(span.innerHTML, 10);
    likeCount++;
    span.innerHTML = likeCount;
  }


  const addCommentBack = () => {

  }


  const addCommentFront = () => {
    const li = document.createElement("li");
    li.innerHTML = commentValue;
    commentList.appendChild(li);
  }


  getImage();
  likeButton.onclick = () => {
    addLikeFront();
    addLikeBack();
  }
  commentForm.onsubmit = (e) => {
    e.preventDefault();
    addCommentFront();

  }
})
