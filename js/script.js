const bookshelfs = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-bookshelf";
const STORAGE_KEY = "BOOKSHELFS_APPS";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedbookshelfList = document.getElementById("bookshelf");
  uncompletedbookshelfList.innerHTML = "";
  const completedbookshelfList = document.getElementById("completed-bookshelf");
  completedbookshelfList.innerHTML = "";

  for (const bookshelfItem of bookshelfs) {
    const bookshelfElement = makebookshelf(bookshelfItem);
    
    if (!bookshelfItem.isComplete) {
      uncompletedbookshelfList.append(bookshelfElement);
    } else {
      completedbookshelfList.append(bookshelfElement);
    }
  }
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

const searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", function () {
  const searchTerm = searchBox.value.toLowerCase();
  const uncompletedbookshelfList = document.getElementById("bookshelf");
  const completedbookshelfList = document.getElementById("completed-bookshelf");

  uncompletedbookshelfList.innerHTML = '';
  completedbookshelfList.innerHTML = '';

  for (const bookshelfItem of bookshelfs) {
    if (bookshelfItem.title.toLowerCase().includes(searchTerm)) {
      const bookshelfElement = makebookshelf(bookshelfItem);

      if (!bookshelfItem.isComplete) {
        uncompletedbookshelfList.append(bookshelfElement);
      } else {
        completedbookshelfList.append(bookshelfElement);
      }
    }
  }
});


function generateId() {
  return +new Date();
}

function generatebookshelfObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year: parseInt(year),
    isComplete,
  };
}

function addBook() {
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const generatedID = generateId();
  const bookshelfObject = generatebookshelfObject(
    generatedID,
    titleBook,
    authorBook,
    yearBook,
    isComplete
  );

  bookshelfs.push(bookshelfObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function makebookshelf(bookshelfObject) {
  const titleBook = document.createElement("h3");
  titleBook.innerText = "Judul Buku : " + bookshelfObject.title;
  titleBook.setAttribute("data-testid", "bookItemTitle");

  const authorBook = document.createElement("p");
  authorBook.innerText = "Penulis   : " + bookshelfObject.author;
  authorBook.setAttribute("data-testid", "bookItemAuthor");

  const yearBook = document.createElement("p");
  yearBook.innerText = "Tahun       : " + bookshelfObject.year;
  yearBook.setAttribute("data-testid", "bookItemYear");

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(titleBook, authorBook, yearBook);

  const container = document.createElement("div");
  container.classList.add("item");
  container.append(textContainer);
  container.setAttribute("id", `book-${bookshelfObject.id}`);
  container.setAttribute("data-testid", "bookItem");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.setAttribute("data-testid", "bookItemEditButton");
  editButton.addEventListener("click", function () {
    editBook(bookshelfObject.id);
  });

  container.append(editButton);

  if (bookshelfObject.isComplete) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(bookshelfObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("delete-button");
    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(bookshelfObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    checkButton.addEventListener("click", function () {
      addTaskToCompleted(bookshelfObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("delete-button");
    trashButton.setAttribute("data-testid", "bookItemDeleteButton");
    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(bookshelfObject.id);
    });

    container.append(checkButton, trashButton);
  }

  return container;
}

function editBook(bookId) {
  const book = findbookshelf(bookId);
  if (book) {
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("year").value = book.year;

    const submitButton = document.getElementById("submit");
    submitButton.innerText = "Simpan Perubahan";
    submitButton.onclick = function (event) {
      event.preventDefault();
      updateBook(bookId);
      submitButton.innerText = "Tambahkan Buku";
      submitButton.onclick = addBook;
    };
  }
}

function updateBook(bookId) {
  const book = findbookshelf(bookId);
  if (book) {
    book.title = document.getElementById("title").value;
    book.author = document.getElementById("author").value;
    book.year = document.getElementById("year").value;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
}

function addTaskToCompleted(bookshelfid) {
  const bookshelfTarget = findbookshelf(bookshelfid);

  if (bookshelfTarget == null) return;

  bookshelfTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeTaskFromCompleted(bookshelfId) {
  const bookshelfTarget = findbookselfIndex(bookshelfId);

  if (bookshelfTarget === -1) return;

  bookshelfs.splice(bookshelfTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(bookshelfId) {
  const bookshelfTarget = findbookshelf(bookshelfId);

  if (bookshelfTarget == null) return;

  bookshelfTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findbookshelf(bookshelfId) {
  for (const bookshelfItem of bookshelfs) {
    if (bookshelfItem.id === bookshelfId) {
      return bookshelfItem;
    }
  }
  return null;
}

function findbookselfIndex(bookshelfId) {
  for (const index in bookshelfs) {
    if (bookshelfs[index].id === bookshelfId) {
      return index;
    }
  }

  return -1;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(bookshelfs);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung penyimpanan local storage");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookshelf of data) {
      bookshelfs.push(bookshelf);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}