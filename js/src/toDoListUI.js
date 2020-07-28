class ToDoListUI {
  constructor(ids) {
    this.inputId = ids.inputId;
    this.listId = ids.listId;
    this.sVGIds = ids.sVGIds;
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
      if (event.code === 'Enter') {
        if (/^\s*$/g.exec(this.userInput.value)) {
          return;
        }
          this._createListItem(this.userInput.value);
          this._clearUserInput();
      }
    });
  }

  listListener() {
    this.listArea.addEventListener('click', event => {
      let itemClicked = event.target,
          listElement = document.getElementById(itemClicked.id);

      if (Array.from(itemClicked.classList).includes('stroke')) {
        listElement.remove();
        return;
      }
      this.strikeThoughItem(listElement);
      this.revealSVGSection();
    });
  }

  strikeThoughItem(listElement) {
    listElement.classList.add('stroke');
    this.strokedItems ++;
  }

  revealSVGSection() {
    if (this.strokedItems < this.sVGIds.length) {
      let sVGSection = document.querySelector(`#${this.sVGIds[this.strokedItems]}`);
      sVGSection.removeAttribute('class', 'hidden');
    }
  }
}
