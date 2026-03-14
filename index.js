let books = JSON.parse(localStorage.getItem("books")) || [];

function displayBooks(){

let list = document.getElementById("bookList");
list.innerHTML = "";

books.forEach((book,index)=>{

list.innerHTML += `
<tr>
<td>${book.id}</td>
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.status}</td>

<td>