describe('toDoListUI', function() {
  let toDoListUI;

  describe('when adding a to-do', function() {
    let textInput = document.createElement('input');

    it('adds a to-do item to the list', function() {
      document.body.appendChild(textInput);
      textInput.setAttribute('type', 'text');
      textInput.setAttribute('id', 'to_do');

      toDoListUI = new ToDoListUI();
      toDoListUI.initialise();

      textInput.value = 'listen to Slayer';
      let event = new Event('keydown');
      event.keyCode = 13;
      textInput.dispatchEvent(event);

      let newItem = document.getElementById('item1');

      expect(newItem.textContent).toEqual('listen to Slayer');
    });
  });
});
