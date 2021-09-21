const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

const DB_CONNECTION = process.env.DB_CONNECTION
const PORT = process.env.URL_CONNECTION || 4000

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to database');
});

mongoose.connection.once('open', () => {
    console.log('mongoose connected to database');
});



app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(`${PORT}`, () => {
    console.log(`now listening on port ${PORT}.`);
});

