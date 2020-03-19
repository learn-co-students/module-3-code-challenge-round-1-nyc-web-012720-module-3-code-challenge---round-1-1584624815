document.addEventListener('DOMContentLoaded', () => {
	console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

	const imageId = 4867 // Enter the id from the fetched image here

	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

	const likeURL = `https://randopic.herokuapp.com/likes/`

	const commentsURL = `https://randopic.herokuapp.com/comments/`

	function getImage() {
		fetch('https://randopic.herokuapp.com/images/4867')
			.then(response => {
				console.log(response)
				response.json()
			})
			.then(result => {
				console.log(result)
			})
	}

	getImage()
})
