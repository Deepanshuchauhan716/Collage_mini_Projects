function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}

function fixOldBooks() {
    let allStudents = localStorage.getItem("students");
    
    if (allStudents !== null) {
        let students = JSON.parse(allStudents);
        let updated = false;
        
        for (let i = 0; i < students.length; i++) {
            if (students[i].status === undefined) {
                students[i].status = "issued";
                updated = true;
            }
        }
        
        if (updated) {
            localStorage.setItem("students", JSON.stringify(students));
            console.log("✅ Old books fixed - Status added!");
        }
    }
}

function loadDashboardData() {
    let allStudents = localStorage.getItem("students");
    
    if (allStudents === null) {
        document.querySelector(".div1").innerHTML = "0";
        document.querySelector(".div2").innerHTML = "0";
        document.querySelector(".div3").innerHTML = "0";
        return;
    }
    
    let students = JSON.parse(allStudents);
    
    let totalBorrowed = 0;
    let overdueBooks = 0;
    let returnedBooks = 0;
    
    for (let i = 0; i < students.length; i++) {
        if (students[i].status === "issued") {
            totalBorrowed++;
            
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let returnDate = new Date(students[i].returnDate);
            returnDate.setHours(0, 0, 0, 0);
            
            if (today > returnDate) {
                overdueBooks++;
            }
        }
        
        if (students[i].status === "returned") {
            returnedBooks++;
        }
    }
    
    document.querySelector(".div1").innerHTML = totalBorrowed;
    document.querySelector(".div2").innerHTML = overdueBooks;
    document.querySelector(".div3").innerHTML = returnedBooks;
}

window.onload = function() {
    fixOldBooks(); 
    loadDashboardData();  
    
    setInterval(function() {
        loadDashboardData();
    }, 1000);
};