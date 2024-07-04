var Connection = require('tedious').Connection;
var Request = require('tedious').Request;


var config = {
  server: "localhost:1433",
  options: {},
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
  request = new Request("select 42, 'hello world'", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
      // and we close the connection
      connection.close()
    }
  });

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      console.log(column.value);
    });
  });

  connection.execSql(request);
}
