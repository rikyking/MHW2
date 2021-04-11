/**Funzione preferiti */
function aggiungiPreferiti(event){
    const aux=event.currentTarget;
    /**seleziono il div e il titolo nascosti e gli 
     * rimuovo la class hidden e gli griglia e testoPref*/
    const p=document.querySelector("#preferiti");
    p.classList.remove("hidden");
    p.classList.add("griglia");
    const titoloP=document.querySelector("#testoPref");
    titoloP.classList.remove("hidden");

    /**cambio immagine alla stella che diventa colorata*/
    aux.src="images/preferito.ico";

    /**creo tutti gli elementi  da aggiungere*/
    const div=document.createElement("div");
    const pref=document.createElement("img");
    const nome=document.createElement("h1");
    const foto=document.createElement("img");

    /**aggiungo classe preferito e il dataset 
     * corrispondente a quello che ha scatenato la funzione*/
    pref.classList.add("preferito");
    pref.dataset.idCroce=aux.dataset.idPref;

    /**ciclo for per prelevare nella mappa i dati 
     * corrispondenti con lo stesso dataset che ha scatenato la funzione*/
    for(let map in MAP){
        if(map=aux.dataset){
            nome.textContent=MAP[aux.dataset.idPref].titolo;
            pref.src="images/Imageres_dll_161.ico";
            foto.src=MAP[aux.dataset.idPref].img;
        }
    }
    /**inserisco gli elementi nella pagina */
    p.appendChild(div);
    div.appendChild(nome);
    div.appendChild(pref);
    div.appendChild(foto);
    /**aggiungo e rimuovo i listener*/
    aux.removeEventListener("click",aggiungiPreferiti);
    pref.addEventListener("click",rimuoviPreferito);
}
//**Funzione rimuovi preferiti */
function rimuoviPreferito(event){
    const aux=event.currentTarget;
    /**seleziono la section preferiti e tutti gli elementi 
     * con dataset idPref nella section principale*/
    const sec=document.querySelector("#preferiti");
    const star=document.querySelectorAll("[data-id-pref]");
    /**nella variabile count memorizzo quanti elemnti ci sono
     *  nella section preferiti*/
    var c=sec.childElementCount; 
    /**nella variabile box associo il parentNode, che sarebbe
     *  tutto il div da rimuovere*/
    const box=aux.parentNode;
    /**se count è 1 vuol dire che l'elemento è l'ultimo quindi
     *  lo rimuovo e nascondo la section e il titolo*/
    if(c==1){
        box.remove("div");
        sec.classList.add("hidden");
        const titoloP=document.querySelector("#testoPref");
        titoloP.classList.add("hidden");
    }else{
        box.remove("div");
    }
    /*scorro tutti gli elementi in star che hanno datset idPref, 
    se è lo stesso datset che ha scatenato la funzione allora 
    cambio immagine all'elemento trovato e lo rendo di nuovo cliccabile*/
    for(let i=0;i<star.length;i++){
        if (star[i].dataset.idPref===aux.dataset.idCroce){
            star[i].src="images/non-preferito.jpg";
            star[i].addEventListener("click",aggiungiPreferiti);
        }
    }
}

/**Funzione di ricerca*/
function ricerca(event){
    var input; 
    var maiusc;
    var section;
    var div;
    var titoli;
    var i;
    var testo;

    input=event.currentTarget;
    /**converto i caratteri in input maiuscoli*/
    maiusc=input.value.toUpperCase();
    /**seleziono la griglia e i div con i contenuti */
    section=document.getElementById("id-griglia");
    div=section.getElementsByTagName("div");
    
    
    for(i=0;i<div.length;i++){
        /**in titolo inserisco tutti i tag h1 che 
         * sarebbero i nomi da ricercare*/
        titoli=section.getElementsByTagName("h1")[i];
        /**se l'elemento i-esimo eiste entro nell'if*/
        if(titoli){
            /**inserisco il testo dei titoli in una variabile */
            testo=titoli.textContent || titoli.innerText;
            /**controllo se il testo in maiuscolo è 
             * contenuto nell'array maiusc 
             * grazie a indexOf che restituisce il primo 
             * indice in cui è possibile 
             * trovare un determinato elemento nell'array 
             * o -1 se non è presente.
             * Se il risultato è >-1 
             * allora visualizzo il div*/
            if(testo.toUpperCase().indexOf(maiusc)>-1){
                div[i].style.display="";
            }else{
                div[i].style.display="none";
            }   
        }
    }
}
const input=document.querySelector("input");
input.addEventListener("keyup",ricerca);


/**Funzione mostra dettagli*/
function maggioriDettagli(event) {
    const a = event.currentTarget;
    /**Modifico il testo del pulsante */
    a.querySelector("a").textContent = "Meno informazioni";
    /**rimuovo e aggiungo i listener*/
    a.removeEventListener("click", maggioriDettagli);
    a.addEventListener("click", minoriDettagli);
    /**Seleziono il tag p col testo e lo rendo visibile*/
    const p=a.querySelector("p");
    p.classList.remove("hidden");
    p.classList.add("dett");
}
//**Funzione nascondi dettagli*/
function minoriDettagli(event) {
    const a = event.currentTarget;
    /**Modifico il testo del pulsante */
    a.querySelector("a").textContent = "Più informazioni";
    /**rimuovo e aggiungo i listener*/
    a.removeEventListener("click", minoriDettagli);
    a.addEventListener("click", maggioriDettagli);
    /**Seleziono il tag p col testo e lo rendo nascosto*/
    const p=a.querySelector("p");
    p.classList.remove("dett");
    p.classList.add("hidden");
}


/**Ciclo for che riempie dinamicamente la pagina con i vari elementi,prendendo i dati da constant.js */
for(let map in MAP){
    //creazione elementi
    const sec=document.querySelector(".griglia");
    const div=document.createElement("div");
    const pref=document.createElement("img");
    const nome=document.createElement("h1");
    const img=document.createElement("img");
    const pulsante=document.createElement("span");
    const text=document.createElement("p");
    const a=document.createElement("a");

    //assegnazione classe e dataset
    pulsante.dataset.id=map;
    pulsante.classList.add("tasto");

    pref.dataset.idPref=map;
    pref.classList.add("preferito");

    text.classList.add("hidden");
    
    //assegnazione dati da constant.js
    pref.src="images/non-preferito.jpg";
    nome.textContent=MAP[map].titolo;
    img.src=MAP[map].img;
    a.textContent="Più informazioni";
    text.textContent=MAP[map].dettagli;

    //eventListener
    pulsante.addEventListener("click", maggioriDettagli);
    pref.addEventListener("click",aggiungiPreferiti);

    //inserimento nella pagina html
    sec.appendChild(div);
    div.appendChild(nome);
    div.appendChild(pref);
    div.appendChild(img);
    div.appendChild(pulsante);
    pulsante.appendChild(text);
    pulsante.appendChild(a);
}
