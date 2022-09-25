const toDoList = new ToDoListManager();
let toDoComplete = [];
const todo_key = "ToDoList";
const todocomplete_key = "ToDoComplete"

function render(toDo, selector) {
    let html = toDo.map((item, index) => {
            return `
        <li>
            <span>${item.content}</span>
            <div>
                <button class="btn-delete" >
                <i class="fa fa-trash-alt" data-id="${index}" data-type="delete"></i>
                </button>
                <button  class="btn-complete">
                <i class="fa-solid fa-circle-check" data-id="${index}" data-type="complete"></i>
                </button>
            </div>
        </li>
        `;
        })
        .join("");

    if (!html) {
        html = ``;
    }

    dom(selector).innerHTML = html;


}

function addToDo(input) {
    const toDo = new ToDo(input)
    toDoList.addToDo(toDo);
}

function deleteToDo(id) {
    toDoList.deleteToDo(id);
}

function deleteToDoComplete(id) {
    toDoComplete.splice(id, 1);
}

function toDoListComplete(id) {
    const toDoNew = toDoList.findToDoById(id);
    toDoComplete.push(toDoNew);
    toDoList.deleteToDo(id);
}

function sortAZ(){
    toDoList.sortAZ();
}

function sortZA(){
    toDoList.sortZA();
}



function init() {
    const toDoListLocal = JSON.parse(localStorage.getItem(todo_key)) || [];
    toDoList.setToDo(toDoListLocal);

    toDoComplete = JSON.parse(localStorage.getItem(todocomplete_key)) || [];
    render(toDoList.getToDo(), "#todo");
    render(toDoComplete, "#completed");
}
init();

//gắn sự kiện vào nút add Item
dom('#addItem').addEventListener('click', () => {
    const input = dom('#newTask').value;

    if (!input) return;

    addToDo(input);
    render(toDoList.getToDo(), "#todo")
    dom('#newTask').value = "";

    localStorage.setItem(todo_key, JSON.stringify(toDoList.getToDo()));

});

//gắn sự kiện vào nút to do
dom('#todo').addEventListener('click', (evt) => {
    const elementType = evt.target.getAttribute('data-type');
    let id = evt.target.getAttribute('data-id')
    if (!elementType) return;

    console.log(elementType)
    if (elementType === "complete") {
        toDoListComplete(id);
        render(toDoComplete, "#completed")
        deleteToDo(id);
        localStorage.setItem(todocomplete_key, JSON.stringify(toDoComplete));
    }

    render(toDoList.getToDo(), "#todo");
    // localStorage.setItem(todo_key), JSON.stringify(toDoList.getToDo());
});

dom('#completed').addEventListener('click', (evt) => {
    const elementType = evt.target.getAttribute('data-type');
    let id = evt.target.getAttribute('data-id')
    if (!elementType) return;
    console.log(elementType);

    if(elementType === "delete"){
        deleteToDoComplete(id);
        render(toDoComplete, "#completed");
        localStorage.setItem(todocomplete_key, JSON.stringify(toDoComplete));
    }
});

dom('.filter-btn').addEventListener('click', (evt)=>{
    const elementType = evt.target.getAttribute('data-type');
    if (!elementType) return;
    console.log(elementType)
    if(elementType === "sortAZ"){
        sortAZ();
        console.log(sortZA())
    }else if(elementType === "sortZA"){
        sortZA()
    }
    render(toDoList.getToDo(), "#todo");
})


function dom(selector) {
    return document.querySelector(selector);
}