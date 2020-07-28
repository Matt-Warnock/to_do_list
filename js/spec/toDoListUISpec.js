describe('toDoListUI', function() {
  let textInput,
      listArea,
      toDoListUI,
      sVGContainer;

  beforeEach(function () {
    setupDOM();
    toDoListUI = new ToDoListUI(ids);
    toDoListUI.initialise();
  });

  afterEach(function() {
    removeDOM();
  });

  describe('when adding a to-do', function() {

    it('adds a to-do item to the list', function() {
      addToDo('test');

      expect(listArea.lastChild.textContent).toEqual('test');
    });

    it('does not add item to the list if the input is empty', function() {
      addToDo('');

      expect(listArea.hasChildNodes()).toBe(false);
    });

    it('sets the items id', function() {
      addToDo('test');

      expect(listArea.lastChild.id).toEqual('item1');
    });

    it('increments succesive item ids', function() {
      addToDo('test');
      addToDo('second test');

      expect(listArea.lastChild.id).toEqual('item2');
    });

    it('clears the textInput contents after returning', function() {
      addToDo('test');

      expect(textInput.value).toEqual('');
    });
  });

  describe('when checking list', function() {

    it('strikes to-do item when user clicks it', function() {
      addToDo('test');

      listArea.lastChild.click();

      expect(listArea.lastChild.classList).toContain('stroke');
    });

    it('removes stroked to-do item when user clicks it', function() {
      addToDo('test');

      listArea.lastChild.click();
      listArea.lastChild.click();


      expect(listArea.lastChild).toBe(null);
    });

    it('click on stroked item reveals section of SVG image', function() {
      addToDo('test');

      listArea.lastChild.click();

      let sVGBodyElement = document.getElementById(ids.sVGIds[0]);

      expect(sVGBodyElement.classList).not.toContain('hidden');
    });

    it('click on second stroked item reveals next section of SVG image', function() {
      addToDo('test');
      addToDo('second test');

      listArea.firstChild.click();
      listArea.lastChild.click();

      let sVGHairElement = document.getElementById(ids.sVGIds[1]);

      expect(sVGHairElement.classList).not.toContain('hidden');
    });

    it('stops when all SVG sections are reveled', function() {
      let sVGImageSections = document.querySelector('g');

      Array.from(sVGImageSections.length +1).forEach(() => {
        addToDo('test');
        listArea.lastChild.click();
      });

      function areAllSectionShown() {

        return Array.from(sVGImageSections).every(section => {
          return section.classList.not.toContain('hidden');
        });
      }

      expect(areAllSectionShown()).toBe(true);
    });
  });

  function addToDo(text) {
    textInput.value = text;

    let event = new Event('keydown');
    event.code = 'Enter';
    textInput.dispatchEvent(event);
  }

  function setupDOM() {
    textInput = document.createElement('input');
    listArea = document.createElement('ul');
    document.body.appendChild(textInput);
    document.body.appendChild(listArea);
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', ids.inputId);
    listArea.setAttribute('id', ids.listId);
    setupDOMSVG();
  }

  function setupDOMSVG() {
    sVGContainer = document.createElement('div');
    sVGContainer.innerHTML =
    `<svg>
    <g id=${ids.sVGIds[0]} class="hidden"></g>
    <g id=${ids.sVGIds[1]} class="hidden"></g>
    <g id=${ids.sVGIds[2]} class="hidden"></g>
    <g id=${ids.sVGIds[3]} class="hidden"></g>
    <g id=${ids.sVGIds[4]} class="hidden"></g>
    <g id=${ids.sVGIds[5]} class="hidden"></g>
    </svg>`;
    document.body.appendChild(sVGContainer);
  }

  function removeDOM() {
    textInput.remove();
    listArea.remove();
    sVGContainer.remove();
  }
  
  const ids = {
    inputId: 'to_do',
    listId: 'list',
    sVGIds: [
      'body',
      'hair',
      'clothes',
      'mic',
      'left-blast',
      'right-blast'
    ]
  };
});
