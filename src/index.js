const immUrl = 'https://randopic.herokuapp.com/images/4862'
const container = document.getElementsByClassName('container')


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

  function renderImg(obj){
    let div = document.createElement("div")
    div.setAttribute("id", "image_card")
    div.setAttribute("class", "row")
  
    div.innerHTML = `
    <div class="card col-md-4"></div>
    <div id="image_card" class="card col-md-4">
        <img src=${"http://blog.flatironschool.com/wp-content/uploads/2016/01/20141110-Flatiron-School-29-352x200.jpg"} id="image" data-id=""/>
        <h4 id="name">${img.name}</h4>
        <span>Likes:
          <span id="likes">${img.like_count}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="${img_content}" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">
             <!-- <li> for each comment goes here -->
        </ul>
      </div>
    <div class="card col-md-4"></div>
    `
  
    container.appendChild(div)
    }
  
})


  // let imgTag = document.createElement('IMG')
  // imgTag.setAttribute("src", "`${obj.url}`")
  // imgTag.setAttribute("id", "image")
  // imgTag.dataset.id = '`${obj.id}'

  // let h4 = document.createElement('h4')
  // h4.setAttribute("id", "name")
  // h4.innerText = '`${img.name}`'

  // let spanJuan = document.createElement('span')
  // let spanDos = document.createElement('span')
  // spanDos.setAttribute("id", "likes")
  // spanDos.innerText = "Likes Go Here"

  // spanJuan.innerText = "`${img.like_count}`"

  // spanJuan.appendChild(spanDos)

  // let button = document.createElement('button')
  // button.setAttribute("id", "like button")
  // button.innerText = "like"

  // let form = document.createElement('form')
  // form.setAttribute('id', 'comment form')
  // form.innerHTML = `
  // <input id="${img.content}" type="text" name="comment" placeholder="Add Comment"/>
  // <input type="submit" value="Submit"/>`

  // let ul = document.createElement('ul')
  // ul.setAttribute('id', 'comments')

  // div.appendChild(imgTag)
  // div.appendChild(h4)
  // div.appendChild(spanJuan)
  // div.appendChild(button)
  // div.appendChild(form)
  // div.appendChild(ul)




