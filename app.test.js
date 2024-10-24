const request = require('supertest');
const { app, close } = require('./app');

describe("Test degli endpoint dell'API per i libri", () => {
    let libroValido; 
    test("GET /api/libri restituisce tutti i libri", async () => {
        const response = await request(app).get("/api/libri");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                titolo: expect.any(String),
                descrizione: expect.any(String),
                quantita: expect.any(Number),
                prezzo: expect.any(Number),
                autore: expect.any(String),
            }),
        ]));

        libroValido = response.body[0].id; 
    });

    test("GET /api/libri/:id restituisce un libro specifico", async () => {
        const response = await request(app).get(`/api/libri/${libroValido}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: libroValido,
            titolo: expect.any(String),
            descrizione: expect.any(String),
            quantita: expect.any(Number),
            prezzo: expect.any(Number),
            autore: expect.any(String),
        }));
    });

    test("POST /api/libri aggiunge un nuovo libro", async () => {
        const nuovoLibro = {
            titolo: 'Nuovo Giallo',
            descrizione: 'Un avvincente giallo moderno',
            quantita: 3,
            prezzo: 15.50,
            autore: 'Autore Sconosciuto'
        };

        const response = await request(app)
            .post("/api/libri")
            .send(nuovoLibro);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            titolo: nuovoLibro.titolo,
            descrizione: nuovoLibro.descrizione,
            quantita: nuovoLibro.quantita,
            prezzo: nuovoLibro.prezzo,
            autore: nuovoLibro.autore,
        }));

        libroValido = response.body.id;
    });

    test("DELETE /api/libri/:id elimina un libro esistente", async () => {
        const response = await request(app).delete(`/api/libri/${libroValido}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ messaggio: 'Libro eliminato' });
    });

    afterAll(done => {
        close(); 
        done();
    });
});
