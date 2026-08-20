let TakeInput = document.querySelector("#user_inp");
let AddButton = document.querySelector("#btn");
let UnorderList = document.querySelector("ul");
let OrderList = document.querySelector("li");
let check = document.querySelectorAll(".check");
let deleteEle = document.querySelectorAll(".delete");

AddButton.addEventListener("click",() => {
    let names = JSON.parse(localStorage.getItem("list",TakeInput.value)) || [];

    names.push(TakeInput.value);
    localStorage.setItem("list",JSON.stringify(names));


    UnorderList.innerHTML += `<li><input type="checkbox" class="check"><span>${TakeInput.value} </span><button class="delete">Delete</button></li> `;

    TakeInput.value = "";

})

UnorderList.addEventListener("change",(e) => {
    if(e.target.checked){
      e.target.nextElementSibling.style.textDecoration = "line-through";
    }
    else{
      e.target.nextElementSibling.style.textDecoration = "none"
    }
});

UnorderList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
    }
    localStorage.removeItem.list[0];
})
