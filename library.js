let myLibrary = [];

function  Book(title, author, pages, read) {
    //Book constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){
    //construct new Book object and add it to the Library array
    //Loop through library array and have all books displayed on page
}

function removeBookFromLibrary(){
    //retrieve the object reference (or something that references the book)
    //remove that book from the library array
    //reload the Library
}

function loadLibrary(myLibrary){
    //loop through myLirbary and add all books within it to the page
    //1. remove all existing books
    //2. load books from myLibrary array and insert the associated html
}


//Event Listeners

const addButton = document.getElementById("add-book");
const popup = document.getElementsByClassName("popup")[0];

addButton.addEventListener("click", () => {
    popup.style.display = "block";
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    popup.style.display="none";
    //also need to put some validations on the form in html
    //send form data to addBookFromLibrary
});