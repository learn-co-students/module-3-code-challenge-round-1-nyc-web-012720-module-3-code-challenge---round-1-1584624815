document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4877 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

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

  const renderImg = (img) => {
    const imgEl = document.querySelector("#image");
    imgEl.setAttribute("src", img.url);
    const h4 = document.querySelector("#name");
    h4.innerHTML = img.name;
    const span = document.querySelector("#likes");
    span.innerHTML = img.like_count;
    const commentList = document.querySelector("#comments");
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

  const addLike = () => {
    
  }

  getImage();
})
