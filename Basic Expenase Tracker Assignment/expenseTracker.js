class Expense{
    static add(obj){
        let li=document.createElement('li');
        li.id=`${obj._id}`;
        li.innerHTML=`${obj.amount} for ${obj.type} : ${obj.detail} <span><input type="submit" class="deleteLi" value="Delete"><input type="submit" class="editLi" value="Edit"></span>`;
        expList.appendChild(li);
    }

    static async remove(e){
        e.target.parentElement.parentElement.remove();
        let id=e.target.parentElement.parentElement.id;
        await Server.remove(id);
    }
    
    static async edit(e){
        let id=e.target.parentElement.parentElement.id;
        let data= await Server.getAgainstId(id);
        await Expense.remove(e);
        return data;
    }
};

class Server{
    static async add(obj){
        try{
            let response= await axios.post('https://crudcrud.com/api/c016e35a26ae41db8e488d1197cbe53c/expense',obj)
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
    static async remove(id){
        try{
            let response=await axios.delete(`https://crudcrud.com/api/c016e35a26ae41db8e488d1197cbe53c/expense/${id}`);
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    }

    static async get(){
        try{
            let response=await axios.get('https://crudcrud.com/api/c016e35a26ae41db8e488d1197cbe53c/expense');
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
    static async getAgainstId(id){
        try{
            let response=await axios.get(`https://crudcrud.com/api/c016e35a26ae41db8e488d1197cbe53c/expense/${id}`);
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    }
};