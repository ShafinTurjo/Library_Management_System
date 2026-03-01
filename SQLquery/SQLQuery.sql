USE master;
GO

CREATE LOGIN [new] WITH PASSWORD = '1234', CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF;
GO
USE LibraryDB;
CREATE USER [new] FOR LOGIN [new];
ALTER ROLE db_owner ADD MEMBER [new];
GO

CREATE DATABASE LibraryDB;
GO
USE LibraryDB;
GO
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL 
);
GO
ALTER TABLE users
ALTER COLUMN password VARCHAR(255) NOT NULL;
GO
ALTER TABLE users
ADD email VARCHAR(100) UNIQUE NOT NULL;
GO


ALTER TABLE users
ADD reset_token VARCHAR(255) NULL;
GO
ALTER TABLE users
ADD token_expire DATETIME NULL;
GO
ALTER TABLE users 
ADD name VARCHAR(100) NOT NULL; 
GO
TRUNCATE TABLE users;
DROP TABLE IF EXISTS users;
GO
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    userId VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    reset_token VARCHAR(255) NULL,
    token_expire DATETIME NULL
);
SELECT * FROM users ;
GO
CREATE TABLE Books (
    id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Available' 
);
SELECT * FROM Books;
TRUNCATE TABLE Books;
CREATE TABLE Transactions (
    transactionId INT PRIMARY KEY IDENTITY(1,1),
    userId VARCHAR(50) NOT NULL, 
    bookId INT NOT NULL,        
    issueDate DATE DEFAULT GETDATE(),
    dueDate DATE,               
    returnDate DATE NULL,        
    fine DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (bookId) REFERENCES Books(id)
);
SELECT * FROM Transactions ;

CREATE TABLE LibraryCards (
    cardId INT PRIMARY KEY IDENTITY(1,1),
    userId VARCHAR(50), 
    cardNumber VARCHAR(20) UNIQUE,
    issueDate DATE,
    expiryDate DATE,
    status VARCHAR(20) DEFAULT 'Active',
    FOREIGN KEY (userId) REFERENCES Users(userId)
);
SELECT * FROM LibraryCards ;