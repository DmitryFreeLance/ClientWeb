document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector(".btn");
    const list = document.querySelector(".list");
    const content = document.querySelector(".content");
    let currentHeight = content.offsetHeight;

    function findRemoveButtons() {
        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(function(button) {
            button.onclick = function(e) {
                const item = e.target.parentNode;
                item.remove();
                currentHeight -= 31;
                content.style.height = `${currentHeight}px`;
            };
        });
    }

    addButton.onclick = function(e) {
        const input = document.querySelector("#input").value;

        if (input.length == 0) {
            alert('Необходимо ввести данные!');
        } else {
            list.innerHTML += '<div><ul class="spisok">' + input + '<button class="edit-btn">Редактировать</button> <button class="remove-btn">Удалить</button></ul></div>';
            document.querySelector("#input").value = '';

            currentHeight += 31;
            content.style.height = `${currentHeight}px`;

            findRemoveButtons();
        }
    };

    findRemoveButtons();
});