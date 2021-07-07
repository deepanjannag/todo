const form = document.querySelector('#itemForm'),
    itemInput = document.querySelector('#itemInput'),
    itemList = document.querySelector('.item-list'),
    feedback = document.querySelector('.feedback'),
    clearButton = document.querySelector('#clear-list');

let todoItems = [];

function getLocalStorage() {
    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage) {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
    else
        todoItems = [];
}

function setLocalStorage(todoItems) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}
getLocalStorage();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const itemName = itemInput.value;

    if (itemName.length == 0) {
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 3000);
    }
    else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
        //add event listeners to icons;
        //handleItem(itemName);
    }
    itemInput.value = '';
});

clearButton.addEventListener('click', () => {
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
});

function getList(todoItems) {
    //itemList.innerHTML = '';

    todoItems.forEach(item => {
        itemList.insertAdjacentHTML("beforeend", `<div class="item my-3"><h5 class="item-name text-capitalize">${ item }</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);

        handelItem(item);
    });
}

function handelItem(itemName) {

    let items = itemList.querySelectorAll('.item');

    items.forEach(item => {
        if (item.querySelector('.item-name').textContent == itemName) {

            //COMPLETED-ITEM icon is clicked
            item.querySelector('.complete-item').addEventListener('click', function () {
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
            //EDIT icon is clicked
            item.querySelector('.edit-item').addEventListener('click', function () {
                itemInput.value = itemName;
                itemList.removeChild(item);

                todoItems = todoItems.filter(i => i != itemName);
            });
            //DELETE icon is clicked
            item.querySelector('.delete-item').addEventListener('click', function () {
                itemList.removeChild(item);
                todoItems = todoItems.filter(i => i != itemName)
            });

            //showFeedback('item delete', 'success');
        }
    });
}

