const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;
app.use(express.json());

// Dati dei libri
let libri = [
  { id: uuidv4(), titolo: 'Il Gattopardo', descrizione: 'Romanzo storico italiano', quantita: 7, prezzo: 15.99, autore: 'Giuseppe Tomasi di Lampedusa' },
  { id: uuidv4(), titolo: 'I Promessi Sposi', descrizione: 'Classico della letteratura italiana', quantita: 4, prezzo: 18.50, autore: 'Alessandro Manzoni' },
  { id: uuidv4(), titolo: 'Il Nome della Rosa', descrizione: 'Giallo storico ambientato in un monastero', quantita: 10, prezzo: 22.00, autore: 'Umberto Eco' }
];

// Restituisce tutti i libri
app.get('/api/libri', (req, res) => res.json(libri));

// Restituisce un singolo libro
app.get('/api/libri/:id', (req, res) => {
  const libro = libri.find(l => l.id === req.params.id);
  res.json(libro || { messaggio: 'Libro non trovato' });
});

// Aggiunge nuovo libro
app.post('/api/libri', (req, res) => {
  const { titolo, descrizione, quantita, prezzo, autore } = req.body;
  const nuovoLibro = { id: uuidv4(), titolo, descrizione, quantita, prezzo, autore };
  libri.push(nuovoLibro);
  res.status(201).json(nuovoLibro);
});

// Elimina libro
app.delete('/api/libri/:id', (req, res) => {
  const libro = libri.find(l => l.id === req.params.id);
  if (libro) {
    libri = libri.filter(l => l.id !== req.params.id);
    res.json({ messaggio: 'Libro eliminato' });
  } else {
    res.status(404).json({ messaggio: 'Libro non trovato' });
  }
});

// Modifica quantità 
app.post('/api/libri/:id/quantita', (req, res) => {
  const libro = libri.find(l => l.id === req.params.id);
  if (libro) {
    libro.quantita += req.body.incremento || 0;  
    if (libro.quantita < 0) libro.quantita = 0;  
    res.json(libro);
  } else {
    res.status(404).json({ messaggio: 'Libro non trovato' });
  }
});

// Avvio server
const server = app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});

// Chiusura del server
const close = () => {
  server.close();
};

// Esportazione dell'app e della funzione di chiusura
module.exports = { app, close };
