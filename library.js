let myLibrary = [];

function  Book(title, author, pages, read = false) {
    //Book constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toString = function () {
    return `${this.title} by ${this.author}, which is ${this.pages} pages long. Have I read it? ${this.read}`;
}

Book.prototype.toggleRead = function () {
    //toggles read of a book
    if(this.read === false){
        this.read = true;
    } else {
        this.read = false;
    }
    console.log(this);
}

function addBookToLibrary(book){
    myLibrary.push(book);
    loadLibrary(myLibrary);
    console.log(myLibrary)
}

function removeBookFromLibrary(target){
    //retrieve the object reference (or something that references the book)
    //remove that book from the library array
    //reload the Library
    const book = target.parentElement;
    const index = book.dataset.id;

    myLibrary.splice(index,1);
    
    loadLibrary(myLibrary);
}

const shelf = document.getElementsByClassName('shelf')[0];

function removeShelf(library){
    //removes all books from the shelf
    while(shelf.firstChild){
        shelf.removeChild(shelf.firstChild);
    }
}

function loadLibrary(library){
    //loop through myLirbary and add all books within it to the page
    //1. remove all existing books
    //2. load books from myLibrary array and insert the associated html
    removeShelf(library);

    let counter = 0;

    library.forEach(element => {
        const div = document.createElement('div');
        div.dataset.id = counter;
        counter++;

        const img = document.createElement('img');
        img.setAttribute('src','remove.svg');

        img.addEventListener('click', event => {
            removeBookFromLibrary(event.target);
        });

        div.appendChild(img);

        const h4 = document.createElement('h4');
        const title = document.createTextNode(element['title']);
        h4.appendChild(title);
        div.appendChild(h4);

        const h5 = document.createElement('h5');
        const author = document.createTextNode(element['author']);
        h5.appendChild(author);
        div.appendChild(h5);

        const div3 = document.createElement('div');

        const paragraph = document.createElement('p');
        const pages = document.createTextNode(`Pages: ${element['pages']}`);
        paragraph.appendChild(pages);
        div3.appendChild(paragraph);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'myCheckbox';

        if(element['read']==='off' || element['read'] === false){
            checkbox.checked = false;
            element['read'] = false;
        } else {
            checkbox.checked = true;
            element['read'] = true;
        }
        
        checkbox.addEventListener('click', () => {
            element.toggleRead();
        });

        const div2 = document.createElement('div');
        const label = document.createElement('label');
        label.for = 'myCheckbox';
        const readLabel = document.createTextNode('Read?');
        label.appendChild(readLabel);
        div2.appendChild(label);
        div2.appendChild(checkbox);

        div3.appendChild(div2);
        div3.classList.add('footer');

        div.appendChild(div3);

        div.classList.add('book');
        shelf.appendChild(div);
    });

}


//Event Listeners

const addButton = document.getElementById("add-book");
const popup = document.getElementsByClassName("popup")[0];

addButton.addEventListener("click", () => {
    popup.style.display = "flex";
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = Array.from(formData.entries());
    const formObjects = Object.fromEntries(entries);

    const book = new Book(formObjects['title'],formObjects['author'],formObjects['pages'],formObjects['read']);
    addBookToLibrary(book);

    popup.style.display="none";
    //send form data to addBookFromLibrary
});

const close = document.getElementsByClassName("close")[0];

close.addEventListener("click", () => {
    popup.style.display="none";
});

window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }