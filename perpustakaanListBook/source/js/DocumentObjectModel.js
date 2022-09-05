const BukuBelumSelesaiBaca = "prosesBaca";
const BukuSelesaiBaca = "selesaiBaca"; 
const BOOK_ITEMID = "itemId";

function tambahBuku() {
    const namaBuku = document.getElementById("namaBuku").value;
    const namaPenulis = document.getElementById("namaPenulis").value;
    const tahunTerbit = document.getElementById("tahunTerbit").value;
    const statusBuku = document.getElementById("statusBuku").checked;

    const book = rakBuku(namaBuku, namaPenulis, tahunTerbit, statusBuku);
    const bookObject = composebookObject(namaBuku, namaPenulis, tahunTerbit, statusBuku);
  
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(statusBuku==false){
        prosesBaca.append(book);
    }else{
        selesaiBaca.append(book);
    }    

    updateDataToStorage();
}

function rakBuku(namaBuku, namaPenulis, tahunTerbit, statusBuku){
    const nama_Buku = document.createElement("h3");
    nama_Buku.innerText = "Nama Buku : " + namaBuku;
    nama_Buku.classList.add("move")

    const penulis_buku = document.createElement("p");
    penulis_buku.innerText = "Nama Penulis : " + namaPenulis;

    const rilisBuku = document.createElement('p');
    rilisBuku.classList.add("year");
    rilisBuku.innerText = "Tahun Terbit : " + tahunTerbit;

    const statusBacaBuku = tombolSelsaiBaca();
    
    const hapusbuku = createRemoveButton();
    hapusbuku.innerText = "Hapus";
    
    const kondisibacabuku = document.createElement("div");
    kondisibacabuku.classList.add("action");
    if (statusBuku == true){
        statusBacaBuku.innerText = "Belum selesai";
    }else{
        statusBacaBuku.innerText = "Sudah selesai";
    }
    
    kondisibacabuku.append(statusBacaBuku, hapusbuku);
    const buku = document.createElement("article");
    buku.classList.add("book_item");
    buku.append(nama_Buku, penulis_buku, rilisBuku, kondisibacabuku);
    
    return buku;
};

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
};

function tombolSelsaiBaca(){
    return createButton("green", function(event){
        const parent = event.target.parentElement;
        tambahBukuToCompleted(parent.parentElement);
    });
};

function hapusBuku(elementBuku) {
    const bookPosition = findbookIndex(elementBuku[BOOK_ITEMID]);
    if (window.confirm("Apakah anda ingin menghapus buku ini dari rak?")){
        books.splice(bookPosition, 1);
        elementBuku.remove();
    }
    updateDataToStorage();
};

function createRemoveButton(){
    return createButton("red", function(event){
        const parent = event.target.parentElement;
        hapusBuku(parent.parentElement);
    });
};

function tambahBukuToCompleted(elementBuku){
    const nama_Bukud = elementBuku.querySelector(".book_item > h3").innerText;
    const penulis_bukued = elementBuku.querySelector(".book_item > p").innerText;
    const bookYeared = elementBuku.querySelector(".year").innerText;
    const statusBacaBuku = elementBuku.querySelector(".green").innerText;

    if (statusBacaBuku == "Sudah selesai"){
        const bukuSetelahDitambah = rakBuku(nama_Bukud, penulis_bukued, bookYeared, true)
        const book = findbook(elementBuku[BOOK_ITEMID]);
        book.isCompleted = true;
        bukuSetelahDitambah[BOOK_ITEMID] = book.id;
        const selesaiBaca = document.getElementById(BukuSelesaiBaca);
        selesaiBaca.append(bukuSetelahDitambah);
    }else{
        const bukuSetelahDitambah = rakBuku(nama_Bukud, penulis_bukued, bookYeared, false)
        const book = findbook(elementBuku[BOOK_ITEMID]);
        book.isCompleted = false;
        bukuSetelahDitambah[BOOK_ITEMID] = book.id;
        
        const prosesBaca = document.getElementById(BukuBelumSelesaiBaca);
        prosesBaca.append(bukuSetelahDitambah);
    }
    elementBuku.remove();

    updateDataToStorage();
};

function kondisitombolrefresh() {
    const belumdibaca = document.getElementById(BukuBelumSelesaiBaca);
    const sudahdibaca = document.getElementById(BukuSelesaiBaca);
  
    for(book of books){
        const bukuSetelahDitambah = rakBuku(book.title, book.author, book.year, book.isCompleted);
        bukuSetelahDitambah[BOOK_ITEMID] = book.id;
        
        if(book.isCompleted == false){
            belumdibaca.append(bukuSetelahDitambah);
            
        } else {
            sudahdibaca.append(bukuSetelahDitambah);
        }
    }
}
//storage
const STORAGE_KEY = "BOOK_APPS";
 
let books = [];
 
function isStorageExist() {
   if(typeof(Storage) === undefined){
       alert("Browser anda tidak mendukung local storage");
       return false
   }
   return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }
  
 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }
  
 function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }
  
 function composebookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
 }
  
 function findbook(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
 }
  
 function findbookIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;
  
        index++;
    }
    return -1;
 }

