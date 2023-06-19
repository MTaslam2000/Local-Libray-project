function findAuthorById(authors, id) {
  // Filter the authors array to find the author object with the matching ID
  const filteredAuthors = authors.filter((authorObj) => authorObj.id === id);

  // Return the first author object found (or undefined if not found)
  return filteredAuthors[0];
}

function findBookById(books = [], id = "") {
  // It returns the book object that has the matching ID.
  // start by iterating through the array
  const result = books.find((booksObj) => {
    // use an if to check a condition that states if the id property within the book object thats in the books array is equal to the inputted id we would then return that book
    if (booksObj.id === id) {
      // return that spefific book object
      return booksObj;
    }
  });
  // make sure to return outside the scope of the advanced function
  return result;
}

function partitionBooksByBorrowedStatus(books = []) {
  // It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.
  //The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.

  // make my empty arrays to push to later
  let borrowed = [];
  let available = [];
  let partitionedBooks = [];
  // iterate through the array dataset
  for (let book of books) {
    if (book.borrows[0].returned === false) {
      borrowed.push(book);
    } else {
      available.push(book);
    }
  }
  partitionedBooks.push(borrowed);
  partitionedBooks.push(available);
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  // It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
  let arr = [];
  const borrows = book.borrows;
  for (let account of accounts) {
    for (let borrow of borrows) {
      if (borrow.id === account.id) {
        account.returned = borrow.returned;
        arr.push(account);
      }
    }
  }
  return arr.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
