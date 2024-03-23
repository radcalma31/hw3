const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'..','frontend')));

app.get('/',(req, res) => {
	res.sendFile(path.join(__dirname,'..','frontend','index.html'));
});

app.use(express.json());


//const API_KEY = '61fedc29cc84f3ead70405bc443d1b2b';

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const API_KEY = 'e59109cf2878c970a610f8786e681ad7';
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        
	const response = await axios.get(apiUrl);
        res.json(response.data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

