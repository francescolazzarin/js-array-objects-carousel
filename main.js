// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

arrayFoto=[
    {
        url:'Ronaldinho_11feb2007.jpg',
        titolo:'Dinho al barcellona',
        descrizione:'Ronaldinho in azione contro il Racing Santander nel 2007'
    },
    {
        url:'Ronaldinho_2012_02.jpg',
        titolo:'Dinho Atlético Mineiro',
        descrizione:`Ronaldinho in campo con la maglia dell'Atlético Mineiro`
    },
    {
        url:'Ronaldinho_and_Lula.jpg',
        titolo:'Dinho e il presidente del Brasile',
        descrizione:'Ronaldinho con il presidente del Brasile Lula prima di Brasile-Inghilterra del 1º giugno 2007'
    },
    {
        url:'Ronaldinho_by_Vicario.jpeg',
        titolo:'Dinho al milan',
        descrizione:'Ronaldinho al Milan nel 2010'
    },
    {
        url:'Ronaldinho_Gaúcho.jpg',
        titolo:'Dinho al Flamengo',
        descrizione:'Ronaldinho mentre esulta con la maglia del Flamengo'
    }
]

// associazione degli elementi in pagina

let caroselloHtml = document.getElementById('carosello')
let left = document.getElementById('scorrisinistra')
let right = document.getElementById('scorridestra')
let immaginiCarosello = document.getElementById('immaginiCarosello')
let thumbnails = document.getElementById('thumbnails')

// popolo il carosello

let immagineCorrente = document.createElement('img')
immagineCorrente.src = "./img/" + arrayFoto[0].url
immagineCorrente.alt = "carosello immagini"
immaginiCarosello.append(immagineCorrente)
const titoloImg=document.createElement('p')
titoloImg.classList.add('position-absolute')
titoloImg.innerText=arrayFoto[0].titolo+","+arrayFoto[0].descrizione
immaginiCarosello.append(titoloImg)

let indiceCorrente = 0

AggiornaThumbnails()

// aggiornaImmagineCorrente+titolo,descrizione

function aggiornaImmagineCorrente() {
    immagineCorrente.src = "./img/" + arrayFoto[indiceCorrente].url
    titoloImg.innerText=arrayFoto[indiceCorrente].titolo+","+arrayFoto[indiceCorrente].descrizione
}

// funzione al click per scorrere immagini

left.addEventListener('click', function () {
    indiceCorrente--

    if (indiceCorrente < 0) {
        indiceCorrente = arrayFoto.length - 1
    }

    aggiornaImmagineCorrente()
    AggiornaThumbnails()
})

// funzione al click per scorrere immagini

right.addEventListener('click', function () {
    indiceCorrente++

    if (indiceCorrente >= arrayFoto.length) {
        indiceCorrente = 0
    }

    aggiornaImmagineCorrente()
    AggiornaThumbnails()
})

// funzione per popolare e aggiornare miniature

function AggiornaThumbnails() {
    thumbnails.innerHTML = ""

    arrayFoto.forEach((element, index) => {
        let figure = document.createElement('figure')
        let imgThumbnails = document.createElement('img')

        imgThumbnails.src = "./img/" + element.url

        imgThumbnails.addEventListener('click', function () {
            indiceCorrente = index;
            aggiornaImmagineCorrente()
            AggiornaThumbnails()
        })

        if (index === indiceCorrente) {
            imgThumbnails.classList.add('active')
        }

        figure.append(imgThumbnails)
        thumbnails.append(figure)
    })
}

// bottoni per l'auto play

document.getElementById('stopAutoplay').addEventListener('click', stopAutoplay)
document.getElementById('startAutoplay').addEventListener('click', startAutoplay)
document.getElementById('inverti').addEventListener('click', invertiAutoplay)

// per clear interval

let autoplayInterval

// funzione per iniziare autoplay

function startAutoplay() {
    stopAutoplay()
    autoplayInterval = setInterval(function () {
        indiceCorrente++

        if (indiceCorrente >= arrayFoto.length) {
            indiceCorrente = 0;
        }

        aggiornaImmagineCorrente()
        AggiornaThumbnails()
    }, 3000)
}

// interrompe l'autoplay

function stopAutoplay() {
    clearInterval(autoplayInterval)
}

// inverte autoplay

function invertiAutoplay(){
    stopAutoplay()
    autoplayInterval = setInterval(function () {
        indiceCorrente--
        if (indiceCorrente < 0) {
            indiceCorrente = arrayFoto.length - 1
        }
        aggiornaImmagineCorrente()
        AggiornaThumbnails()
    },3000)
}


