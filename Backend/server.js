require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');


const PORT = process.env.PORT || 5000;


async function start() {
await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB connected');
app.listen(PORT, () => console.log('Server started on', PORT));
}


start().catch(err => {
console.error(err);
process.exit(1);
});