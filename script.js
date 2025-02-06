document.addEventListener('DOMContentLoaded', (event) => {
    alusta();
});

function alusta() {
    const montako = localStorage.getItem('montako');
    const hinta = localStorage.getItem('hinta');

    if (montako != null && hinta != null) {
        const montakoElement = document.getElementById('montako');
        const hintaElement = document.getElementById('hinta');
        const kyllaElement = document.getElementById('kylla');
        const eiElement = document.getElementById('ei');

        if (montakoElement && hintaElement && kyllaElement && eiElement) {
            montakoElement.value = montako;
            hintaElement.value = hinta;
            kyllaElement.checked = true;
        } else {
            console.error('Yksi tai useampi elementtiä ei löytynyt');
        }
    } else {
        const eiElement = document.getElementById('ei');
        if (eiElement) {
            eiElement.checked = true;
        } else {
            console.error('Elementtiä ei löytynyt');
        }
    }

    const montakoElement = document.getElementById('montako');
    const hintaElement = document.getElementById('hinta');
    if (montakoElement && hintaElement) {
        laskesaasto(montakoElement.value, hintaElement.value);
    } else {
        console.error('Yksi tai useampi elementtiä ei löytynyt');
    }
}

function lisaaOstoskoriin() {
    const nimiElement = document.getElementById('nimi');
    const montakoElement = document.getElementById('montako');
    const hintaElement = document.getElementById('hinta');

    if (nimiElement && montakoElement && hintaElement) {
        const nimi = nimiElement.value;
        const montako = Number(montakoElement.value);
        const hinta = Number(hintaElement.value);
        const saastoPerKiekko = hinta * 0.1;
        const vuotuinenSaasto = montako * saastoPerKiekko;
        const kokonaisHinta = montako * hinta;

        ostoskori.push({ nimi, montako, hinta, vuotuinenSaasto, kokonaisHinta });
        paivitaOstoskori();
    } else {
        console.error('Yksi tai useampi elementtiä ei löytynyt');
    }
}
