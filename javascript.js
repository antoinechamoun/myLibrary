const authorName = document.getElementById('author')
const titleName = document.getElementById('title')
const bookStatus = document.getElementById("select")
const table = document.getElementById("myTable")

let myLibrary=[]

// create Book object
const Book = function Book(){
    this.id = id
    this.title=title
    this.author=author
    this.isRead=isRead
}

// add initial value
const book1 = Object.create(Book.prototype)
book1.id='1'
book1.title="Beyond good and evil"
book1.author="Friedrich Nietzsche"
book1.isRead=true

const book2 = Object.create(Book.prototype)
book2.id='2'
book2.title="Thus Spoke Zarathustra"
book2.author="Friedrich Nietzsche"
book2.isRead=false
addBookToLibrary(book2)
addBookToLibrary(book1)


// add book to library function
function addBookToLibrary(obj){
    myLibrary.push(obj)
    return myLibrary
}

//Draw table function
function drawTable(){
    table.innerHTML=`
    <tr>
    <th>Name</th>
    <th>Author</th>
    <th>Status</th>
    <th></th>
    </tr>`
    myLibrary.forEach((book)=>{
        const htmlBook = `
        <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="status" >${book.isRead? 'Read':'Not read'}</button></td>
        <td><button class="delete" >Delete</button></td>
        </tr>
        `;
        table.insertAdjacentHTML("beforeend", htmlBook);
    })
}

// Clear form function
function clearForm(){
    authorName.value=''
    titleName.value=''
}

//find book id function
function findBook(name){
    for(singleBook of myLibrary){
        if(singleBook.title === name){
            return myLibrary.indexOf(singleBook)
        }
    }
}

// Window listener 
const handleButton = (e) => {
    if(e.srcElement.innerHTML === 'Submit'){
        e.preventDefault()
        let tempBook = Object.create(Book.prototype)
    if(!authorName.validity.valid){
        authorName.reportValidity()
    }else if(!titleName.validity.valid){
        titleName.reportValidity()
    }else {
        console.log('2');
        tempBook.id = new Date().getHours()
        tempBook.title = titleName.value
        tempBook.author = authorName.value
        tempBook.isRead = bookStatus.value
        addBookToLibrary(tempBook)
        drawTable()
        clearForm()
    }
    }else if(e.srcElement.innerHTML==='Delete'){
        let index = findBook(e.target.parentNode.parentNode.children[0].innerHTML);
        myLibrary.splice(index, 1)
        drawTable()
    }else if(e.srcElement.innerHTML==='Read' || e.srcElement.innerHTML==='Not read'){
        let index = findBook(e.target.parentNode.parentNode.children[0].innerHTML);
        myLibrary[index].isRead = !myLibrary[index].isRead
        drawTable()
    }
}

drawTable()
window.addEventListener('click', handleButton)