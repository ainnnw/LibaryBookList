document.addEventListener("DOMContentLoaded", function(){
    const submitBook = document.getElementById("inputBook");

    submitBook.addEventListener("submit", function(event){
        event.preventDefault();
        tambahBuku();
    });
    

    if(isStorageExist()){
        loadDataFromStorage();
    
    } 
});

document.addEventListener("ondatasaved", () => {
    window.alert("Data akan di Update!!");
 });
document.addEventListener("ondataloaded", () => {
    kondisitombolrefresh();
 });

function changeText(){
    const checkbox = document.getElementById("statusBuku");
    const textSubmit = document.getElementById("textSubmit");

    if(checkbox.checked == true){
        textSubmit.innerText = "Sudah selesai dibaca";
    }else{
        textSubmit.innerText = "Belum selesai dibaca";
    }
};