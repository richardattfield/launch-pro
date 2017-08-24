const app = require('./app');
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Express server is running on port:${port}`)
});

// will need to allow cross-origin requests since the server will request API data
// and respond to client requests from different domain
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
})