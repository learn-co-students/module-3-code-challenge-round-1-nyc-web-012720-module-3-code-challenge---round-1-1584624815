
/*
step 1.
  1.[√]Get request to load image on page.
  2.[√]display name of image
step 2.
  1.[√]Add like to picture
  2.[√]As 'click' event, increase the number of likes
  step 3.
  1.[√]Send 'Post'  to backend by fecthing to backend.
  step 4.
  1.[√]Add comment optimistically
  2.[√]Clear out input text that typed in.
  step 5.
  1.[√]Send  comment to Backend by fetching. Use POST method

  ##BONUS
  set 6.
  1.[√]Create a new 'delete'button rigtht next to comment.
  2.[√]Hitting 'delete' remove comment.
  3.[√]Send 'Delete' to backend.
*/
let fetchImage;
let imageData;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = 4860; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  const form = document.getElementById("comment_form");

  fetchImage = function () {
    fetch(imageURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (image) {
        imageData = image;
        renderImage(image);
      });
  };
  fetchImage();

  document.body.addEventListener("click", function (event) {
    if (event.target.id === "like_button") {
      addLikes(event.target);
      updateLikes(likeURL);
    } else if (event.target.className === "btn delete") {
      event.target.parentElement.remove();
      deleteComment(event.target, commentsURL);
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    displayComments(event.target);
    updateComments(event.target, commentsURL);
    event.target[0].value = '';
  });
});



function renderImage(image) {
  let img = document.getElementById("image");
  let h4 = document.getElementById("name");
  let span = document.querySelector("#likes");
  let ul = document.getElementById("comments");

  img.src = image.url;
  h4.innerText = image.name;
  span.innerText = image.like_count;

  if (image.comments.length > 0) {
    image.comments.forEach(function (comment) {
      ul.innerHTML += `
      <li>${comment.content}
      <button class="btn delete" data-delete-id=${comment.id}>delete</button>
      </li>
      `;
    });
  }
}

function addLikes(btn) {
  let span = document.querySelector("#likes");
  btn.dataset.imageId = imageData.id;

  imageData.like_count++;
  span.innerText = imageData.like_count;
}

const updateLikes = function (likeURL) {
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "image_id": imageData.id })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

function displayComments(submit) {
  let ul = document.getElementById("comments");

  ul.innerHTML += `
  <li>${submit[0].value}</li>
  `;

  //Clear out input value after list it.

}

const updateComments = function (submit, commentsURL) {

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "image_id": imageData.id, "content": submit[0].value })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

};

function deleteComment(btn, commentsURL) {
  fetch(`${commentsURL}/${btn.dataset.deleteId}`, {
    method: "DELETE"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}


