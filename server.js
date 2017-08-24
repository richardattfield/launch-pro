const app = require('./app');
const port = 8000;
const getLaunchData = require('./backend-app/get_data.js');
const getCurrentDate = require('./backend-app/get_date.js');

app.listen(port, () => {
    console.log(`Express server is running on port:${port}`)
});

// will need to allow cross-origin requests since the server will request API data
// and respond to client requests from different domain
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});

app.get('/launches', (req, res) => {
    let offset = req.query.offset.toString();
    const date = getCurrentDate();
    getLaunchData(date, offset).then(launchData => {
        res.send(launchData);
    });
});

app.get('/frontend-app/main.js', (req, res) => {
    res.sendFile('main.js', { root: './frontend-app'});
});

app.get('/stylesheet.css', (req, res) => {
    res.sendFile('stylesheet.css', { root: './public'});
});

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './public'});
});
