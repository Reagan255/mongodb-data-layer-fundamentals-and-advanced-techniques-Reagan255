// 1. Find all books in a specific genre
db.books.find({ genre: "Classic" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 9.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Catcher in the Rye" });

// ✅ Task 3: Advanced Queries

// Books in stock AND published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// Projection: Title, Author, Price only
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
);

// Sorting by price: ascending
db.books.find().sort({ price: 1 });

// Sorting by price: descending
db.books.find().sort({ price: -1 });

// Pagination: 5 books per page (example: Page 1)
db.books.find().skip(0).limit(5);

// Page 2
db.books.find().skip(5).limit(5);

// ✅ Task 4: Aggregation Pipelines

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// ✅ Task 5: Indexing

// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and publication year
db.books.createIndex({ author: 1, published_year: -1 });

// Explain() to show performance improvement
db.books.find({ title: "1984" }).explain("executionStats");
db.books.find({ author: "George Orwell" }).explain("executionStats");
