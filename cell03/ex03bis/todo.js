$(document).ready(function() {
    // Load existing TO DOs from cookies on startup
    loadTodos();

    // Event: Click "New" button
    $('#new_todo').on('click', function() {
        const task = prompt("What do you need to do?");
        if (task !== null && task.trim() !== "") {
            addTodo(task);
            saveTodos();
        }
    });

    // Event: Click on a TO DO to remove it
    // We use delegation because items are added dynamically
    $('#ft_list').on('click', '.todo-item', function() {
        const confirmDelete = confirm("Do you really want to remove this TO DO?");
        if (confirmDelete) {
            $(this).remove();
            saveTodos();
        }
    });

    // Function to add item to the TOP of the list
    function addTodo(text) {
        const $newDiv = $('<div></div>').addClass('todo-item').text(text);
        $('#ft_list').prepend($newDiv);
    }

    // Function to save all current items into a cookie
    function saveTodos() {
        const todos = [];
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        
        // Encode to JSON and store in cookie (expires in 7 days)
        const json_str = JSON.stringify(todos);
        document.cookie = "todo_list=" + encodeURIComponent(json_str) + ";path=/;max-age=" + (60*60*24*7);
    }

    // Function to parse cookies and rebuild the list
    function loadTodos() {
        const name = "todo_list=";
        const ca = document.cookie.split(';');
        let cookieData = "";

        for(let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                cookieData = decodeURIComponent(c.substring(name.length, c.length));
                break;
            }
        }

        if (cookieData) {
            const todos = JSON.parse(cookieData);
            // We load them in reverse so prepend puts them in the original order
            todos.reverse().forEach(function(task) {
                addTodo(task);
            });
        }
    }
});