const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();

const DB_CONNECTION = process.env.DB_CONNECTION
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

app.listen(4000, () => {
    console.log('now listening on port 4000.');
});

