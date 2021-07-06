let addItemButton = document.querySelector('form');

addItemButton.addEventListener('submit', e => {
    e.preventDefault();

    let todoItem = document.querySelector('#itemInput').value;

    document.querySelector('#itemInput').value = '';

    let todoElement = document.createElement('div');
    todoElement.innerHTML = todoItem;

    document.querySelector('.item-list').appendChild(todoElement);

});