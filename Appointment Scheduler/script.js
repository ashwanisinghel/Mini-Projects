// environment variables

let appointmentForm=document.querySelector('.appointmentForm');
let nameIp=document.querySelector('.nameIp');
let emailIp=document.querySelector('.emailIp');
let phoneNumberIp=document.querySelector('.phoneNumberIp');
let listOfAppointments=document.querySelector('.listOfAppointments');

initListioners();

function initListioners(){
    appointmentForm.addEventListener('submit',onAppointmentForm);
    listOfAppointments.addEventListener('click',removeListOfAppointments);
    document.addEventListener('DOMContentLoaded',getItem)
}
function getItem(){
    let details;
    if(localStorage.getItem('details')===null){
        details=[]
    }else{
       details = JSON.parse(localStorage.getItem('details'));
    }

    details.forEach((element)=>{
        let li=document.createElement('li');
        li.innerHTML=`${element.name}, ${element.email}, ${element.phone} <span><input type="submit" value="X" class="xbutton"></span>`;
        listOfAppointments.appendChild(li);
    })
}

function onAppointmentForm(e){
    const details={
        name: nameIp.value,
        email: emailIp.value,
        phone: phoneNumberIp.value
    }
    // saveFormDetailsToLocalStorage(details)
    axios.post('https://crudcrud.com/api/462e9c1b4b304856be4959e9566c2383/appointmentData',details)
    
    let li=document.createElement('li');
    li.innerHTML=`${details.name}, ${details.email}, ${details.phone} <span><input type="submit" value="X" class="xbutton"></span>`;
    listOfAppointments.appendChild(li);

    e.preventDefault();
}

function saveFormDetailsToLocalStorage(detail){
    let details;
    if(localStorage.getItem('details')===null){
        details=[]
    }else{
        details=JSON.parse(localStorage.getItem('details'));
    }
    details.push(detail);

    localStorage.setItem('details',JSON.stringify(details));
}
function removeListOfAppointments(e){
    if(e.target.classList.contains('xbutton')){
        e.target.parentElement.parentElement.remove();
    }
    removeAppointmentFromLocalStorage(e.target.parentElement.parentElement.textContent);
}
function removeAppointmentFromLocalStorage(content){
    let details;
    if(localStorage.getItem('details')===null){
        details=[]
    }else{
       details = JSON.parse(localStorage.getItem('details'));
    }
    details.forEach((element,index)=>{
        if(content.includes(element.phone)){
            details.splice(index,1);
        }
    })

    localStorage.setItem('details',JSON.stringify(details));
}
