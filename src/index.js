const immUrl = 'https://randopic.herokuapp.com/images/4862'
const card = document.getElementsByClassName('card col-md-4')[0]


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4862 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function getImg(obj){
    fetch(imgUrl)
    .then(resp = resp.json())
    .then(obj => renderImg(obj))
  }

  function renderImg(obj)
  let div = document.createElement('div')
  div.setAttribute("id", "image_card")
  div.setAttribute("class", "card")

  
  

  

})


