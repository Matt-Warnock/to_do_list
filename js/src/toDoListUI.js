class ToDoListUI {
  constructor() {
    this.toDoItem = '';
    this.itemCount = 1;
  }

  get userInput() {
    return document.getElementById('to_do');
  }

  get listArea() {
    return document.getElementById('list');
  }

  _createListItem() {
    let listItem = document.createElement('li');
    this.listArea.appendChild(listItem);

    listItem.setAttribute('id', `item${this.itemCount}`);
    this.itemCount += 1;

    listItem.textContent = this.toDoItem;
  }

  _clearUserInput() {
    this.userInput.value = '';
  }

  initialise() {
    this.userInput.addEventListener('keydown', event => {
      if (event.keyCode === 13) {

        if (/\w{3,}/g.exec(this.userInput.value)) {
          this.toDoItem = this.userInput.value;
          this._createListItem();
          this._clearUserInput();
          this.listListener();
        }

      }
    });
  }

  listListener() {
    this.listArea.addEventListener('click', event => {
      let itemClicked = event.target,
          listElement = document.getElementById(itemClicked.id);

      if (itemClicked.className === 'stroke') {
        listElement.remove();
        return;
      }
      listElement.className = 'stroke';
      this.strokedItems += 1;
      this.revealSVGSection();
    });
  }

  revealSVGSection() {
    let sVGIds = ['body', 'hair', 'clothes', 'mic', 'left-blast', 'right-blast'];

    let target = document.querySelector(`#${sVGIds[0]}`);
    target.setAttribute('class', 'shown');
  }
}
