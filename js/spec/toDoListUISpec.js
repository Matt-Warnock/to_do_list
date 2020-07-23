describe('toDoListUI', function() {
  let textInput,
      listArea,
      toDoListUI;

  beforeEach(function () {
    setupDOM();
    toDoListUI = new ToDoListUI();
    toDoListUI.initialise();
  });

  afterEach(function() {
    removeDOM();
  });

  describe('when adding a to-do', function() {
    let sVGContainer;

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

  describe('when checking list', function() {

    it('strikes to-do item when user clicks it', function() {
      textInput.value = 'listen to Slayer';
      userEnterEvent();

      document.getElementById('item1').click();

      expect(listArea.childNodes[0].className).toEqual('stroke');
    });

    it('removes stroked to-do item when user clicks it', function() {
      textInput.value = 'listen to Slayer';
      userEnterEvent();

      document.getElementById('item1').click();
      document.querySelector('.stroke').click();


      expect(listArea.childNodes[0]).toBe(undefined);
    });

    it('when click on stroked item reveals section of SVG image', function() {

      textInput.value = 'listen to Slayer';
      userEnterEvent();

      document.getElementById('item1').click();

      let sVGBodyElement = document.getElementById('body');

      expect(sVGBodyElement.classList[0]).toEqual('shown');
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
    setupDOMSVG();
  }

  function removeDOM() {
    removeListAreaChildren();
    textInput.remove();
    listArea.remove();
    sVGContainer.remove();
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

  function setupDOMSVG() {
    sVGContainer = document.createElement('div');
    sVGContainer.innerHTML = `<svg class="punk">
                              <g id="body" class="hidden"></g>
                              <g id="hair" class="hidden"></g>
                              </svg>`;
    document.body.appendChild(sVGContainer);
  }
});
