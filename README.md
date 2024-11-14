
# Bookshelf-App

Submission Project for the 'Create Front-End Web for Beginners' course by Dicoding Academy & Dicoding Indonesia.

## Description

The Bookshelf App is a web application for managing books, allowing users to handle their book lists with interactive features. The app is built using pure HTML, CSS, and JavaScript with a DOM manipulation approach.


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
  const addBook = (event) => {
    event.preventDefault();

    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = parseInt(document.getElementById("bookFormYear").value);
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    const newBook = {
      id: generateId(),
      title,
      author,
      year,
      isComplete,
    };

    books.push(newBook);
    saveBooks();
    renderBooks();
  };
  ```
- **Edit Book**

  ```javascript
  const editBook = (id) => {
    if (editingBookId === id) {
      hideEditForm();
    } else {
      const book = books.find((b) => b.id === id);
      if (book) {
        showEditForm(book);
      }
    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedBook = {
      id: editingBookId,
      title: editFormTitle.value,
      author: editFormAuthor.value,
      year: parseInt(editFormYear.value),
      isComplete: editFormIsComplete.checked,
    };
    books = books.map((book) =>
      book.id === editingBookId ? updatedBook : book
    );
    saveBooks();
    renderBooks();
    hideEditForm();
  };
  ```
- **Delete Book**

  ```javascript
  const deleteBook = (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      books = books.filter((b) => b.id !== id);
      saveBooks();
      renderBooks();
      if (editingBookId === id) {
        hideEditForm();
      }
    }
  };
  ```

### 2. Search Feature

```javascript
const searchBooks = (event) => {
  event.preventDefault();
  const searchTerm = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );
  renderBooks(filteredBooks);

  // Notification if no books are found
  const notification = document.getElementById("notification");
  if (filteredBooks.length === 0) {
    notification.style.display = "block";
    notification.textContent = "No books found!";
  } else {
    notification.style.display = "none";
  }
};
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
// Save data to localStorage
const saveBooks = () => {
  localStorage.setItem("books", JSON.stringify(books));
};

// Load data from localStorage when the app starts
let books = JSON.parse(localStorage.getItem("books")) || [];
```

### 5. Rendering and UI Updates

```javascript
const renderBooks = (filteredBooks = books) => {
  incompleteList.innerHTML = "";
  completeList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeList.appendChild(bookElement);
    } else {
      incompleteList.appendChild(bookElement);
    }
  });
};

const createBookElement = (book) => {
  const bookElement = document.createElement("div");
  bookElement.className = "book-item";
  bookElement.setAttribute("data-bookid", book.id);
  // ... configure book element
  return bookElement;
};
```

## License

MIT