var todoList = {
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
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
      
      this.todos.forEach(function(todo) {    // no sabía qué debía sustituir al antiguo this.todos[i] para representar 
                                              // cada elemento de la lista. La clave estaba en pasar un parámetro en la función (en este caso "todo"), 
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
  

var handlers = {
    addTodo: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
      return false;
    },
    changeTodo: function() {
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
      var changeTodoTextInput = document.getElementById('changeTodoTextInput');
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
  

var view = {
    
    displayTodos: function() {
      //debugger;
      var todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      todoList.todos.forEach(function(todo, position) {  // position when in a forEach, takes the position of the array item
        var todoLi = document.createElement('li'); 
        var toggleBtn = document.createElement('button');
        var todoTextSpan = document.createElement('span');
        
        if (todo.completed === true) {
          todoTextSpan.className = 'doneTask';  //this class will apply a strikethrough style via CSS
        }
        
        todoLi.id = position;
        todoTextSpan.textContent = todo.todoText;
        todoLi.appendChild(todoTextSpan);
        todoLi.appendChild(this.createDeleteButton());   //this.createDeleteButton was not working, check MDN doc for Array.prototype.forEach()
        todosUl.appendChild(todoLi);
      }, this)      /* basically the THIS is inside a callback function so it was not referring to the view object
      so the syntax is forEach(callbackfunction(), this) in order to be able to use THIS
      there it is, so now the THIS inside the callback function is equivalent to this THIS.*/
    },
    
    createDeleteButton: function() {
      var deleteButton = document.createElement('button');
      deleteButton.textContent = "delete";
      deleteButton.className = "deleteButton";
      return deleteButton;
    },
    setUpEventListeners: function() {
      var todoUl = document.querySelector('ul');
      todoUl.addEventListener('click', function(event) {
        debugger;
        var elemClicked = event.target;
        if (elemClicked.className == "deleteButton") {
          handlers.deleteTodo(parseInt(elemClicked.parentNode.id)); 
          //parent node is <li> element, whose id was set to be its position in array of to-dos.
      } else if (elemClicked.nodeName == 'SPAN') {
          handlers.toggleCompleted(parseInt(elemClicked.parentNode.id));
        } 
      })
    }
  };
  
  view.setUpEventListeners();