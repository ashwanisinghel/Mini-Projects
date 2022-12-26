document.getElementById('button1').addEventListener('click',getText);
document.getElementById('button2').addEventListener('click',getJson);
document.getElementById('button3').addEventListener('click',getExternal);

let outputDiv=document.getElementById('output');

function getText(){
    fetch('test.txt').then((res)=>{
        return res.text();
    }).then(data=>{
        console.log(data);
        outputDiv.innerHTML=data;
    }).catch((err)=>{
        console.log(err);
    })
}

function getJson(){
    fetch('posts.json').then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        let posts='';
        data.forEach((data)=>{
            posts+=`<li>${data.title} : ${data.body}</li>`
        })
        outputDiv.innerHTML=posts;
    })
}
function getExternal(){
    fetch('https://api.github.com/users').then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        let ids='';
        data.forEach((data)=>{
            ids+=`<li>${data.login}</li>`
        })
        outputDiv.innerHTML=ids;
    })
}