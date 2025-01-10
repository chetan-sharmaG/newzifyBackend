const { default: axios } = require('axios');
const express = require('express')
const app = express();
const parseString = require('xml2js').parseString
const cors = require('cors')

app.use(cors());
// routing path
app.get('/', async(req, res) => {
    try{
        let response = await axios.get('https://timesofindia.indiatimes.com/rssfeedstopstories.cms')
        parseString(response.data, (err, result) => {
          if (err) {
            console.error('Error parsing XML:', err);
            res.status(500).send('Error parsing XML');
          } else {
            res.send(result.rss.channel[0].item)
          }
        });
      }catch(error){
        res.send(error)
      }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});