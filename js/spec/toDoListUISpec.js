describe('toDoListUI', function() {
  let textInput,
      listArea,
      toDoListUI;

  describe('when adding a to-do', function() {

    beforeEach(function () {
      setupDOM();
      toDoListUI = new ToDoListUI();
      toDoListUI.initialise();
    });

    afterEach(function() {
      removeDOM();
    });

    it('adds a to-do item to the list', function() {
      textInput.value = 'listen to Slayer';
      userEnterEvent();

      expect(listArea.childNodes[0].textContent).toEqual('listen to Slayer');
    });

    it('does not add item to the list if the input is empty', function() {
      textInput.value = '';
      userEnterEvent();

      expect(listArea.hasChildNodes()).toBe(false);
    });

    it('sets the items id', function() {
      textInput.value = 'Rock some lether';
      userEnterEvent();

      expect(listArea.childNodes[0].id).toEqual('item1');
    });

    it('increments succesive item ids', function() {
      textInput.value = 'buy a Morbid Angel t-shirt';
      userEnterEvent();

      textInput.value = 'book tickets to Download';
      userEnterEvent();

      expect(listArea.childNodes[1].id).toEqual('item2');
    });

    it('clears the textInput contents after returning', function() {
      textInput.value = 'Read Anton laVey\'s Satanic Bible';
      userEnterEvent();

      expect(textInput.value).toEqual('');
    });
  });

  function setupDOM() {
    textInput = document.createElement('input');
    listArea = document.createElement('ul');
    document.body.appendChild(textInput);
    document.body.appendChild(listArea);
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'to_do');
    listArea.setAttribute('id', 'list');
  }

  function removeDOM() {
    removeListAreaChildren();
    textInput.remove();
    listArea.remove();
  }

  function removeListAreaChildren() {
    let e = listArea,
    child = e.lastElementChild;
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
  }

  function userEnterEvent() {
    let event = new Event('keydown');
    event.keyCode = 13;
    textInput.dispatchEvent(event);
  }
});
