const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

let items;
if(fs.existsSync('./items.json')) items = require('./items.json');
else {
  fs.writeFileSync('./items.json', JSON.stringify([]));
  items = [];
}

app.use(cors());
app.use(bodyParser.json());

app.get('/api/items', (request, response) => {
  fs.promises.readFile('./items.json', 'utf8').then(data => {
    items = JSON.parse(data);
    response.status(200).json(items);
  }).catch(error => response.status(500).send(error));
});

app.post('/api/items/add', (request, response) => {
  const newItem = request.body;
  const maxId = items.reduce(((maxId, current) => maxId < current.id ? current.id : maxId), 0);
  newItem.id = maxId + 1;
  items.push(newItem);
  fs.writeFileSync('./items.json', JSON.stringify(items));
  response.status(200).json(newItem);
});

app.put('/api/items/edit', (request, response) => {
  const targetItem = request.body;
  items = items.map(item => item.id == targetItem.id ? targetItem : item);
  fs.writeFileSync('./items.json', JSON.stringify(items));
  response.status(200).json(targetItem);
});

app.put('/api/items/update', (request, response) => {
  const newItems = request.body;
  items = newItems;
  fs.writeFileSync('./items.json', JSON.stringify(items));
  response.status(200).json(items);
});

app.delete('/api/items/remove/:id', (request, response) => {
  const id = Number(request.params.id);
  items = items.filter(item => item.id != id);
  fs.writeFileSync('./items.json', JSON.stringify(items));
  response.status(200).json({ success: true });
});

app.listen(3000);