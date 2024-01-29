const mongoose = require('mongoose');
const { Pool } = require('pg');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password:'Samepassword1!',
    port: 5432
  });
  
  

module.exports = {connectDB,pool}