window.onload = () => {
    class Terminale {
        constructor() {
            this.init();
        }

        init = function () {
            this.mainContainer = document.querySelector(".desktop");
            this.mainTerminale = this.mainContainer.querySelector(".terminale");
            this.pulsanteChiusura = this.mainTerminale.querySelector(".header>.chiusura");
            this.pulsanteRiduci = this.mainTerminale.querySelector(".header>.riduci");
            this.pulsanteEspandi = this.mainTerminale.querySelector(".header>.espandi");
            this.inputContent = this.mainTerminale.querySelector(".row>.input");
            this.pulsanteApertura = this.mainContainer.querySelector(".footer>.terminal");
            this.pulsanteApertura.addEventListener("click", () => { this.apriTerminale(); });
            this.pulsanteChiusura.addEventListener("click", () => { this.distruggiTerminale(); });
            this.pulsanteRiduci.addEventListener("click", () => { this.nascondiTerminale(); });
            this.pulsanteEspandi.addEventListener("click", () => { this.toggleFullscreen(); });
            this.inputContent.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();//serve per non far andare a capo dopo aver cliccato enter
                    this.eseguiComando(this.inputContent.textContent);
                }
                this.nascondi = false;
            });
            this.makeDraggable();
        };

        makeDraggable = function () {
            // Inizializza le variabili per tenere traccia delle coordinate del mouse e della posizione dell'elemento
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

            // Seleziona l'elemento con la classe "header" all'interno del mainContainer
            let shellBar = this.mainContainer.querySelector(".header");

            // Aggiunge un listener per l'evento mousedown sull'elemento shellBar
            shellBar.onmousedown = (e) => {
                // Previene il comportamento predefinito del browser
                e.preventDefault();

                // Memorizza la posizione iniziale del mouse
                pos3 = e.clientX;
                pos4 = e.clientY;

                // Aggiunge i listener per gli eventi mouseup e mousemove sull'intero documento
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            };

            // Funzione per gestire l'evento mousemove (trascinamento dell'elemento)
            const elementDrag = (e) => {
                // Previene il comportamento predefinito del browser
                e.preventDefault();

                // Calcola la nuova posizione del cursore
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;

                // Aggiorna la posizione attuale del mouse
                pos3 = e.clientX;
                pos4 = e.clientY;

                // Aggiorna la posizione dell'elemento mainContainer
                this.mainContainer.style.top = (this.mainContainer.offsetTop - pos2) + "px";
                this.mainContainer.style.left = (this.mainContainer.offsetLeft - pos1) + "px";
            };

            // Funzione per gestire quando avviene il rilascio del mouse
            const closeDragElement = () => {
                // Rimuove i listener per gli eventi mouseup e mousemove
                document.onmouseup = null;
                document.onmousemove = null;
            };
        };

        apriTerminale = function () {
            if (this.nascondi == true) {
                this.mainTerminale.style.display = "block";
                this.nascondi = false;
            }
            if (!document.querySelector(".desktop .terminale")) {
                const terminaleDiv = document.createElement("div");
                terminaleDiv.className = "terminale";
                const headerDiv = document.createElement("div");
                headerDiv.className = "header";
                const chiusuraDiv = document.createElement("div");
                chiusuraDiv.className = "icon chiusura";
                chiusuraDiv.style.marginRight = "5px";
                const riduciDiv = document.createElement("div");
                riduciDiv.className = "icon riduci";
                riduciDiv.style.marginRight = "5px";
                const espandiDiv = document.createElement("div");
                espandiDiv.className = "icon espandi";
                espandiDiv.style.marginRight = "5px";
                const titoloDiv = document.createElement("div");
                titoloDiv.className = "titolo";
                titoloDiv.textContent = "VV@terminale";
                const row1Div = document.createElement("div");
                row1Div.className = "row";
                const before1Span = document.createElement("strong");
                before1Span.className = "before";
                before1Span.textContent = "VV@my-computer: /home/usr/$> ";
                const input1Span = document.createElement("span");
                input1Span.className = "input";
                input1Span.contentEditable = "true";
                input1Span.autofocus = "true";
                headerDiv.appendChild(chiusuraDiv);
                headerDiv.appendChild(riduciDiv);
                headerDiv.appendChild(espandiDiv);
                headerDiv.appendChild(titoloDiv);
                row1Div.appendChild(before1Span);
                row1Div.appendChild(input1Span);
                terminaleDiv.appendChild(headerDiv);
                terminaleDiv.appendChild(row1Div);
                this.mainContainer.appendChild(terminaleDiv);
                this.mainTerminale = terminaleDiv;
                this.pulsanteChiusura = terminaleDiv.querySelector(".header>.chiusura");
                this.pulsanteRiduci = terminaleDiv.querySelector(".header>.riduci");
                this.pulsanteEspandi = terminaleDiv.querySelector(".header>.espandi");
                this.inputContent = this.mainTerminale.querySelector(".row>.input");
                this.mainContainer.style.top = "0px";
                this.mainContainer.style.left = "0px";
                this.init();
            }
        };

        nascondiTerminale = function () {
            this.mainTerminale.style.display = "none";//si può usare anche hidden
            this.nascondi = true;
        };

        distruggiTerminale = function () {
            this.mainTerminale.remove();
        };

        eseguiComando = async function (contenuto) {
            let array = contenuto.split(" ");
            console.log(array[0]);
            let risultato = "";
            let clear = false;

            switch (array[0].toLowerCase()) {
                case "time":
                    risultato = this.tempo();
                    break;
                case "help":
                    risultato = "<strong style='color: lime; '> Comandi a disposizione: <ul><li>clear</li> <li>exit</li> <li>help</li> <li>meteo ['città da cercare']</li> <li>squadra ['squadra italiana da cercare']</li> <li>sysinfo</li>  <li>time</li></ul></strong>";
                    break;
                case "clear":
                    clear = true;
                    break;
                case "squadra":
                    if (array.length > 1) {
                        let squadra = array.slice(1).join(" "); //array.slice(1) restituisce un nuovo array che inizia dall'indice 1 fino alla fine dell'array,.join(" ") invece viene utilizzato per unire tutti gli elementi di un array in una singola stringa.
                        //L'argomento " " (uno spazio) specifica che gli elementi dell'array devono essere uniti con uno spazio tra di loro.
                        risultato = await this.informazioniSquadra(squadra);
                    } else {
                        risultato = "Devi specificare il nome della squadra.";
                    }
                    break;
                case "sysinfo":
                    risultato = this.generaSysInfo();
                    break;
                case "exit":
                    window.close();
                    break;
                case "":
                    break;
                case "meteo":
                    if (array.length > 1) {
                        let citta = array.slice(1).join(" ");
                        risultato = await this.ottieniMeteo(citta);
                    } else {
                        risultato = "Devi specificare il nome della città.";
                    }
                    break;
                default:
                    risultato = "Comando non trovato! Semu pessi!";
                    break;
            }

            if (!clear) {
                this.esito(risultato);
                this.creaNuovaRiga();
            } else {
                this.clearEsotico();
            }
        };

        clearEsotico = function () {
            const terminale = document.querySelector('.terminale');
            const righe = terminale.querySelectorAll('.row');
            for (let i = 0; i < righe.length; i++) {
                terminale.removeChild(righe[i]);
            }
            this.creaNuovaRiga();
        };

        creaNuovaRiga = function () {
            const terminaleDiv = document.querySelector(".terminale");
            const row1Div = document.createElement("div");
            row1Div.className = "row";
            const before1Span = document.createElement("strong");
            before1Span.className = "before";
            before1Span.textContent = "VV@my-computer: /home/usr/$> ";
            const input1Span = document.createElement("span");
            input1Span.className = "input";
            input1Span.contentEditable = "true";
            input1Span.autofocus = "true";
            row1Div.appendChild(before1Span);
            row1Div.appendChild(input1Span);
            terminaleDiv.appendChild(row1Div);
            input1Span.focus();//passo l'autofocus al nuovo input
            this.inputContent.contentEditable = false;//serve per non rendere modificabile le vecchie righe 
            input1Span.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    this.eseguiComando(input1Span.textContent);
                }
            });

            this.inputContent = input1Span;
        };

        esito = function (risultato) {
            const terminaleDiv = document.querySelector(".terminale");
            const row1Div = document.createElement("div");
            row1Div.className = "row";
            row1Div.style.paddingTop = 0;
            const before1Span = document.createElement("span");
            before1Span.innerHTML = risultato;
            row1Div.appendChild(before1Span);
            terminaleDiv.appendChild(row1Div);
        };

        tempo = function () {
            const dataOraAttuali = new Date();
            const anno = dataOraAttuali.getFullYear();
            const mese = (dataOraAttuali.getMonth() + 1) > 9 ? (dataOraAttuali.getMonth() + 1) : '0' + (dataOraAttuali.getMonth() + 1);
            const giorno = dataOraAttuali.getDate() > 9 ? dataOraAttuali.getDate() : '0' + dataOraAttuali.getDate();
            const ora = dataOraAttuali.getHours() > 9 ? dataOraAttuali.getHours() : '0' + dataOraAttuali.getHours();
            const minuti = dataOraAttuali.getMinutes() > 9 ? dataOraAttuali.getMinutes() : '0' + dataOraAttuali.getMinutes();
            const secondi = dataOraAttuali.getSeconds() > 9 ? dataOraAttuali.getSeconds() : '0' + dataOraAttuali.getSeconds();
            var dataOraFormattata = `<strong style="color: lime;">Data odierna:</strong> ${anno}-${mese}-${giorno} <br> <strong style="color: lime;">Ora:</strong> ${ora}:${minuti}:${secondi}`;
            return dataOraFormattata;
        };



        toggleFullscreen = function () {
            if (!this.fullscreen) {
                this.mainTerminale.classList.add('fullscreen');
                this.fullscreen = true;
            } else {
                this.mainTerminale.classList.remove('fullscreen');
                this.fullscreen = false;
            }
        };

        generaSysInfo = function () {
            return `
                <strong style="color: lime;">Sistema Operativo:</strong> macOS Ventura<br>
                <strong style="color: lime;">Versione OS:</strong> 13.4<br>
                <strong style="color: lime;">CPU:</strong> Apple M3 Max<br>
                <strong style="color: lime;">RAM:</strong> 32GB Unified Memory<br>
                <strong style="color: lime;">Spazio Disco:</strong> 1TB SSD<br>
                <strong style="color: lime;">Schermo:</strong> 16" Liquid Retina XDR<br>
                <strong style="color: lime;">Rete:</strong> WiFi 6E (802.11ax) (connesso)
            `;
        };


        ottieniMeteo = async function (location) {
            let chiave = "42dfe41528415300b7c98c856244eeec";
            let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=" + chiave;
            try {
                const promessaRisposta = await fetch(url);
                const datiJSon = await promessaRisposta.json();

                const temperatura = datiJSon.main.temp;
                const temperaturaPercepita = datiJSon.main.feels_like;
                const descrizioneMeteo = datiJSon.weather[0].description;
                const velocitaVento = datiJSon.wind.speed;
                const umidita = datiJSon.main.humidity;
                const pressione = datiJSon.main.pressure;
                const visibilita = datiJSon.visibility;
                const nuvolosita = datiJSon.clouds.all;
                const alba = new Date(datiJSon.sys.sunrise * 1000).toLocaleTimeString();
                const tramonto = new Date(datiJSon.sys.sunset * 1000).toLocaleTimeString();
                const citta = datiJSon.name;
                const nazione = datiJSon.sys.country;

                return `
                    <strong style="color: lime;">Città:</strong> ${citta}, ${nazione}<br>
                    <strong style="color: lime;">Temperatura:</strong> ${temperatura} °C<br>
                    <strong style="color: lime;">Temperatura percepita:</strong> ${temperaturaPercepita} °C<br>
                    <strong style="color: lime;">Descrizione meteo:</strong> ${descrizioneMeteo}<br>
                    <strong style="color: lime;">Velocità del vento:</strong> ${velocitaVento} m/s<br>
                    <strong style="color: lime;">Umidità:</strong> ${umidita} %<br>
                    <strong style="color: lime;">Pressione:</strong> ${pressione} hPa<br>
                    <strong style="color: lime;">Visibilità:</strong> ${visibilita} m<br>
                    <strong style="color: lime;">Nuvolosità:</strong> ${nuvolosita} %<br>
                    <strong style="color: lime;">Alba:</strong> ${alba}<br>
                    <strong style="color: lime;">Tramonto:</strong> ${tramonto}
                `;
            } catch (error) {
                console.error('Errore nel recupero dei dati meteo:', error);
                return 'Errore nel recupero dei dati meteo.';
            }
        };




        informazioniSquadra = async function (team) {
            const url = `https://api-football-v1.p.rapidapi.com/v3/teams?search=${team}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'd593fec28dmsh0a4e64dee934bc1p117a2bjsn2fac4d3310f7',
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();

                if (result.response.length === 0) {
                    return "Nessuna squadra trovata.";
                }

                // Trova la prima squadra italiana
                const italianTeamData = result.response.find(teamData => teamData.team.country === 'Italy');

                if (italianTeamData) {//controllo se è stata trovata una squadra
                    const team = italianTeamData.team; //dati squadra
                    const venue = italianTeamData.venue; //dati stadio

                    return `
                        <div>
                            <h2>Nome squadra: ${team.name}</h2>
                            <p><strong style="color: lime;">Paese:</strong> ${team.country}</p>
                            <p><strong style="color: lime;">Fondata:</strong> ${team.founded ? team.founded : 'N/A'}</p>
                            <p><strong style="color: lime;">Logo:</strong> <img src="${team.logo}" alt="Logo di ${team.name}" width="150" height="150"></p>
                            <h2>Informazioni Stadio</h2>
                            <p><strong style="color: lime;">Stadio:</strong> ${venue.name ? venue.name : 'N/A'}</p>
                            <p><strong style="color: lime;">Città:</strong> ${venue.city ? venue.city : 'N/A'}</p>
                            <p><strong style="color: lime;">Indirizzo:</strong> ${venue.address ? venue.address : 'N/A'}</p>
                            <p><strong style="color: lime;">Capacità:</strong> ${venue.capacity ? venue.capacity : 'N/A'}</p>
                            <p><strong style="color: lime;">Superficie:</strong> ${venue.surface ? venue.surface : 'N/A'}</p>
                            <p><strong style="color: lime;">Immagine stadio:</strong> ${venue.image ? `<img src="${venue.image}" alt="Immagine di ${venue.name}" width="200" height="150">` : 'N/A'}</p>
                        </div>
                    `;
                } else {
                    return "Nessuna squadra italiana trovata.";
                }

            } catch (error) {
                console.error(error);
                return "Errore durante il recupero delle informazioni.";
            }
        };


    }
    new Terminale();
}