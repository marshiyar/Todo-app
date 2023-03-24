'use strict'

// Selectors
const input = document.querySelector('#inputField')
const button = document.querySelector('#addButton')
const container = document.querySelector('#container')
const showAllButton = document.querySelector('#showAll');
const showCompletedButton = document.querySelector('#showCompleted');
const showIncompleteButton = document.querySelector('#showIncomplete');
const earaseAllTasks = document.querySelector('#earaseAll')

////////////////////////////////////
/* Set Up Listeners */
function setUpListeners(item) {


    item.addEventListener('click', () => {
      item.style.textDecoration = 'line-through';
      saveTasks();
    });

    enableEditing(item);

    let pressTimer;
    item.addEventListener('mousedown', () => {
      pressTimer = setTimeout(() => {
        container.removeChild(item);
        saveTasks();
      }, 1000);
    });

    item.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
      });
     item.addEventListener('mouseleave', () => {
    clearTimeout(pressTimer);
  });

  }


//////////////////////////////
/* Local Storage */

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        container.innerHTML = storedTasks
        const items = container.querySelectorAll('p');
        items.forEach((item) => setUpListeners(item));
    }
}
loadTasks();
function saveTasks() {
    localStorage.setItem('tasks', container.innerHTML)
}
/////////////////////////////////////

// Button being pressed functionality
function buttonPressed() {
    const item = document.createElement('p');
    item.classList.add('item-styling');
    item.innerText= input.value;
    
    container.appendChild(item);
    input.value = ''
    setUpListeners(item)
    saveTasks();
}


// pressing ther enter button for a new task
input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      buttonPressed();
    }
  });
//   pressing the add button for a new task
button.addEventListener('click', buttonPressed)
////////////////////////////////////////////
// Show all task for the button 
function showAllTasks() {
    const items = container.querySelectorAll('p')
    items.forEach((item) => {
        item.style.display = 'block'
    })
}

// to show only completed tasks
function showCompletedTasks() {
    const items = container.querySelectorAll('p');
    items.forEach((item) => {
        if (item.style.textDecoration === 'line-through') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
// To show Incomplete tasks only
function showIncompleteTasks() {
    const item = container.querySelectorAll('p');
    item.forEach((item) => {
        if (item.style.textDecoration === 'line-through'){
            item.style.display = 'none'
        } else {
            item.style.display = 'block'
        }
    });
}

// adding the even listener so when button pressed function begins
showAllButton.addEventListener('click', showAllTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);
showIncompleteButton.addEventListener('click', showIncompleteTasks);
///////////////////////////////////////////
// Earasing all of the task at once

function earaseTasks () {
    const items = container.querySelectorAll('p')
    items.forEach((item) =>{container.removeChild(item)
    })
    saveTasks();
}

earaseAllTasks.addEventListener('dblclick', earaseTasks)

// ///////////////////////////////
// Editing a task

function enableEditing(item) {
    item.addEventListener('dblclick', () => {
        item.setAttribute('contenteditable', 'true')
        item.classList.add('edit');
        item.focus();
    })
    item.addEventListener('blur', () => {
        item.setAttribute('contenteditable', 'false')
        item.classList.remove('edit')
        saveTasks();
    })
    
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.which === 13) {
            item.blur();
        }
    })
}
