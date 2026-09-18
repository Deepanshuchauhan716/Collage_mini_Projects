document.querySelector(".signup_btn").addEventListener("click", function(){
    document.querySelector(".signup_card").style.display = "block";
});

document.querySelector(".close_btn").addEventListener("click", function(){
    document.querySelector(".signup_card").style.display = "none";
});

function openSignup(){
    document.getElementById("overlay").style.display = "block";
}

function closeSignup(){
    document.getElementById("overlay").style.display = "none";
}

document.querySelector(".create_btn").addEventListener("click", function(){

    let inputs = document.querySelectorAll(".signup_input");

    let isEmpty = false;

    inputs.forEach(function(input){
        if(input.value.trim() === ""){
            isEmpty = true;
        }
    });

    if(isEmpty){
        alert("❌ Please fill all details!");
    }else{
        alert("✅ Account Created Successfully!");
    }

});


const form = document.querySelector("form");

form.addEventListener("submit", function(dets) {
    dets.preventDefault();

    let username = document.querySelector(".username").value;
    let password = document.querySelector(".password").value;
    let ErrorText = document.querySelector(".incorrect");
    let userError = document.querySelector(".incorrect2");
    let reqUser = document.querySelector(".enter_username");

    userError.style.display = "none";
    ErrorText.style.display = "none";
    reqUser.style.display = "none";

    if(username.trim() === "" || password.trim() === ""){
            reqUser.style.display = "initial";
            return;
        }

    if(username !== "admin"){
        userError.style.display = "initial";
    }else if(password !== "1234"){
        ErrorText.style.display = "initial";
    }else{
        window.location.href = "Dashboard_section/dashboard.html";
        form.reset();
    }

        
});