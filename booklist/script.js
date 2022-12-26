class Books{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{
    addBooks(bookDetails){
        const tbody=document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML=
            `<td>${bookDetails.title}</td>
            <td>${bookDetails.author}</td>
            <td>${bookDetails.isbn}</td>
            <td><a herf='#' class='delete'>X</a></td>`
        ;
        tbody.appendChild(row);
    }

    alert(message,className){
        let div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div,form)

        setTimeout(()=>{
            div.remove();
        },1500)  
    }

    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

    removeEl(target){
        target.parentElement.parentElement.remove();
    }
};

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static setBooks(books){ 
        localStorage.setItem('books',JSON.stringify(books));
    }

    static loadItems(){
        let ui=new UI();
        let books=Store.getBooks();
        books.forEach((book)=>{
            ui.addBooks(book)
        })
    }

    static removeItem(isbn){
        let books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        })
        Store.setBooks(books)    
    }
}

document.getElementById('book-form').addEventListener('submit',function (e){
    const title= document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;

    // console.log(title,author,isbn);
    const ui= new UI()

    if (title == '' || author== '' || isbn==''){
        let message=`Check input fields`;
        ui.alert(message,'error')
    }
    else{
        const bookDetails= new Books(title,author,isbn);
        ui.addBooks(bookDetails);
        ui.clearFields();
        let message='Book added successfully';
        ui.alert(message,'success');
        let books=Store.getBooks();
        books.push(bookDetails); 
        Store.setBooks(books);
    }
    e.preventDefault()
});

document.getElementById('book-list').addEventListener('click',(e)=>{
    if(e.target.className==='delete'){
        Store.removeItem(e.target.parentElement.previousElementSibling.textContent)
        const ui=new UI();
        ui.removeEl(e.target);
        ui.alert('Removed Successfully !', 'success');
    }
})

document.addEventListener('DOMContentLoaded',Store.loadItems)


