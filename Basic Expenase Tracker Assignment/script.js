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
function getExpense(){
    axios.get('https://crudcrud.com/api/b1bc6ad8c61a4c3db4d5d52f9fd6f310/expense').then((response)=>{
        response.data.forEach((detail)=>{
            newExpense(detail);
        })
    }).catch((err)=>{
        console.log(err);
    })
}

function onFormSubmit(event){
    let formDetails={
        amount: amountIp.value,
        type: selectIp.value,
        detail: detailIp.value
    }
    axios.post('https://crudcrud.com/api/b1bc6ad8c61a4c3db4d5d52f9fd6f310/expense',formDetails)
    newExpense(formDetails)

    amountIp.value='';
    selectIp.value='';
    detailIp.value='';
    
    event.preventDefault();
}

function newExpense(formDetails){
    let li=document.createElement('li');
    li.innerHTML=`${formDetails.amount} for ${formDetails.type} : ${formDetails.detail} <span><input type="submit" class="deleteLi" value="Delete"><input type="submit" class="editLi" value="Edit"></span>`;
    expList.appendChild(li);
}

function removeExpense(e){
    if(e.target.classList.contains('deleteLi')){
        e.target.parentElement.parentElement.remove();
        removeFromServer(e.target.parentElement.parentElement.textContent)
    }
}

function removeFromServer(text){
    axios.get('https://crudcrud.com/api/b1bc6ad8c61a4c3db4d5d52f9fd6f310/expense').then((reponse)=>{
        reponse.data.forEach((detail)=>{
            if(text==`${detail.amount} for ${detail.type} : ${detail.detail} `){
                axios.delete(`https://crudcrud.com/api/b1bc6ad8c61a4c3db4d5d52f9fd6f310/expense/${detail._id}`)
            }
        })
    })
}

function editExpense(e){
    if(e.target.classList.contains('editLi')){
        axios.get('https://crudcrud.com/api/b1bc6ad8c61a4c3db4d5d52f9fd6f310/expense').then((response)=>{
            response.data.forEach((detail)=>{
                if(e.target.parentElement.parentElement.textContent==`${detail.amount} for ${detail.type} : ${detail.detail} `){
                    amountIp.value=detail.amount;
                    selectIp.value=detail.type;
                    detailIp.value=detail.detail;
                 
                }
            })
        })
        e.target.parentElement.parentElement.remove();
        removeFromServer(e.target.parentElement.parentElement.textContent)
    }
}


