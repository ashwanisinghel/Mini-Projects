document.getElementById('loan-form').addEventListener('submit',(e)=>{
    console.log('test');
    document.getElementById('loading').style.display='block';
    document.getElementById('results').style.display='none';
    onFormSubmit();
    e.preventDefault()
});

function onFormSubmit(e){
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');

    const p=parseFloat(amount.value);
    const r=(parseInt(interest.value)/100/12);
    const n=(parseFloat(years.value)*12);

    const monthelyPayment=p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    const totalPayment=monthelyPayment*parseFloat(years.value)*12;
    const totalInterest=totalPayment-parseFloat(amount.value);
    // console.log(monthelyPayment,totalPayment,totalInterest);

    setTimeout(() => {
        if(isFinite(monthelyPayment)){
            document.getElementById('monthly-payment').value=Math.ceil(monthelyPayment);
            document.getElementById('total-payment').value=Math.ceil(totalPayment);
            document.getElementById('total-interest').value=Math.ceil(totalInterest);
        }else{
            alert("Input check kar");
        }

        document.getElementById('loading').style.display='none';
        document.getElementById('results').style.display='block';

    }, 300); 
    
}