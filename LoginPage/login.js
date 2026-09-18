const signUp = document.getElementById('signUp');
const username = document.getElementById('username');
const password = document.getElementById('password');

signUp.addEventListener("submit",(e)=>{
    e.preventDefault();

    const userVal = username.value.trim();
    const passwordVal = password.value;

    if(userVal == "" || passwordVal == ""){
        alert("please fill all field");
        return;
    }

    const stored = localStorage.getItem("users");
    const users = stored ? JSON.parse(stored):[];

    const foundUser = users.find(user=> {
        return user.username == userVal || user.email == userVal;
    })

    if(!foundUser){
        alert("invalid Credantial");
        return;
    }

    if(foundUser.password !== passwordVal){
        if(foundUser.username !== userVal){
            alert("Invalid credantial");
        }
        return;
    }

    localStorage.setItem("Currentuser",JSON.stringify(foundUser));
    window.location.href = "dashbaord.html";

})