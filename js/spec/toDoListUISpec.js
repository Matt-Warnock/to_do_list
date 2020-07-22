describe('toDoListUI', function() {
  let toDoListUI;

  describe('when adding a to-do', function() {
    let textInput = document.createElement('input'),
        listArea = document.createElement('ul');

    afterEach(function() {
      var e = listArea;
      var child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
          }
      textInput.remove();
      listArea.remove();
    });

    it('adds a to-do item to the list', function() {
      document.body.appendChild(textInput);
      document.body.appendChild(listArea);
      textInput.setAttribute('type', 'text');
      textInput.setAttribute('id', 'to_do');
      listArea.setAttribute('id', 'list');

      toDoListUI = new ToDoListUI();
      toDoListUI.initialise();

      textInput.value = 'listen to Slayer';
      let event = new Event('keydown');
      event.keyCode = 13;
      textInput.dispatchEvent(event);

      expect(listArea.childNodes[0].textContent).toEqual('listen to Slayer');
    });

    it('does not add item to the list if the input is empty', function() {
      document.body.appendChild(textInput);
      document.body.appendChild(listArea);
      textInput.setAttribute('type', 'text');
      textInput.setAttribute('id', 'to_do');
      listArea.setAttribute('id', 'list');

      toDoListUI = new ToDoListUI();
      toDoListUI.initialise();

      textInput.value = '';
      let event = new Event('keydown');
      event.keyCode = 13;
      textInput.dispatchEvent(event);

      expect(listArea.hasChildNodes()).toBe(false);
    });
  });
});
