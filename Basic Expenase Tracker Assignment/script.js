let formIp= document.querySelector('.formIp');
let amountIp=document.querySelector('#amountIp');
let selectIp=document.querySelector('#selectIp');
let detailIp=document.querySelector('#detailIp');
let expList=document.querySelector('.expList')

initListioners();

function initListioners(){
    document.addEventListener('DOMContentLoaded',getExpense)
    formIp.addEventListener('submit',onFormSubmit);
    expList.addEventListener('click',removeExpense);
    expList.addEventListener('click',editExpense);
}
function getExpense(){
    axios.get('https://crudcrud.com/api/fffd013d7ff543e1930a0c2da8f93b2d/expense').then((response)=>{
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
    axios.post('https://crudcrud.com/api/fffd013d7ff543e1930a0c2da8f93b2d/expense',formDetails)
    newExpense(formDetails)
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
    }

    console.log(e.target.parentElement.parentElement.textContent)

    removeFromServer(e.target.parentElement.parentElement.textContent)
}

function removeFromServer(text){
    axios.get('https://crudcrud.com/api/fffd013d7ff543e1930a0c2da8f93b2d/expense').then((reponse)=>{
        reponse.data.forEach((detail)=>{
            if(text==`${detail.amount} for ${detail.type} : ${detail.detail} `){
                axios.delete(`https://crudcrud.com/api/fffd013d7ff543e1930a0c2da8f93b2d/expense/${detail._id}`)
            }
        })
    })
}

function editExpense(e){

}


