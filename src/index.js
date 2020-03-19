document.addEventListener('DOMContentLoaded', () => {
	console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

	const imageId = 4867 // Enter the id from the fetched image here

	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

	const likeURL = `https://randopic.herokuapp.com/likes/`

	const commentsURL = `https://randopic.herokuapp.com/comments/`

	getImage()

	document.addEventListener('click', event => {
		console.log('click')
		if (event.target.id === 'like_button') {
			console.log('like click')
			addLike()
		}
	})
})

function getImage() {
	fetch('https://randopic.herokuapp.com/images/4867')
		.then(response => {
			return response.json()
		})
		.then(result => {
			renderImage(result)
		})
}

function renderImage(image) {
	const imageDiv = document.querySelector('.row')
	imageDiv.innerHTML = `
  <img src="${image.url}" id="image" data-id="${image.id}"/>
  <h4 id="name">${image.name}</h4>
  <span>Likes:
    <span id="likes">0</span>
  </span>
  <button id="like_button">Like</button>
  <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
  </form>
  <ul id="comments">
  </ul>`
}

function addLike() {
	const likes = document.querySelector('#likes')
	likes.textContent++
}

function postLike() {
  postObject = {
    method: 'POST',
    headers: {
      'content-type'
    }
  }
}