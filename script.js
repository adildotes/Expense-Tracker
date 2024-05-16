const savedEntries = localStorage.getItem('tableEntries');
let tableEntries = savedEntries ? JSON.parse(savedEntries) : [];
const itemType = document.getElementById("itemType");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const table = document.getElementById("table");
const updatedInc = document.getElementById("updatedInc");
const updatedExp = document.getElementById("updatedExp");
const updatedBal = document.getElementById("updatedBal");

function updateSummary() {
    const totalIncome = tableEntries.reduce((total, entry) => {
        return entry.type === 1 ? total + entry.amount : total;
    }, 0);

    const totalExpense = tableEntries.reduce((total, entry) => {
        return entry.type === 0 ? total + entry.amount : total;
    }, 0);

    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

function addItem() {
    const type = parseInt(itemType.value);
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!name || isNaN(amount) || amount <= 0) {
        return alert("Please provide valid name and amount.");
    }

    tableEntries.push({ type, name, amount });
    updateTable();
    nameInput.value = "";
    amountInput.value = "";

    saveToLocalStorage();
}

function loadItems(entry, index) {
    const row = table.insertRow(-1);

    row.insertCell(0).innerText = index + 1;
    row.insertCell(1).innerText = entry.name;
    row.insertCell(2).innerText = entry.amount;
    const typeCell = row.insertCell(3);
    typeCell.innerHTML = entry.type === 0 ? "Expense" : "Income";
    typeCell.style.color = entry.type === 0 ? "red" : "green";

    const actionsCell = row.insertCell(4);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => del(entry));
    actionsCell.appendChild(deleteButton);
}

function clearTable() {
    const headerRow = `<tr class="titles">
        <th>S.no.</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Delete</th>
    </tr>`;
    table.innerHTML = headerRow;
}

function del(entry) {
    tableEntries = tableEntries.filter(e => e !== entry);
    updateTable();
    saveToLocalStorage();
}

function updateTable() {
    clearTable();
    tableEntries.forEach(loadItems);
    updateSummary();
}

function saveToLocalStorage() {
    localStorage.setItem('tableEntries', JSON.stringify(tableEntries));
}

// Initialize table on page load
updateTable();
