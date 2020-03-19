document.addEventListener('DOMContentLoaded', () => {
	console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

	const imageId = 4867 // Enter the id from the fetched image here

	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

	const likeURL = `https://randopic.herokuapp.com/likes/`

	const commentsURL = `https://randopic.herokuapp.com/comments/`

	getImage()

	document.addEventListener('click', event => {
		if (event.target.id === 'like_button') {
			addLike()
			postLike(event)
		}
	})
	document.addEventListener('submit', event => {
		event.preventDefault()
		addComment(event)
		postComment(event)
	})
})

function getImage() {
	fetch('https://randopic.herokuapp.com/images/4867')
		.then(response => {
			return response.json()
		})
		.then(result => {
			console.log(result)
			renderImage(result)
		})
}

function renderImage(image) {
	const imageDiv = document.querySelector('.row')
	imageDiv.innerHTML = `
  <img src="${image.url}" id="image" data-id="${image.id}"/>
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
  </ul>`
	image.comments.forEach(comment => {
		loadComments(comment.content)
	})
}

function addLike() {
	const likes = document.querySelector('#likes')
	likes.textContent++
}

function postLike(event) {
	const imageID = event.target.parentNode.querySelector('#image').dataset.id
	const postObject = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({image_id: imageID})
	}
	fetch('https://randopic.herokuapp.com/likes', postObject)
		.then(response => {
			return response.json()
		})
		.then(result => {
			console.log(result)
		})
}

function addComment(event) {
	const commentLI = document.createElement('li')
	const commentList = document.querySelector('#comments')
	commentLI.className = 'comment'
	commentLI.textContent = event.target.comment.value
	commentList.append(commentLI)
}

function loadComments(text) {
	const commentLI = document.createElement('li')
	const commentList = document.querySelector('#comments')
	commentLI.className = 'comment'
	commentLI.textContent = text
	commentList.append(commentLI)
}

function postComment(event) {
	const imageID = event.target.parentNode.querySelector('#image').dataset.id
	const postObject = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			image_id: imageID,
			content: event.target.comment.value
		})
	}
	fetch('https://randopic.herokuapp.com/comments', postObject)
		.then(response => {
			return response.json()
		})
		.then(result => {
			console.log(result)
		})
}
