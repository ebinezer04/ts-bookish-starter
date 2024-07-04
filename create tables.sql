CREATE TABLE Author (
    AuthorID int NOT NULL PRIMARY KEY,
    
    DateOfBirth DATE,
    LastName varchar(255),
    FirstName varchar(255),
)

CREATE TABLE Book (
    ISBN varchar(17) NOT NULL PRIMARY KEY,
    AuthorID int FOREIGN KEY REFERENCES Author(AuthorID),

    Title varchar(255),
    NumCopies int,
)

CREATE TABLE Reader (
    Username varchar(255) NOT NULL PRIMARY KEY,

    Passcode varchar(255),
    DateOfBirth DATE,
    LastName varchar(255),
    FirstName varchar(255),
)

CREATE TABLE BookUser (
    BookUserID int NOT NULL PRIMARY KEY,
    ISBN varchar(17) FOREIGN KEY REFERENCES Book(ISBN),
    Username varchar(255) FOREIGN KEY REFERENCES Reader(Username),

    BorrowedDate Date,
    DueDate Date,
)

