"use strict";

let ostoskori = [];

function alusta() {
    let montako = localStorage.getItem('montako');
    let hinta = localStorage.getItem('hinta');

    if (montako != null && hinta != null) {
        document.getElementById('montako').value = montako;
        document.getElementById('hinta').value = hinta;
        document.getElementById('kylla').checked = true;
    } else {
        document.getElementById('ei').checked = true;
    }

    laskesaasto(document.getElementById('montako').value,
                document.getElementById('hinta').value);
}

function laskesaasto(montako, hinta) {
    let saastoPerKiekko = hinta * 0.1;
    let vuotuinenSaasto = montako * saastoPerKiekko;

    document.getElementById('saasto').innerHTML =
        "<p>Säästät vuoden aikana " + vuotuinenSaasto.toFixed(2) + " euroa hankinnoissa.</p>";
}

function lisaaOstoskoriin() {
    let nimi = document.getElementById('nimi').value;
    let montako = Number(document.getElementById('montako').value);
    let hinta = Number(document.getElementById('hinta').value);
    let saastoPerKiekko = hinta * 0.1;
    let vuotuinenSaasto = montako * saastoPerKiekko;
    let kokonaisHinta = montako * hinta;

    ostoskori.push({ nimi, montako, hinta, vuotuinenSaasto, kokonaisHinta });
    paivitaOstoskori();
}

function paivitaOstoskori() {
    let ostoskoriDiv = document.getElementById('ostoskori');
    let yhteensaasto = ostoskori.reduce((sum, item) => sum + item.vuotuinenSaasto, 0);
    let yhteishinta = ostoskori.reduce((sum, item) => sum + item.kokonaisHinta, 0);

    let ostoskoriSisalto = "<ul>";
    ostoskori.forEach(item => {
        ostoskoriSisalto += `<li>${item.montako} kpl "${item.nimi}" à ${item.hinta} euroa = ${item.kokonaisHinta.toFixed(2)} euroa (säästö ${item.vuotuinenSaasto.toFixed(2)} euroa)</li>`;
    });
    ostoskoriSisalto += "</ul>";
    ostoskoriSisalto += `<p>Hankinnat yhteensä: ${yhteishinta.toFixed(2)} euroa</p>`;
    ostoskoriSisalto += `<p>Säästö kokonaisuudessaan: ${yhteensaasto.toFixed(2)} euroa</p>`;

    ostoskoriDiv.innerHTML = ostoskoriSisalto;
}

function tyhjennaOstoskori() {
    ostoskori = [];
    paivitaOstoskori();
}

function sailytys(valinta) {
    try {
        if (valinta === true) {
            localStorage.setItem('montako', document.getElementById('montako').value);
            localStorage.setItem('hinta', document.getElementById('hinta').value);
        } else {
            localStorage.removeItem('montako');
            localStorage.removeItem('hinta');
        }
    } catch (e) {
        console.error("Paikallisen tallennuksen käyttö ei onnistunut:", e);
    }
}
