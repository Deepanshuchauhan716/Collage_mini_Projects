function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}

function CalculateFine(returnDate) {
    let today = new Date();
    let returnD = new Date(returnDate);

    today.setHours(0, 0, 0, 0);
    returnD.setHours(0, 0, 0, 0);

    let diff = today - returnD;
    let daysLate = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysLate > 0) {
        return daysLate * 10;
    } else {
        return 0;
    }
}

function renderTable(students) {
    let tableBody = document.getElementById("table_body");
    tableBody.innerHTML = "";

    let issuedBooks = students.filter(function(item) {
        return item.status !== "returned";
    });

    if (issuedBooks.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='8'>No Books Issued</td></tr>";
        return;
    }

    issuedBooks.forEach(function(item) {
        let fineAmount = CalculateFine(item.returnDate);
        
        // 🔥 STATUS CHECK KARO
        let today = new Date();
        let returnDate = new Date(item.returnDate);
        today.setHours(0, 0, 0, 0);
        returnDate.setHours(0, 0, 0, 0);
        
        let statusText = "";
        let statusColor = "";
        
        if (today > returnDate) {
            statusText = "Late";
            statusColor = "red";
        } else {
            statusText = "On Time";
            statusColor = "green";
        }
        
        let row = document.createElement("tr");
        
        // 🔥 ROW KA BACKGROUND COLOR (Poori row)
        if (today > returnDate) {
            row.style.backgroundColor = "#ffcccc";  // Light red
        } else {
            row.style.backgroundColor = "#ccffcc";  // Light green
        }
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.book}</td>
            <td>${item.issueDate}</td>
            <td>${item.returnDate}</td>
            <td>${item.id}</td>
            <td>${fineAmount}</td>
            <td><span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function loadAndShowData() {
    let data = JSON.parse(localStorage.getItem("students")) || [];
    let updated = false;

    data.forEach(function(item) {
        let currentFine = CalculateFine(item.returnDate);
        if (item.fine !== currentFine) {
            item.fine = currentFine;
            updated = true;
        }
    });

    if (updated) {
        localStorage.setItem("students", JSON.stringify(data));
    }

    renderTable(data);
}

window.onload = function() {
    loadAndShowData();
    
    setInterval(function() {
        let searchValue = document.querySelector(".Search").value.trim();
        if (searchValue === "") {
            loadAndShowData();
        } else {
            let data = JSON.parse(localStorage.getItem("students")) || [];
            let filteredData = data.filter(function(item) {
                return String(item.roll) === searchValue||
                String(item.id) === searchValue;
            });
            renderTable(filteredData);
        }
    }, 1000);
};

document.querySelector(".Search_btn").addEventListener("click", function() {
    let rollInput = document.querySelector(".Search").value.trim();
    let data = JSON.parse(localStorage.getItem("students")) || [];

    if (rollInput === "") {
        renderTable(data);
        return;
    }

    let filteredData = data.filter(function(item) {
        return String(item.roll) === rollInput;
    });

    renderTable(filteredData);
});