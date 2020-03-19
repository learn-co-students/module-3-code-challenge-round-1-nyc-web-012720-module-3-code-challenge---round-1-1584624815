document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  //===================== VARIABLES ================================//

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
  
//===================== RENDERING FUNCTIONS ================================//

  const renderImg = (img) => {
    imgEl.setAttribute("src", img.url);
    h4.innerHTML = img.name;
    span.innerHTML = img.like_count;
    img.comments.forEach(comment => {
      renderComment(comment)
    });
  }

  const renderComment = (comment) => {
    if (comment.id) {
      const li = document.createElement("li");
      li.setAttribute("id", comment.id)
      const delBtn = document.createElement("button");
      delBtn.innerHTML = " X "
      li.innerHTML = comment.content;
      li.appendChild(delBtn);
      commentList.appendChild(li);

      delBtn.onclick = () => {
        deleteComment(comment)
      }
    } else {
      const li = document.createElement("li");
      const delBtn = document.createElement("button");
      delBtn.innerHTML = " X ";
      delBtn.disabled = true;
      li.innerHTML = comment;
      li.appendChild(delBtn);
      commentList.appendChild(li);

      li.onclick = () => {
        alert("Deleting this Comment is disabled for now.")
      }
    }
  }

  //===================== GET IMAGE FUNCTION ================================//


  const getImage = () => {
    fetch(imageURL)
      .then(res => res.json())
      .then(img => renderImg(img))
      .catch(err => console.log(err));
  }

  //===================== LIKE FUNCTIONS ================================//


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

  //===================== COMMENT FUNCTIONS ================================//


  const addCommentBack = (comment) => {
    newComObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    };

    fetch(commentsURL, newComObj)
      .then(res => res.json())
      .then(comment => console.log(comment))
      .catch(err => console.log(err));
  }


  const addCommentFront = (comment) => {
    renderComment(comment)
    commentForm.reset();
  }

  const deleteComment = (comment) => {
      byeComObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
  
      fetch(`${commentsURL}/${comment.id}`, byeComObj)
        .then(res => res.json())
        .then(() => {
          const li = document.getElementById(`${comment.id}`);
          li.remove();
        })
        .catch(err => console.log(err));
  }
  
  //===================== EVENT LISTENERS AND FIRST FUNC CALL ================================//

  getImage();

  likeButton.onclick = () => {
    addLikeFront();
    addLikeBack();
  }

  commentForm.onsubmit = (e) => {
    e.preventDefault();
    const commentValue = document.querySelector("#comment_input").value;
    addCommentFront(commentValue);
    addCommentBack(commentValue);
  }
})
