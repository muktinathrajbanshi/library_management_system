let books = JSON.parse(localStorage.getItem("books")) || [];

function updateDashboard(){
    let total = books.length;
    let issued = books.filter(b => b.status === "Issued").length;
    let available = total - issued;

    document.getElementById("totalBooks").innerText = total;
    document.getElementById("issuedBooks").innerText = issued;
    document.getElementById("availableBooks").innerText = available;
}

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
            <td>${book.issueDate || "-"}</td>
            <td>${book.returnDate || "-"}</td>

            <td>
                <button class="issue" onclick="issueBook(${index})">Issue</button>
                <button class="return" onclick="returnBook(${index})">Return</button>
                <button class="delete" onclick="deleteBook(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    localStorage.setItem("books", JSON.stringify(books));
    updateDashboard();
}

function addBook(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let id = document.getElementById("id").value;

    if(title === "" || author === "" || id === ""){
        alert("Fill all fields");
        return;
    }

    books.push({
        id,
        title,
        author,
        status: "Available",
        issueDate: "",
        returnDate: ""
    });

    displayBooks();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("id").value = "";
}

function issueBook(index){
    if(books[index].status === "Issued"){
        alert("Already Issued");
        return;
    }

    let today = new Date().toLocaleDateString();

    books[index].status = "Issued";
    books[index].issueDate = today;
    books[index].returnDate = "";

    displayBooks();
}

function returnBook(index){
    let today = new Date().toLocaleDateString();

    books[index].status = "Available";
    books[index].returnDate = today;

    displayBooks();
}

function deleteBook(index){
    books.splice(index,1);
    displayBooks();
}

function searchBook(){
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#bookList tr");

    rows.forEach(row=>{
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

displayBooks();