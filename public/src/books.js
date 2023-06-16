function findAuthorById(authors, id) {
  // It returns the author object that has the matching ID.
  // iterating through the array
  for (let i = 0; i < authors.length; i++) {
    // used an if with the condition to check if the author objects id property within the authors array is equal to the inputted id
    if (authors[i].id === id) {
      // return that spefific author if it true
      return authors[i];
    }
  }
}

function findBookById(books = [], id = "") {
  // It returns the book object that has the matching ID.
  // start by iterating through the array
  for (let book of books) {
    // use an if to check a condition that states if the id property within the book object thats in the books array is equal to the inputted id we would then return that book
    if (book.id === id) {
      // return that spefific book object
      return book;
    }
  }
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
