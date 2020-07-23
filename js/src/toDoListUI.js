class ToDoListUI {
  constructor() {
    this.toDoItem = '';
    this.itemCount = 1;
    this.strokedItems = -1;
    this.sVGIds = ['body',
                   'hair',
                   'clothes',
                   'mic',
                   'left-blast',
                   'right-blast'];
  }

  get userInput() {
    return document.getElementById('to_do');
  }

  get listArea() {
    return document.getElementById('list');
  }

  _createListItem(userInput) {
    let listItem = document.createElement('li');
    this.listArea.appendChild(listItem);

    listItem.setAttribute('id', `item${this.itemCount}`);
    this.itemCount ++;

    listItem.textContent = userInput;
  }

  _clearUserInput() {
    this.userInput.value = '';
  }

  initialise() {
    this.listListener();
    this.userInput.addEventListener('keydown', event => {
      if (event.keyCode === 13) {

        if (/\w{3,}/g.exec(this.userInput.value)) {
          this._createListItem(this.userInput.value);
          this._clearUserInput();
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
      this.strikeThoughItem(listElement);
      this.revealSVGSection();
    });
  }

  strikeThoughItem(listElement) {
    listElement.className = 'stroke';
    this.strokedItems ++;
  }

  revealSVGSection() {
    let sVGSection = document.querySelector(`#${this.sVGIds[this.strokedItems]}`);
    sVGSection.setAttribute('class', 'shown');
  }
}
