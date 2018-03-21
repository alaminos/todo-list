const todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
      let todo = this.todos[position];
      todo.completed = !todo.completed;
    },
    toggleAll: function() {
      const totalTodos = this.todos.length;
      let completedTodos = 0;
      
      this.todos.forEach(function(todo) {     
        if (todo.completed === true) {
          completedTodos++;
        }
      })
      
      this.todos.forEach(function(todo) {
        if (completedTodos === totalTodos) {   // Case 1: If everything’s true, make everything false.
          todo.completed = false;
        } else {
          todo.completed = true;               // Case 2: Otherwise, make everything true.
        }
      })
    }
  };
  

const handlers = {
    addTodo: function() {
      let addTodoTextInput = document.getElementById('addTodoTextInput');
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
      return false;
    },
    changeTodo: function() {
      let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
      let changeTodoTextInput = document.getElementById('changeTodoTextInput');
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
    },
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    },
    toggleCompleted: function(task) {
      todoList.toggleCompleted(task);
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }  
  };
  

const view = {
    
    displayTodos: function() {
      const todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      todoList.todos.forEach( (todo, position) => {  // the syntax of the callback function is (element, index), position refers to the index of the element in the array
        let todoLi = document.createElement('li')
          //, toggleBtn = document.createElement('button') //removed toggle
          , todoTextSpan = document.createElement('span')
          , todoBtns = document.createElement('div'); //will contain rename and delete buttns for each to-do element
        
        if (todo.completed === true) {
          todoTextSpan.className = 'doneTask';  //this class will apply a strikethrough style via CSS
        }
        
        todoLi.id = position;
        todoTextSpan.textContent = todo.todoText;
        todoBtns.appendChild(this.createRenameButton()); 
        todoBtns.appendChild(this.createDeleteButton());
        todoLi.appendChild(todoTextSpan);
        todoLi.appendChild(todoBtns);
        todosUl.appendChild(todoLi);
      }, )  
    },
    
    createDeleteButton: function() {
      let deleteButton = document.createElement('button');
      deleteButton.textContent = "X";
      deleteButton.className = "deleteButton microButton";
      return deleteButton;
    },

    createRenameButton: function() {
      let renameButton = document.createElement('button');
      renameButton.textContent = "<<";
      renameButton.className = 'renameButton microButton';
      return renameButton;
    },

    setUpEventListeners: function() {
      let todoUl = document.querySelector('ul');
      todoUl.addEventListener('click', function(event) {
        let elemClicked = event.target;
        if (elemClicked.classList.contains("microButton")) {
          let parentEl = elemClicked.parentNode; //element that contains both microbutns
          let todoID = parseInt(parentEl.parentNode.id); //gets the id of the task
          console.log('the id is: ' + todoID);
          if (elemClicked.classList.contains('deleteButton')) {
            handlers.deleteTodo(todoID);
          } else { /*rename task*/ }
  
      } else if (elemClicked.nodeName == 'SPAN') {
          handlers.toggleCompleted(parseInt(elemClicked.parentNode.id));
        }
      })
    }
  };
  
  view.setUpEventListeners();