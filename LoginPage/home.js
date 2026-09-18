const btn = document.getElementById('btn');

function getUser(){
    const stored = localStorage.getItem("Currentuser");
    return stored ? JSON.parse(stored) : null;
}
btn.addEventListener("click",(Currentuser) => {

   const currentuser = getUser();

   if(currentuser){
    window.location.href = "dashbaord.html";
    return;
   }

   const users = localStorage.getItem("users");
   
   if(users){
    window.location.href = "login.html";
   }else{
    window.location.href = "create.html";
   }
});
