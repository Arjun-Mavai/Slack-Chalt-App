import mysql from "mysql2/promise";

// Setup a connection pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});




export default async function executeQuery(query, params = []) {
    console.log("Attempting to connect with the following settings:", {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: "HIDDEN",
      database: process.env.DB_DATABASE,
    });
  
    // console.log("Executing query:", query);
  
    // console.log("Attempting to connect to the database...");
    try {
      // const [dbStatus] = await pool.query("SELECT DATABASE()");
      // console.log("Connected to database:", dbStatus);
  
      const [results, fields] = await pool.execute(query, params);
      // console.log("Query executed, results:", results);
      if (results.length === 0) {
        console.log("No data returned from the query.");
      }
      // console.log("Database connection successful, query executed.", results);
      return results;
    } catch (error) {
      console.error("Error occurred while executing the query", {
        error,
        query,
        params,
      });
      throw error;
    }
  }