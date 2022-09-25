class ToDoListManager{
    constructor(){
        this.toDoList = [];
    }

    getToDo(){
        return this.toDoList;
    }

    findToDoById(id){
        return this.toDoList.find((item)=>{
            return item === this.toDoList[id];
        })
    }

    addToDo(item){
        this.toDoList.push(item)
    }

    deleteToDo(id){
        this.toDoList.splice(id,1);
    }

    setToDo(arr){
        this.toDoList = arr;
    }

    sortAZ() {
        this.toDoList.sort(function (a, b) {
           return a.content > b.content ? 1 : b.content > a.content ? -1 : 0;
        });
     }
  
     sortZA() {
        this.toDoList.sort(function (a, b) {
           return a.content > b.content ? -1 : b.content > a.content ? 1 : 0;
        });
     }
}