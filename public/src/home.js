function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  // It returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.
  // need an incrementor
  let count = 0;
  // need to loop through books array
  for (let i = 0; i < books.length; i++) {
    // need to do a nested loop through the borrows array which is a property inside the books array
    for (let j = 0; j < books[i].borrows.length; j++) {
      // make a condition that states if the borrow object thats nested in the books object if its returned property === false
      if (books[i].borrows[j].returned === false) {
        // if the above condition is truthy then increment the counter
        count++;
      }
    }
  }
  // return the counter to display how many books have been borrowed
  return count;
}

function helpToSort(object) {
  const keys = Object.keys(object);
  return keys.sort((keyA, keyB) => {
    if (object[keyA] > object[keyB]) {
      return -1;
    } else if (object[keyA] < object[keyB]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostCommonGenres(books) {
  // It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
  // empty arr to push to later
  let commonGenres = [];
  let obj = {};
  for (let book of books) {
    const { genre } = book;
    if (obj[genre] === undefined) {
      obj[genre] = 1;
    } else {
      obj[genre] += 1;
    }
  }
  // console.log(sortedData);
  const sortedData = helpToSort(obj);
  for (let key of sortedData) {
    let finalObj = { name: key, count: obj[key] };
    commonGenres.push(finalObj);
  }
  // console.log(commonGenres);
  return commonGenres.slice(0, 5);
}

/*
  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
function getMostPopularBooks(books) {
  // It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.

  // need an empty array to push to at the end
  let result = [];
  // iterating
  books.forEach((bookObj) => {
    // destructuring the object to the properties i need
    const { borrows, title } = bookObj;
    // creating the object I need
    let obj = { name: title, count: borrows.length };
    // pushing to the arr
    result.push(obj);
  });
  // making my sort function with my new arr that has my new obj in it
  result.sort((bookA, bookB) => {
    // I make a return with to sort my objects with their "count" properties from greatest to least
    return bookB.count - bookA.count;
  });
  // console.log(result);
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.
  // need an empty arr to push to at the end
  let result = [];
  // need an empty object to help sort
  let obj = {};
  // // iterating through author array
  // authors.forEach((authorObj) => {
  //   // destructing the properties I need
  //   const { id, name } = authorObj;
  //   if (obj[name] === undefined) {
  //     obj[name] = 1;
  //   } else {
  //     obj[name] += 1;
  //   }
  books.forEach((bookObj) => {
    // destructuring the object to the properties i need
    const { borrows, authorId } = bookObj;
    const authorObj = authors.find((authorsObj) => {
      return authorsObj.id === authorId;
    });
    // console.log(authorObj);
    const authorFullName = `${authorObj.name.first} ${authorObj.name.last}`;
    // creating the object I need
    const authorInResult = result.find((resultObj) => {
      return resultObj.name === authorFullName;
    });
    // console.log(authorInResult);
    if (authorInResult === undefined) {
      let FinalObj = {
        name: authorFullName,
        count: borrows.length,
      };
      // pushing to the arr
      result.push(FinalObj);
    } else {
    }
  });
  // making my sort function with my new arr that has my new obj in it
  result.sort((bookA, bookB) => {
    // I make a return with to sort my objects with their "count" properties from greatest to least
    return bookB.count - bookA.count;
  });
  // console.log(result);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
