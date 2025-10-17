// queries.js
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Alameen85_db_user:Damaturu85%21@myfirstcluster.tueykk9.mongodb.net/";
const client = new MongoClient(uri);

async function runQueries() {
    try {
        await client.connect();
        const db = client.db("plp_bookstore");
        const books = db.collection("books");

        // 1. Find all books in a specific genre
        const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
        console.log("Fiction books:", fictionBooks);

        // 2. Find books published after 2000
        const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
        console.log("Books published after 2000:", recentBooks);

        // 3. Find books by a specific author
        const rowlingBooks = await books.find({ author: "J.K. Rowling" }).toArray();
        console.log("Books by J.K. Rowling:", rowlingBooks);

        // 4. Update the price of a specific book
        await books.updateOne(
            { title: "1984" },
            { $set: { price: 13.99 } }
        );
        console.log("Updated price of 1984");

        // 5. Delete a book by title
        await books.deleteOne({ title: "The Hobbit" });
        console.log("Deleted The Hobbit");

        // 6. Find books in stock and published after 2010 with projection
        const inStockRecent = await books.find(
            { in_stock: true, published_year: { $gt: 2010 } },
            { projection: { title: 1, author: 1, price: 1 } }
        ).toArray();
        console.log("In stock & published after 2010:", inStockRecent);

        // 7. Sort by price ascending
        const sortedAsc = await books.find().sort({ price: 1 }).toArray();
        console.log("Books sorted by price ascending:", sortedAsc);

        // 8. Sort by price descending
        const sortedDesc = await books.find().sort({ price: -1 }).toArray();
        console.log("Books sorted by price descending:", sortedDesc);

        // 9. Pagination: skip 0, limit 5
        const page1 = await books.find().skip(0).limit(5).toArray();
        console.log("Page 1 (5 books):", page1);

        // 10. Aggregation: average price by genre
        const avgPriceByGenre = await books.aggregate([
            { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
        ]).toArray();
        console.log("Average price by genre:", avgPriceByGenre);

        // 11. Aggregation: author with most books
        const topAuthor = await books.aggregate([
            { $group: { _id: "$author", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]).toArray();
        console.log("Author with most books:", topAuthor);

        // 12. Aggregation: books grouped by decade
        const booksByDecade = await books.aggregate([
            { $group: { _id: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]).toArray();
        console.log("Books by decade:", booksByDecade);

        // 13. Create index on title
        await books.createIndex({ title: 1 });
        console.log("Index created on title");

        // 14. Compound index on author and published_year
        await books.createIndex({ author: 1, published_year: 1 });
        console.log("Compound index created on author and published_year");

        // 15. Explain() for title index
        const explainTitle = await books.find({ title: "1984" }).explain();
        console.log("Explain result for title index:", explainTitle.queryPlanner);

    } finally {
        await client.close();
    }
}

runQueries().catch(console.dir);
