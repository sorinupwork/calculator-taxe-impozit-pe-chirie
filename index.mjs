import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { port } from './constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'index.html');
const app = express();

app.use(express.static(__dirname));

app.get('/calculator', (req, res) => {
	res.sendFile(filePath);
});

app.get('/*', (req, res) => {
	res.send('404 Not Found');
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
