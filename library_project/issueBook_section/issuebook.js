function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}

document.querySelector(".issu").addEventListener("click", function(e){

    e.preventDefault();

    function generateId(){
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let id = "";

        for(let i = 0; i < 6; i++){
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    }

    let name = document.querySelector(".StudentName").value;
    let email = document.querySelector(".Email").value; 
    let roll = document.querySelector(".RollNumber").value;
    let book = document.querySelector(".BookName").value;
    let issueDate = document.querySelector(".IssuedDate").value;
    let returnDate = document.querySelector(".ReturnDate").value;

    // ❌ validation
    if(name === "" || email === "" || roll === "" || book === "" || issueDate === "" || returnDate === ""){
        alert("❌ Sab fields bharo!");
        return;
    }

    let student = {
        name: name,
        email: email,
        roll: roll,
        book: book,
        issueDate: issueDate,
        returnDate: returnDate,
        id: generateId(),
        fine: 0,
        status: "issued"
    };

    let data = JSON.parse(localStorage.getItem("students")) || [];

    data.push(student);

    localStorage.setItem("students", JSON.stringify(data));

    let books = JSON.parse(localStorage.getItem("books"));

    let foundBook = false;

    if(books){
        for(let i = 0; i < books.length; i++){

            if(books[i].category === book){
                foundBook = true;

                if(books[i].available > 0){
                    books[i].available--;
                }else{
                    alert("❌ Book not available!");
                    return;
                }

                break;
            }
        }

        if(!foundBook){
            alert("❌ This book is not available in library!");
            return;
        }

        localStorage.setItem("books", JSON.stringify(books));
    }

    emailjs.send("service_p4l1h7o", "template_ai0tlgp", {
        student_name: name,
        student_email: email,
        book_name: book,
        issue_date: issueDate,
        return_date: returnDate
    })
    .then(function(response) {
        console.log("✅ Email sent!", response);
    })
    .catch(function(error) {
        console.log("❌ Email failed!", error);
    });

    // ================== 🔥 QR FEATURE ==================

    function showQR(studentData){

        let canvas = document.getElementById("qrCanvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let qrData = `
Name: ${studentData.name}
Roll: ${studentData.roll}
Book: ${studentData.book}
Issue: ${studentData.issueDate}
Return: ${studentData.returnDate}
`;

        document.getElementById("qrOverlay").style.display = "flex";

        QRCode.toCanvas(canvas, qrData);
    }

    function createQRButton(studentData){

        let container = document.getElementById("qrBtnContainer");
        if(!container) return;

        container.innerHTML = "";

        let btn = document.createElement("button");
        btn.innerText = "View QR";

        btn.onclick = function(){
            showQR(studentData);
        };

        container.appendChild(btn);
    }

    // 👇 button create (sirf abhi issue hui book ke liye)
    createQRButton(student);

    // ================== 🔥 QR FEATURE END ==================


    // POPUP SHOW
    document.getElementById("issuePopup").style.display = "flex";

    document.getElementById("closeIssue").onclick = function() {
        document.getElementById("issuePopup").style.display = "none";
    };

    document.querySelector("form").reset();

});


// 👇 QR CLOSE (global function hona zaroori hai)
function closeQR(){
    document.getElementById("qrOverlay").style.display = "none";
}