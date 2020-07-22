class ToDoListUI {
  constructor() {
    this.toDoItem = '';
  }
  initialise() {
    let input = document.getElementById('to_do');

    input.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        this.toDoItem = input.value;

        let listItem = document.createElement('li');
        document.body.appendChild(listItem);
        listItem.setAttribute('id', 'item1');
        listItem.textContent = this.toDoItem;

      }
    });
  }
}
