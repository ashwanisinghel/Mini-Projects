var state={
    balance: 100,
    income: 5000,
    expense: 10,
    transactionHist:[
        
    ] 
}

var balanceEl=document.querySelector(".balance")
var incomeEl=document.querySelector(".income")
var expenseEl=document.querySelector(".expense")
var transactionsEl=document.querySelector("#transaction")
var expenseBtnEl= document.querySelector('#expenseButton')
var incomeBtnEl= document.querySelector("#incomeButton")
var nameIpEl=document.querySelector("#particularsIp")
var amountIpEl=document.querySelector("#amountIp")


function init(){
    updatestate()
    initListners()
}

function uniqueId(){
    return Math.round(Math.random()*100000)
}


function initListners(){
    incomeBtnEl.addEventListener('click',onIncomeBtnClick)
    expenseBtnEl.addEventListener('click',onExpenseBtnClick)
}

function onIncomeBtnClick(){
    addTransAction(nameIpEl.value, parseInt(amountIpEl.value),'income')
}
function onExpenseBtnClick(){
    addTransAction(nameIpEl.value,parseInt(amountIpEl.value),'expense')
}

function onDeleteClick(event){
    var id=parseInt(event.target.getAttribute('data-id'))
    var deleteIndex;
    for (var i = 0; i < state.transactionHist.length; i++) {
        if (state.transactionHist[i].id === id) {
            deleteIndex = i;
            break;
        }
    }

    state.transactionHist.splice(deleteIndex, 1);
    updatestate()
}

function addTransAction(name,amount,type){
    if(name !== '' && amount !== ''){
        var transaction ={
            id: uniqueId(),
            name:name,
            amount:amount,
            type:type
        }
        state.transactionHist.unshift(transaction)
        updatestate()
    }
    else{
        alert('Please enter valid data')
    }

    nameIpEl.value=''
    amountIpEl.value=''
}
function updatestate(){
    var income=0,
        expense=0,
        balance=0,
        item

    for(let i=0;i<state.transactionHist.length ;i++){
        item=state.transactionHist[i]
        if(item.type ==='expense'){
            expense+=item.amount
        }
        if(item.type === 'income'){
            income+=item.amount
        }
    }
    balance=income-expense

    state.income=income
    state.expense=expense
    state.balance = balance

    render()

}

function render(){
    balanceEl.innerHTML=`₹${state.balance}`
    incomeEl.innerHTML=`₹${state.income}`
    expenseEl.innerHTML=`₹${state.expense}`
    
    transactionsEl.innerHTML = ''

    var transactionEl,containerEl,amountEl,item,btnEl
    
    for(var i=0;i<state.transactionHist.length;i++){
        item=state.transactionHist[i]
        transactionEl=document.createElement('li')
        transactionEl.append(item.name)

        

        containerEl=document.createElement('div')

        amountEl=document.createElement('span')
        if(item.type==='income'){
            amountEl.classList.add('incomeAmount')
        }else if(item.type==='expense'){
            amountEl.classList.add('expenseAmount')
        }
        amountEl.innerHTML=`₹${item.amount}`

        btnEl=document.createElement('button')
        btnEl.classList.add('crossButton')
        btnEl.setAttribute('data-id',item.id)
        btnEl.innerHTML='X'
        btnEl.addEventListener('click',onDeleteClick)


        containerEl.appendChild(amountEl)
        containerEl.appendChild(btnEl)
        transactionEl.appendChild(containerEl)
        transactionsEl.appendChild(transactionEl)
    }

}

init()

