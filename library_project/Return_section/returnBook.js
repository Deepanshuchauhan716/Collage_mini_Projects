function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}

let returnBtn = document.getElementById("returnBookBtn");

returnBtn.addEventListener("click", function() {

    let studentName = document.getElementById("studentName").value;
    let rollNumber = document.getElementById("rollNumber").value;
    let uniqueId = document.getElementById("uniqueId").value;

    if (studentName === "" || rollNumber === "" || uniqueId === "") {
        alert("❌ Sab fields bharo!");
        return;
    }

    let allStudents = localStorage.getItem("students");

    if (allStudents === null) {
        alert("❌ Koi book nahi mili!");
        return;
    }

    let students = JSON.parse(allStudents);
    let foundIndex = -1;

    // 🔍 student find karo
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === studentName &&
            students[i].roll === rollNumber &&
            students[i].id === uniqueId) {

            students[i].status = "returned";
            students[i].fine = 0;

            foundIndex = i;
            break;
        }
    }

    if (foundIndex !== -1) {


        let books = JSON.parse(localStorage.getItem("books"));

        if (books) {
            for (let i = 0; i < books.length; i++) {

                if (books[i].category === students[foundIndex].book) {
                    books[i].available++;
                    break;
                }

            }

            localStorage.setItem("books", JSON.stringify(books));
        }

        // ===============================

        localStorage.setItem("students", JSON.stringify(students));

        document.getElementById("returnPopup").style.display = "flex";

        document.getElementById("studentName").value = "";
        document.getElementById("rollNumber").value = "";
        document.getElementById("uniqueId").value = "";

    } else {
        document.getElementById("errorPopup").style.display = "flex";
    }
});

document.getElementById("closeError").addEventListener("click", function() {
    document.getElementById("errorPopup").style.display = "none";
});

document.getElementById("closeReturn").addEventListener("click", function() {
    document.getElementById("returnPopup").style.display = "none";
});