function findAccountById(accounts, id) {
  const result = accounts.find((accountsObj) => {
    return accountsObj.id == id;
  });
  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountsA, accountsB) => {
    const lastNameA = accountsA.name.last;
    const lastNameB = accountsB.name.last;
    return lastNameA.toLowerCase() < lastNameB.toLowerCase() ? -1 : 1;
  });
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  // It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
  let count = 0;
  // I need to loop through the books
  // console.log(account);
  books.forEach((booksObj, index) => {
    // I have to loop through the array inside borrows array in the books object
    for (let i = 0; i < booksObj.borrows.length; i++) {
      if (account.id === booksObj.borrows[i].id) {
        count++;
      }
    }
  });
  return count;
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  //  It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
  // i need to return an array of book objects so i need an empty one to push to
  let booksPosseessed = [];

  const { id } = account;

  books.forEach((booksObj) => {
    const borrow = booksObj.borrows;

    if (borrow[0].id === id && borrow[0].returned === false) {
      const found = authors.find(
        (authorsObj) => booksObj.authorId === authorsObj.id
      );

      booksObj.author = found;

      booksPosseessed.push(booksObj);
    }
  });

  // console.log(booksPosseessed);

  return booksPosseessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
