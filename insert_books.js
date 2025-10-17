const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = "mongodb+srv://Alameen85_db_user:Damaturu85%21@myfirstcluster.tueykk9.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstCluster";
const client = new MongoClient(uri);

const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, price: 10.99, in_stock: true, pages: 180, publisher: "Scribner" },
  { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 12.5, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 9.99, in_stock: false, pages: 281, publisher: "J.B. Lippincott & Co." },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 14.99, in_stock: true, pages: 310, publisher: "George Allen & Unwin" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", published_year: 1951, price: 11.0, in_stock: true, pages: 214, publisher: "Little, Brown and Company" },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", published_year: 1932, price: 13.5, in_stock: false, pages: 268, publisher: "Chatto & Windus" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, price: 20.0, in_stock: true, pages: 223, publisher: "Bloomsbury" },
  { title: "The Da Vinci Code", author: "Dan Brown", genre: "Thriller", published_year: 2003, price: 15.99, in_stock: true, pages: 489, publisher: "Doubleday" },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Adventure", published_year: 1988, price: 10.0, in_stock: true, pages: 197, publisher: "HarperTorch" },
  { title: "The Hunger Games", author: "Suzanne Collins", genre: "Dystopian", published_year: 2008, price: 12.99, in_stock: true, pages: 374, publisher: "Scholastic Press" }
];

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const booksCollection = db.collection("books");

    // Insert books into the collection
    const result = await booksCollection.insertMany(books);
    console.log(`${result.insertedCount} books inserted successfully!`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
