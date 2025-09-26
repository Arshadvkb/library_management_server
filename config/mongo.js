import mongoose from 'mongoose';

// Replace <db_password> with your actual MongoDB password
export const db=async ()=>{
await mongoose.connect('mongodb+srv://arshadvkb969_db_user:arshadvkb@cluster0.lnl0iml.mongodb.net/admin').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
}