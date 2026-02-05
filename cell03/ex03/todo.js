window.onload = function() {
    var ft_list = document.getElementById('ft_list');
    var newBtn = document.getElementById('newBtn');

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function saveTodoList() {
        var todos = [];
        var items = ft_list.children;
        for (var i = 0; i < items.length; i++) {
            todos.push(items[i].innerHTML);
        }
        setCookie("ft_list", JSON.stringify(todos), 7);
    }

    function addTodo(text) {
        var div = document.createElement("div");
        div.className = "todo-item";
        div.innerHTML = text;

        div.addEventListener("click", function() {
            if (confirm("Do you want to remove this TO DO?")) {
                this.remove(); 
                saveTodoList(); 
            }
        });

        ft_list.prepend(div);
    }

    var savedList = getCookie("ft_list");
    if (savedList) {
        try {
            var todos = JSON.parse(savedList);

            for (var i = todos.length - 1; i >= 0; i--) {
                addTodo(todos[i]);
            }
        } catch (e) {
            console.error("Cookie Error");
        }
    }

    newBtn.addEventListener("click", function() {
        var text = prompt("Enter new TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text);
            saveTodoList(); 
        }
    });
};