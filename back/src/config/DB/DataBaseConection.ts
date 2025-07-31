// import mongoose from "mongoose";
// import 'dotenv/config';

// const MONGODB_HOST = process.env['MONGODB_HOST'] || 'localhost';
// const MONGODB_USER = process.env['MONGODB_USER'] || 'root';
// const MONGODB_PASSWORD = process.env['MONGODB_PASSWORD'] || 'password';
// const PORT_DATABASE = process.env['PORT_DATABASE'] || '27017';
// const MONGODB_DATABASE = process.env['MONGODB_DATABASE'] || 'kotlinDB';

// // Construir URL con credenciales
// const MongoUrl = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${PORT_DATABASE}/${MONGODB_DATABASE}?authSource=admin`;

// export default async function connectToDatabase() {
//     try{
//         await mongoose.connect(MongoUrl, {
//             connectTimeoutMS: 10000
//         });
//         console.log('Database Connected Successfully');
//     } catch (Error) {
//         console.log('Error connecting to database:', Error);
//     }
// }


import mongoose from "mongoose";
import 'dotenv/config';

const MONGODB_HOST = process.env['MONGODB_HOST'] || 'localhost';
const PORT_DATABASE = process.env['PORT_DATABASE'] || '27017';
const MONGODB_DATABASE =process.env['MONGODB_DATABASE'] || 'kotlinDB';

const MongoUrl = `mongodb://${MONGODB_HOST}:${PORT_DATABASE}/${MONGODB_DATABASE}`;

export default async function connectToDatabase() {
    try{
        await mongoose.connect(MongoUrl, {
            connectTimeoutMS: 10000
        });
        console.log('Database Conected Seccessfully');
    } catch (Error) {
        console.log(Error);
    }
}