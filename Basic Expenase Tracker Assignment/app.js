let formIp= document.querySelector('.formIp');
let amountIp=document.querySelector('#amountIp');
let selectIp=document.querySelector('#selectIp');
let detailIp=document.querySelector('#detailIp');
let expList=document.querySelector('.expList');

initListioners();

function initListioners(){
    document.addEventListener('DOMContentLoaded',getExpense)
    formIp.addEventListener('submit',onFormSubmit);
    expList.addEventListener('click',removeExpense);
    expList.addEventListener('click',editExpense);
}

async function getExpense(){
    const response=await Server.get();
    response.forEach((obj)=>{
        Expense.add(obj);
    })
}

async function onFormSubmit(e){
    e.preventDefault();
    let obj={
        amount:amountIp.value,
        type:selectIp.value,
        detail:detailIp.value
    };

    let response=await Server.add(obj);
    Expense.add(response); 

    amountIp.value='';
    detailIp.value='';
}

async function removeExpense(e){
    if(e.target.classList.contains('deleteLi')){
        Expense.remove(e);
    }
}

async function editExpense(e){
    if(e.target.classList.contains('editLi')){
        let detail= await Expense.edit(e)
        amountIp.value=detail.amount;
        selectIp.value=detail.type;
        detailIp.value=detail.detail;
    }
}