CREATE DATABASE impiccato;
USE impiccato;

CREATE TABLE parole (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parola VARCHAR(255) NOT NULL
);

INSERT INTO parole (parola) VALUES 
('sommozzatore'), ('massaggiatrice'), ('marca'), ('prigione'), ('tubo'), 
('commento'), ('automatico'), ('furto'), ('piedistallo'), ('farina'), 
('carpa'), ('srotolare'), ('indirizzo'), ('plastica'), ('smalto'), 
('sud'), ('randagi'), ('artisti'), ('fragile'), ('argilla');
