CREATE DATABASE chat_db;

CREATE TABLE utenti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE messaggi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES utenti(id),
  FOREIGN KEY (receiver_id) REFERENCES utenti(id)
);

INSERT INTO messaggi (sender_id, receiver_id, content) VALUES
(1, 2, 'Ciao Jane, come stai oggi?'),
(2, 1, 'Ciao John! Sto bene grazie, e tu?'),
(1, 2, 'Tutto bene, grazie! Hai visto il film nuovo in uscita?'),
(2, 1, 'Sì, l\'ho visto! È stato incredibile!');

INSERT INTO messaggi (sender_id, receiver_id, content) VALUES
(3, 4, 'Ciao Sarah, stasera hai dei piani?'),
(4, 3, 'Ciao Mike, sto ancora pensando. Probabilmente uscirò a cena.'),
(3, 4, 'Uscire a cena suona bene! Forse potremmo organizzarci per incontrarci.');

INSERT INTO messaggi (sender_id, receiver_id, content) VALUES
(2, 5, 'Ciao David, come va la giornata?'),
(5, 2, 'Non male, grazie! Sto lavorando su un nuovo progetto.'),
(2, 5, 'Fammi sapere se hai bisogno di aiuto. Potrei dare un\'occhiata anche io.');

INSERT INTO messaggi (sender_id, receiver_id, content) VALUES
(1, 3, 'Ciao Sarah, come sta andando la giornata?'),
(3, 1, 'Ciao John! Tutto bene grazie, e tu?'),
(4, 2, 'Mike, hai sentito parlare della nuova libreria nel centro città?'),
(2, 4, 'Certo! L\'ho visitata la scorsa settimana ed è fantastica.'),
(5, 1, 'John, hai letto il libro che ti ho prestato?'),
(1, 5, 'Sì, l\'ho letto! È stato davvero interessante.'),
(3, 5, 'David, cosa ne pensi del progetto su cui stiamo lavorando insieme?'),
(5, 3, 'Penso che stia andando bene! Sono ottimista sulle nostre prospettive.'),
(4, 5, 'Sarah, hai visitato la mostra d\'arte al museo?'),
(5, 4, 'Sì, l\'ho vista la scorsa settimana. Mi è piaciuta molto.');
