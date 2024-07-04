import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { library } from 'tedious';

const port = process.env['PORT'] || 3000;

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

class Book {
  Title: string = '';
  ISBN: string = '';
  AuthorID: number = 0;
  numOfCopies: number = -1;
  constructor(ISBN: string, AuthorID: number, Title: string, numOfCopies: number) {
    this.ISBN = ISBN;
    this.AuthorID = AuthorID;
    this.Title = Title;
    this.numOfCopies = numOfCopies;
  }
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
var config = {
  server: 'BARRACUDA',

  options: {
    database: 'bookish',
    trustServerCertificate: true,
  },

  authentication: {
    type: "default",
    options: {
        userName: "bookish",
        password: "Softwire123456",
    }
  }
  
};

var connection = new Connection(config);

// Setup event handler when the connection is established. 
connection.on('connect', function(err) {
  if(err) {
    console.log('Error: ', err)
  }
  // If no error, then good to go...
  executeStatement();
});


// Initialize the connection.
connection.connect();
function executeStatement() {
  const request = new Request("SELECT * FROM Book", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
      res.send(bookList);
      // and we close the connection
      connection.close()
    }
  });

  let bookList = new Array();
  request.on('row', function(columns) {
    let currentBookArray = new Array();
    columns.forEach(function(column) {
      currentBookArray.push(column.value);
    });

    let currentBook = new Book(currentBookArray[0], currentBookArray[1], currentBookArray[2], currentBookArray[3]);
    bookList.push(currentBook);
  });
  connection.execSql(request);
}
})
