class ToDoListUI {
  constructor(iDs) {
    this.inputId = iDs.inputId;
    this.listId = iDs.listId;
    this.sVGIds = iDs.sVGIds;
    this.toDoItem = '';
    this.itemCount = 1;
    this.strokedItems = -1;
  }

  get userInput() {
    return document.getElementById(this.inputId);
  }

  get listArea() {
    return document.getElementById(this.listId);
  }

  _createListItem(userInput) {
    let listItem = document.createElement('li');

    this.listArea.appendChild(listItem);
    listItem.textContent = userInput;

    this._createItemId(listItem);
  }

  _createItemId(listItem) {
    listItem.setAttribute('id', `item${this.itemCount}`);
    this.itemCount ++;
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
    if (this.strokedItems < this.sVGIds.length) {
      let sVGSection = document.querySelector(`#${this.sVGIds[this.strokedItems]}`);
      sVGSection.setAttribute('class', 'shown');
    }
  }
}
