
const books = [
    { 
        title: "React Billionaire", 
        pages: 250, 
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    { 
        title: "Advanced JS", 
        pages: 500, 
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    { 
        title: "CSS Secrets", 
        pages: 320, 
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    { 
        title: "HTML Mastery", 
        pages: 200, 
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
  ];
  
//SECTION - Filtra e modifica
 //crea un array (longBooks) con i libri che hanno più di 300 pagine;
const longBooks = books.filter(books => books.pages>300) 
console.log(longBooks);

//Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
const longBooksTitles = longBooks.map(books => books.title)
console.log(longBooksTitles);

//Stampa in console ogni titolo nella console.
longBooksTitles.forEach(title => {
    console.log(title);
});

//SECTION - IL primo libro scontato
//Creare un array (availableBooks) che contiene tutti i libri disponibili.
const availableBooks = books.filter(book => book.available === true);
console.log(`Libri disponibili:`,availableBooks)

// Calcolare il prezzo scontato del 20% per ogni libro
function calcolaPrezzoScontato(prezzo) {
    const prezzoNumerico = parseFloat(prezzo.replace('€', ''));
    const prezzoScontato = prezzoNumerico * 0.80; 
    return prezzoScontato.toFixed(2) + '€'; 
}

//  Crea un array con i libri disponibili e il loro prezzo scontato
const discountedBooks = availableBooks.map(book => {
    return {
        title: book.title,
        pages: book.pages,
        author: book.author,
        available: book.available,
        price: calcolaPrezzoScontato(book.price), 
        tags: book.tags
    };
});

console.log('Libri con il prezzo scontato:', discountedBooks);

// Salva in una variabile (fullPricedBook) il primo libro con un prezzo intero (senza centesimi)
let fullPricedBook = discountedBooks.find(book => {

    const prezzoNumerico = parseFloat(book.price.replace('€', ''));
    return prezzoNumerico % 1 === 0; 
});

console.log('Primo libro con prezzo intero:', fullPricedBook);

//SECTION - Ordinare gli autori

//Creare un array (authors) che contiene gli autori dei libri.

const authors = books.map(book => book.author.name)
console.log(`Autori:`, authors);

//Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
const areAuthorsadults = authors.every(author => author.age >=18);
console.log(`GLi autori sono tutti maggiorenni :`, areAuthorsadults);

//Ordina l’array authors in base all’età, senza creare un nuovo array.(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
if (authors) {
   
    authors.sort((a, b) => a.age - b.age);
    console.log('Autori ordinati in ordine crescente di età:', authors);
} else {
   
    authors.sort((a, b) => b.age - a.age);
    console.log('Autori ordinati in ordine decrescente di età:', authors);
}

//SECTION - Calcola l'età media degli autori

//Creare un array (ages) che contiene le età degli autori dei libri.
const ages = books.map(book => book.author.age);
console.log(`Età degli autori`, ages)

//Calcola la somma delle età (agesSum) usando reduce

const agesSum = ages.reduce((sum, age) => sum + age, 0);
console.log(`Somma età degli autori:`, agesSum);

//Stampa in console l’età media degli autori dei libri.

const averageAge = agesSum / ages.length;
console.log('Età media degli autori:', averageAge.toFixed(2));


//!SECTION - Raccogli i libri

// Funzione che recupera i libri in base agli ID tramite l'API locale
async function getBooks(ids) {
    // Mappa gli ID per creare le richieste alle API per ciascun libro
    const bookPromises = ids.map(id => 
        fetch(`http://localhost:3333/books/${id}`)
            .then(response => response.json())
    );
    
    // Attendi che tutte le richieste vengano risolte
    const books = await Promise.all(bookPromises);
    
    // Restituisci l'array di libri
    return books;
}

// Array di ID per testare la funzione
const ids = [2, 13, 7, 21, 19];

// Test della funzione
getBooks(ids)
    .then(books => console.log(books))
    .catch(error => console.error("Errore nel recupero dei libri:", error));



