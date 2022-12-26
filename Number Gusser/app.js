const num=Math.round(Math.random()*10)

console.log(num);

let count=0;

let submitBtn=document.getElementById('guess-value');

submitBtn.addEventListener('click',(e)=>{
    if(count<5 && submitBtn.value!='Play Again'){
        inRange();
    }else if(count=5 && submitBtn.value!='Play Again'){
        submitBtn.value='Play Again';
        submitBtn.style.background='green';
        submitBtn.style.color='white';
    }else if(submitBtn.value === 'Play Again'){
        location.reload();
    }
    e.preventDefault();
})

function inRange(){
    let guessIp=document.getElementById('guess-input');
    let guessedNumber=parseInt(guessIp.value);
    // console.log(typeof(guessedNumber), count);
    if(guessedNumber===num){
        let message='Good Job !';
        submitBtn.value='Play Again';
        showMessage(message,'green')
    }else if(isNaN(guessedNumber) || guessedNumber>10 || guessedNumber<0){
        let message=`Enter the number between 1 and 10`;
        showMessage(message,'red')
    }else if(guessedNumber>0 && guessedNumber<10){
        let message= 'try again';
        showMessage(message,'orange');
    }else{
        let message='backchode ho kya';
        showMessage(message,'blue')
    }
    guessIp.value='';
    count++;
}


function showMessage(message,color){
    let messageToShow=document.querySelector('.message');
    messageToShow.textContent=message;
    messageToShow.style.color=color;
}
