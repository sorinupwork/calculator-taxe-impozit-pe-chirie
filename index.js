const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const filePath = path.join(__dirname, 'index.html');

app.use(express.static(__dirname));

app.get('/calculator', (req, res) => {
	res.sendFile(filePath);
});

app.get('/*', (req, res) => {
	res.send('404 route')
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
