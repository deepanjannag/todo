const form = document.querySelector('#itemForm'),
    itemInput = document.querySelector('#itemInput'),
    itemList = document.querySelector('.item-list'),
    feedback = document.querySelector('.feedback'),
    clearButton = document.querySelector('#clear-list');

let todoItems = [];

getLocalStorage();

function getLocalStorage() {
    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage) {
        todoItems = JSON.parse(todoStorage);
        createScreenList(todoItems);
    }
    else
        todoItems = [];
}

function setLocalStorage(todoItems) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    getLocalStorage();
    const itemName = itemInput.value;

    if (itemName.length == 0) {
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 3000);
    }
    if (todoItems.indexOf(itemName) >= 0) {
        feedback.innerHTML = 'Duplicate entry. Not allowed.';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 3000);
    }
    else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        createScreenList(todoItems);
    }
    itemInput.value = '';
});

clearButton.addEventListener('click', () => {
    todoItems = [];
    localStorage.clear();
    createScreenList(todoItems);
});

function createScreenList(todoItems) {
    itemList.innerHTML = '';

    todoItems.forEach(item => {
        itemList.insertAdjacentHTML("beforeend", `<div class="item my-3"><h5 class="item-name text-capitalize">${ item }</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);

        let tobeHandledItem = itemList.lastChild;   //We're choosing the above added html!

        //COMPLETED
        tobeHandledItem.querySelector('.complete-item').addEventListener('click', () =>
            tobeHandledItem.querySelector('.item-name').classList.toggle('completed'));
        //EDIT
        tobeHandledItem.querySelector('.edit-item').addEventListener('click', () => {
            itemInput.value = item;
            tobeHandledItem.remove();
            todoItems = todoItems.filter(i => i !== item);
            setLocalStorage(todoItems);
        });
        //DELETE
        tobeHandledItem.querySelector('.delete-item').addEventListener('click', () => {
            tobeHandledItem.remove();
            todoItems = todoItems.filter(i => i !== item);
            setLocalStorage(todoItems);
        });
    });
}