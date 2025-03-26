// Lista di parole correlate
const wordPairs = [
  ["Cane", "Gatto"], ["Pizza", "Pasta"], ["Mela", "Arancia"], ["Sole", "Luna"], 
    ["Auto", "Moto"], ["Freddo", "Caldo"], ["Bianco", "Nero"], ["Montagna", "Mare"],
    ["Giorno", "Notte"], ["Terra", "Cielo"], ["Fiume", "Lago"], ["Carne", "Pesce"],
    ["Dolce", "Salato"], ["Fuoco", "Acqua"], ["Destra", "Sinistra"], ["Occhiali", "Lenti"],
    ["Telefono", "Tablet"], ["Matita", "Penna"], ["Cacciavite", "Martello"], ["Panchina", "Sedia"],
    ["Cielo", "Nuvola"], ["Ombra", "Luce"], ["Dottore", "Infermiere"], ["Leone", "Tigre"],
    ["Computer", "Laptop"], ["Teatro", "Cinema"], ["Farfalla", "Ape"], ["Treno", "Autobus"],
    ["Pesce", "Squalo"], ["Scuola", "Università"], ["Bambino", "Neonato"], ["Bicicletta", "Monopattino"],
    ["Lavagna", "Gesso"], ["Latte", "Caffè"], ["Scarpa", "Stivale"], ["Albero", "Foresta"],
    ["Uccello", "Aquila"], ["Orologio", "Sveglia"], ["Cappello", "Berretto"], ["Chitarra", "Pianoforte"],
    ["Lampada", "Candela"], ["Cuscino", "Coperta"], ["Tavolo", "Sedia"], ["Pittura", "Disegno"],
    ["Carta", "Cartone"], ["Strada", "Autostrada"], ["Tenda", "Finestre"], ["Borsa", "Valigia"],
    ["Piatto", "Bicchiere"], ["Televisione", "Radio"], ["Letto", "Divano"], ["Dizionario", "Libro"],
    ["Tigre", "Leopardo"], ["Vento", "Tempesta"], ["Occhio", "Vista"], ["Cuore", "Amore"],
    ["Ferro", "Acciaio"], ["Danza", "Ballo"], ["Musica", "Concerto"], ["Carota", "Patata"],
    ["Lago", "Mare"], ["Astronauta", "Cosmonauta"], ["Astronomia", "Astrofisica"], ["Scienza", "Matematica"],
    ["Fiume", "Cascata"], ["Piuma", "Cuscino"], ["Pinguino", "Orso polare"], ["Pittura", "Scultura"],
    ["Ghiaccio", "Neve"], ["Melone", "Anguria"], ["Panino", "Toast"], ["Soldato", "Generale"],
    ["Matita", "Pennarello"], ["Stella", "Galassia"], ["Fiore", "Orchidea"], ["Serpente", "Cobra"],
    ["Lupo", "Volpe"], ["Falco", "Aquila"], ["Squalo", "Delfino"], ["Elettricità", "Energia"],
    ["Moto", "Bicicletta"], ["Medico", "Chirurgo"], ["Pasticceria", "Panetteria"], ["Gelato", "Sorbetto"],
    ["Treno", "Metro"], ["Scoiattolo", "Castoro"], ["Pantera", "Giaguaro"], ["Zucchero", "Miele"],
    ["Parco", "Giardino"], ["Bottiglia", "Vetro"], ["Oceano", "Mare"], ["Coccodrillo", "Alligatore"],
    ["Spada", "Sciabola"], ["Poliziotto", "Carabiniere"], ["Mela", "Pera"], ["Corda", "Filo"],
    ["Delfino", "Balena"], ["Caffè", "Espresso"], ["Arco", "Freccia"], ["Montagna", "Collina"],
    ["Scarpa", "Sandalo"], ["Tazza", "Bicchiere"], ["Fungo", "Tartufo"], ["Martello", "Chiave inglese"],
    ["Vino", "Champagne"], ["Chitarra", "Ukulele"], ["Tappeto", "Moquette"], ["Finestra", "Specchio"],
    ["Autunno", "Primavera"], ["Estate", "Inverno"], ["Serpente", "Anaconda"], ["Radice", "Pianta"]
];

let players = [];
let numPlayers = 0;
let mrWhiteIndex = -1;

// Funzione per iniziare il gioco
function startGame() {
    numPlayers = parseInt(prompt("Quanti giocatori?"));
    if (numPlayers < 3) {
        alert("Il numero minimo di giocatori è 3!");
        return;
    }

    players = [];
    mrWhiteIndex = Math.floor(Math.random() * numPlayers); // Seleziona un Mr. White casuale

    // Sceglie una coppia di parole casuale
    let randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    let civilianWord = randomPair[0]; // Parola per i civili
    let undercoverWord = randomPair[1]; // Parola per gli undercover

    let numUndercover = Math.floor(numPlayers / 3); // Circa 1/3 degli undercover
    let assignedUndercover = 0;

    for (let i = 0; i < numPlayers; i++) {
        if (i === mrWhiteIndex) {
            players.push({ id: i + 1, role: "Mr. White", word: null });
        } else if (assignedUndercover < numUndercover) {
            players.push({ id: i + 1, role: "Undercover", word: undercoverWord });
            assignedUndercover++;
        } else {
            players.push({ id: i + 1, role: "Civile", word: civilianWord });
        }
    }

    showPlayers();
}

// Mostra i giocatori senza rivelare il ruolo
function showPlayers() {
    let container = document.getElementById("players");
    container.innerHTML = "";
    players.forEach(player => {
        let div = document.createElement("div");
        div.className = "player";
        div.innerHTML = `Giocatore ${player.id} - <button onclick="showWord(${player.id})">Vedi parola</button>`;
        container.appendChild(div);
    });
}

// Mostra la parola del giocatore
function showWord(id) {
    let player = players.find(p => p.id === id);
    if (player.word) {
        alert(`La tua parola è: ${player.word}`);
    } else {
        alert("Sei Mr. White, non hai parola!");
    }
}

// Eliminazione di un giocatore tramite voto
function eliminatePlayer() {
    let playerId = prompt("Chi vuoi eliminare? (inserisci il numero del giocatore)");
    let player = players.find(p => p.id == playerId);

    if (player) {
        alert(`Hai eliminato il giocatore ${player.id} - ${player.role}`);
        players = players.filter(p => p.id != playerId); // Rimuove il giocatore
        showPlayers(); // Aggiorna la lista dei giocatori
    } else {
        alert("Giocatore non trovato!");
    }
}

