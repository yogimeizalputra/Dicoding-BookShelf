
# Bookshelf-App

Submission Project for the 'Create Front-End Web for Beginners' course by Dicoding Academy & Dicoding Indonesia.

## Description

The Bookshelf App is a web application for managing books, allowing users to handle their book lists with interactive features. The app is built using pure HTML, CSS, and JavaScript with a DOM manipulation approach.

## Preview

![screenshot20241127190516](https://github.com/user-attachments/assets/e0191d77-ef67-42c2-9699-5b6f1f9af9fd)

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Local Storage API

## UI/UX Features

- Responsive design for various screen sizes
- Smooth animations and transitions
- Visual feedback for user interactions
- Dark theme with a modern gradient
- Confirmation modal for critical actions

## Data Structure

```javascript
// Book data format
const bookData = {
  id: "timestamp",
  title: "string",
  author: "string",
  year: "number",
  isComplete: "boolean"
};
```

## Main Features

### 1. Book Management

- **Add New Book**

  ```javascript
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
  };
  
  ```
- **Edit Book**

  ```javascript
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
  };

  ```
- **Remove Book**

  ```javascript
  function removeTaskFromCompleted(bookshelfId) {
    const bookshelfTarget = findbookselfIndex(bookshelfId);
  
    if (bookshelfTarget === -1) return;
  
    bookshelfs.splice(bookshelfTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  };
  
  ```

### 2. Search Feature

```javascript
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

```

### 3. Reading Status Management

```javascript
const toggleBookComplete = (id) => {
  const book = books.find((b) => b.id === id);
  if (book) {
    book.isComplete = !book.isComplete;
    saveBooks();
    renderBooks();
  }
};
```

### 4. Local Data Storage

```javascript
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

```

### 5. Rendering and UI Updates

```javascript
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

```

## License

MIT
