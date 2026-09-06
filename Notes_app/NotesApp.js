let addNote = document.getElementById("addNewNote");
let popup = document.querySelector(".popup");
let cut = document.querySelector(".cut");

let tittleinp = document.getElementById("tittle_input");
let discriptioninp = document.getElementById("discription_input")
let noteform = document.getElementById("noteForm");
let container = document.getElementById("container");

addNote.addEventListener("click", function () {
    popup.classList.add("show");
});


cut.addEventListener("click", function () {
    popup.classList.remove("show");
});

let editingNote = null;

noteform.addEventListener("submit",(event) => {

    let tittle = tittleinp.value
    let discription = discriptioninp.value;

    if(tittle === "" || discription === ""){
        alert("please fill the tittle and discription");
        return;
    }

    event.preventDefault();

    if (editingNote !== null) {

    editingNote.querySelector("h3").textContent = tittle;
    editingNote.querySelector("span").textContent = discription;

    editingNote = null;

    tittleinp.value = "";
    discriptioninp.value = "";
    popup.classList.remove("show");

    return;
   }


    let newNote = document.createElement("div");
    newNote.classList.add("boxes");

    newNote.innerHTML = `
    <h3>${tittle}</h3>
    <span>${discription}</span>

    <div class="bottom">
    <p>${new Date().toLocaleDateString()}</p>
    <div id="editor">...</div>
    </div>

     <div class="edit_btn">
            <li class="edit_pop">Edit</li>
            <li class="delete">Delete</li>
        </div>
    `;

    container.appendChild(newNote);

    tittleinp.value = "";
    discriptioninp.value = "";

        popup.classList.remove("show");
        
        
        let editBtn = newNote.querySelector(".edit_btn")
        let setting = newNote.querySelector("#editor");

       setting.addEventListener("click", () => {
             editBtn.classList.toggle("shows");
        });

        let edit = newNote.querySelector(".edit_pop");

        edit.addEventListener("click",() => {

            editingNote = newNote;

            let oldTittle = newNote.querySelector("h3").textContent;
            let oldDiscription = newNote.querySelector("span").textContent;

            tittleinp.value = oldTittle;
            discriptioninp.value = oldDiscription;

            popup.classList.add("show");
             editBtn.classList.toggle("shows");

        });

       let deleteBtn = newNote.querySelector(".delete");

       deleteBtn.addEventListener("click",() => {
        newNote.remove();
       })

});
        
