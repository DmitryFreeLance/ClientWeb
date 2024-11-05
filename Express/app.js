const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

let contacts = [];

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const { name, surname, phoneNumber } = req.body;
  const newContact = { id: Date.now(), name, surname, phoneNumber };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, surname, phoneNumber } = req.body;
  const contact = contacts.find(c => c.id === parseInt(id));
  if (!contact) return res.status(404).send("Contact not found.");

  contact.name = name;
  contact.surname = surname;
  contact.phoneNumber = phoneNumber;
  res.json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter(c => c.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});