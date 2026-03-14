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

<button class="issue" onclick="issueBook(${index})">Issue</button>

<button class="return" onclick="returnBook(${index})">Return</button>

<button class="delete" onclick="deleteBook(${index})">Delete</button>

</td>

</tr>
`;

});

localStorage.setItem("books",JSON.stringify(books));

}

function addBook(){

let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let id = document.getElementById("id").value;

if(title=="" || author=="" || id==""){
alert("Please fill all fields");
return;
}

books.push({
id:id,
title:title,
author:author,
status:"Available"
});

displayBooks();

document.getElementById("title").value="";
document.getElementById("author").value="";
document.getElementById("id").value="";

}

function issueBook(index){

if(books[index].status=="Issued"){
alert("Book already issued");
return;
}