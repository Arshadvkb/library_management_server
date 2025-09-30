import mongoose from 'mongoose'
// Replace <db_password> with your actual MongoDB password
export const db=async ()=>{
await mongoose.connect(`${process.env.MONGO_DB_URI}`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
}