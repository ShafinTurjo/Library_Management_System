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

IF OBJECT_ID('Category', 'U') IS NOT NULL DROP TABLE Category;
CREATE TABLE Category (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName VARCHAR(100) UNIQUE NOT NULL,
    Description VARCHAR(255) NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Admin (
    AdminID INT IDENTITY(1,1) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Phone VARCHAR(20) NULL,
    Role VARCHAR(50) DEFAULT 'Admin',
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);

IF OBJECT_ID('LibraryCard', 'U') IS NOT NULL DROP TABLE LibraryCard;
CREATE TABLE LibraryCard (
    CardID INT IDENTITY(1,1) PRIMARY KEY,
    CardNumber VARCHAR(50) UNIQUE NOT NULL,
    MemberID INT NOT NULL,
    IssueDate DATE DEFAULT GETDATE(),
    ExpiryDate DATE NOT NULL,
    Status VARCHAR(20) DEFAULT 'Active',
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
    FOREIGN KEY (MemberID) REFERENCES members(MemberID) ON DELETE CASCADE
);
GO

IF OBJECT_ID('BookIssue', 'U') IS NOT NULL DROP TABLE BookIssue;
CREATE TABLE BookIssue (
    IssueID INT IDENTITY(1,1) PRIMARY KEY,
    CopyID INT NOT NULL,
    MemberID INT NOT NULL,
    CardID INT NOT NULL,
    IssueDate DATE DEFAULT GETDATE(),
    DueDate DATE NOT NULL,
    ReturnDate DATE NULL,
    FineAmount DECIMAL(10,2) DEFAULT 0,
    Status VARCHAR(20) DEFAULT 'Issued',
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,
    FOREIGN KEY (CopyID) REFERENCES BookCopy(CopyID),
    FOREIGN KEY (MemberID) REFERENCES members(MemberID) ON DELETE CASCADE,
    FOREIGN KEY (CardID) REFERENCES LibraryCard(CardID)
);
GO

IF OBJECT_ID('BookReturn', 'U') IS NOT NULL DROP TABLE BookReturn;
CREATE TABLE BookReturn (
    ReturnID INT IDENTITY(1,1) PRIMARY KEY,
    IssueID INT NOT NULL,
    ReturnDate DATE DEFAULT GETDATE(),
    ReturnedCondition VARCHAR(50) NULL,
    DamageFee DECIMAL(10,2) DEFAULT 0,
    FineAmount DECIMAL(10,2) DEFAULT 0,
    TotalAmount AS (ISNULL(DamageFee,0) + ISNULL(FineAmount,0)) PERSISTED,
    Notes VARCHAR(255) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IssueID) REFERENCES BookIssue(IssueID) ON DELETE CASCADE,
    CONSTRAINT UQ_BookReturn_Issue UNIQUE (IssueID)
);
GO

UPDATE BookIssue
SET 
    ReturnDate = GETDATE(),
    Status = 'Returned',
    FineAmount = 0,
    UpdatedAt = GETDATE()
WHERE IssueID = 1;
DECLARE @issueId INT = 1;

UPDATE BookIssue
SET FineAmount =
    CASE 
        WHEN GETDATE() > DueDate THEN DATEDIFF(DAY, DueDate, GETDATE()) * 5
        ELSE 0
    END
WHERE IssueID = @issueId;

IF OBJECT_ID('BookCopy', 'U') IS NOT NULL DROP TABLE BookCopy;
CREATE TABLE BookCopy(
    CopyID INT IDENTITY(1,1) PRIMARY KEY,
    BookID INT NOT NULL,
    CopyBarcode VARCHAR(50) UNIQUE NOT NULL,
    RackID INT NULL,
    Status VARCHAR(20) DEFAULT 'Available',
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (BookID) REFERENCES Books(id) ON DELETE CASCADE,
    FOREIGN KEY (RackID) REFERENCES Rack(RackID)
);
GO

IF OBJECT_ID('Author', 'U') IS NOT NULL DROP TABLE Author;
CREATE TABLE Author (
    AuthorID INT IDENTITY(1,1) PRIMARY KEY,
    AuthorName VARCHAR(150) NOT NULL,
    Bio VARCHAR(MAX) NULL,
    Country VARCHAR(100) NULL,
    DateOfBirth DATE NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);
GO

IF OBJECT_ID('BookAuthor', 'U') IS NOT NULL DROP TABLE BookAuthor;
CREATE TABLE BookAuthor (
    BookAuthorID INT IDENTITY(1,1) PRIMARY KEY,
    BookID INT NOT NULL,
    AuthorID INT NOT NULL,

    FOREIGN KEY (BookID) REFERENCES Books(id) ON DELETE CASCADE,
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID) ON DELETE CASCADE,
    CONSTRAINT UQ_BookAuthor UNIQUE (BookID, AuthorID)
);
GO

IF OBJECT_ID('Publisher', 'U') IS NOT NULL DROP TABLE Publisher;
CREATE TABLE Publisher (
    PublisherID INT IDENTITY(1,1) PRIMARY KEY,
    PublisherName VARCHAR(150) UNIQUE NOT NULL,
    Phone VARCHAR(20) NULL,
    Email VARCHAR(100) NULL,
    Address VARCHAR(255) NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

IF OBJECT_ID('Rack', 'U') IS NOT NULL DROP TABLE Rack;
CREATE TABLE Rack (
    RackID INT IDENTITY(1,1) PRIMARY KEY,
    RackCode VARCHAR(50) UNIQUE NOT NULL,
    LocationNote VARCHAR(255) NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

IF OBJECT_ID('FineHistory', 'U') IS NOT NULL DROP TABLE FineHistory;
CREATE TABLE FineHistory (
    FineID INT IDENTITY(1,1) PRIMARY KEY,
    IssueID INT NOT NULL,
    MemberID INT NOT NULL,
    FineAmount DECIMAL(10,2) NOT NULL,
    FineReason VARCHAR(100) NOT NULL,
    PaidAmount DECIMAL(10,2) DEFAULT 0,
    DueAmount AS (FineAmount - ISNULL(PaidAmount,0)) PERSISTED,
    PaymentStatus VARCHAR(20) DEFAULT 'Unpaid',
    PaymentDate DATETIME NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IssueID) REFERENCES BookIssue(IssueID) ON DELETE CASCADE,
    FOREIGN KEY (MemberID) REFERENCES members(MemberID)
);
GO

INSERT INTO FineHistory(IssueID, MemberID, FineAmount, FineReason)
VALUES (@IssueID, @MemberID, @FineAmount, @FineReason);
UPDATE FineHistory
SET 
    PaidAmount = @PaidAmount,
    PaymentStatus = 
        CASE 
            WHEN @PaidAmount >= FineAmount THEN 'Paid'
            WHEN @PaidAmount > 0 THEN 'Partial'
            ELSE 'Unpaid'
        END,
    PaymentDate = GETDATE() WHERE FineID = @FineID;

IF OBJECT_ID('activity_logs', 'U') IS NOT NULL DROP TABLE activity_logs;
CREATE TABLE activity_logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    table_name VARCHAR(100) NULL,
    record_id INT NULL,
    description VARCHAR(500) NULL,
    ip_address VARCHAR(45) NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
GO