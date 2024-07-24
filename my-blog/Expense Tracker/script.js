const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text= document.getElementById('text');
const amount = document.getElementById('amount');
const buttons = document.querySelectorAll('.selectType button');

let transactions = [];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

if(localStorageTransactions !== null) {
    transactions = localStorageTransactions;
}

// add event the the buttons of select Only one can be selected
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Remove 'selected' class from all buttons
        buttons.forEach(button => {
            button.classList.remove('selected');
        });

        // Add 'selected' class to the clicked button
        e.target.classList.add('selected');
        selectTypeValue();
    });
});

// Check if income or expense
var selected ='';
function selectTypeValue() {
     selected = document.querySelector('.selectType button.selected').innerHTML;
    


    if(selected === "Expense") {
        amount.value.trim() = '-';
    } else if (selected === "Income"){

    }
}

// Add transaction
function addTransaction(e) {
    e.preventDefault();
    
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const newTransaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(newTransaction);
        addTransactionDom(newTransaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = "";
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list 
function addTransactionDom(transaction) {

    const sign =  selected === "Expense" ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(selected === "Expense" ? 'minus' : 'plus');
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction('${transaction.id}')">x</button>
  `;
  list.appendChild(item);
}

// Update the balance income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc , item) => (acc += item),0).toFixed(2);
    
    const income = amounts 
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item),0)
    .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc , item) => (acc += item),0 )*-1).toFixed(2);
    

    balance.innerHTML = `$${total}` ;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`    
}

// Remove transaction by id 
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== parseInt(id));

    updateLocalStorage();
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init App
function init() {
    list.innerHTML= '';
    transactions.forEach(addTransactionDom);
    updateValues();
}

init();

form.addEventListener('submit' , addTransaction);
