class ToDoListUI {
  constructor() {
    this.toDoItem = '';
  }
  initialise() {
    let input = document.getElementById('to_do'),
        listArea = document.getElementById('list');

    input.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        this.toDoItem = input.value;

        if (/\w{3,}/g.exec(this.toDoItem)) {

          let listItem = document.createElement('li');
          listArea.appendChild(listItem);
          listItem.textContent = this.toDoItem;
        }
      }
    });
  }
}
