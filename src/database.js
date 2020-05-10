const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI_ATLAS
    // ? process.env.MONGOOSE_URI_ATLAS
    // : 'mongodb://localhost/pos-system';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});