const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const titleVal = titleInput.value.trim();
  const authorVal = authorInput.value.trim();
  const pagesVal = parseInt(pagesInput.value, 10);

  if (titleVal === "" || authorVal === "" || isNaN(pagesVal) || pagesVal < 1) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(titleVal, authorVal, pagesVal, checkInput.checked);
    myLibrary.push(book);
    render();
  }

  // clear the form after submit
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkInput.checked = false;
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const tbody = table.querySelector("tbody");

  tbody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = tbody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-success";
    changeBtn.textContent = myLibrary[i].check ? "Yes" : "No";
    wasReadCell.appendChild(changeBtn);

    changeBtn.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";
    deleteCell.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedTitle}`);
    });
  }
}
