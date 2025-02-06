"use strict";

// Ostoskori
let ostoskori = [];

// Funktio, joka alustaa ostoskorin ja palauttaa tallennetut tiedot
function alusta() {
    let storedOstoskori = localStorage.getItem('ostoskori');
    if (storedOstoskori) {
        ostoskori = JSON.parse(storedOstoskori);  // Lataa ostoskori paikallisesti tallennetuista tiedoista
    }
    paivitaOstoskori();
}

// Funktio lisätä tuote ostoskoriin
function lisaaOstoskoriin() {
    let nimi = document.getElementById('tuoteNimi').value;
    let montako = Number(document.getElementById('montako').value);
    let hinta = Number(document.getElementById('hinta').value);

    if (nimi.trim() === "" || isNaN(montako) || montako <= 0 || isNaN(hinta) || hinta <= 0) {
        alert("Virheelliset syötteet! Varmista, että kaikki kentät on täytetty oikein.");
        return;
    }

    let saastoPerKiekko = hinta * 0.1;
    let vuotuinenSaasto = montako * saastoPerKiekko;
    let kokonaisHinta = montako * hinta;

    // Lisää tuote ostoskoriin
    ostoskori.push({ nimi, montako, hinta, vuotuinenSaasto, kokonaisHinta });
    
    // Tallentaa ostoskorin localStorageen
    localStorage.setItem('ostoskori', JSON.stringify(ostoskori));
    paivitaOstoskori();
}

// Funktio päivittää ostoskorin näkymän
function paivitaOstoskori() {
    let ostoskoriDiv = document.getElementById('ostoskori');
    let yhteensaasto = ostoskori.reduce((sum, item) => sum + item.vuotuinenSaasto, 0);
    let yhteishinta = ostoskori.reduce((sum, item) => sum + item.kokonaisHinta, 0);

    let ostoskoriSisalto = "<ul>";
    ostoskori.forEach(item => {
        ostoskoriSisalto += `<li>${item.montako} kpl "${item.nimi}" à ${item.hinta.toFixed(2)} euroa = ${item.kokonaisHinta.toFixed(2)} euroa (säästö ${item.vuotuinenSaasto.toFixed(2)} euroa)</li>`;
    });
    ostoskoriSisalto += "</ul>";
    ostoskoriSisalto += `<p>Hankinnat yhteensä: ${yhteishinta.toFixed(2)} euroa</p>`;
    ostoskoriSisalto += `<p>Säästö kokonaisuudessaan: ${yhteensaasto.toFixed(2)} euroa</p>`;

    ostoskoriDiv.innerHTML = ostoskoriSisalto;

    // Näytä kokonaishinta ja säästö
    let kokonaishinta = yhteishinta * 0.9; // 10% alennus
    document.getElementById('kokonaisHinta').innerText = `Kokonaishinta alennuksella: ${kokonaishinta.toFixed(2)} euroa`;
    document.getElementById('saasto').innerText = `Säästetty summa: ${(yhteishinta - kokonaishinta).toFixed(2)} euroa`;
}

// Funktio tyhjentää ostoskori
function tyhjennaOstoskori() {
    ostoskori = [];  // Tyhjennetään ostoskori-taulukko
    localStorage.removeItem('ostoskori');  // Poistetaan ostoskori paikallisesta tallennuksesta
    paivitaOstoskori();  // Päivitetään ostoskorin näkymä
}
