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
                currentHeight -= 40;
                content.style.height = `${currentHeight}px`;
            };
        });
    }

    function findEditButtons() {
        const editButtons = document.querySelectorAll(".edit-btn");

        editButtons.forEach(function(button) {
            button.onclick = function(e) {
                const parent = button.parentElement;
                const textElement = parent.querySelector(".text");

                const originalText = textElement.innerText;

                textElement.innerHTML = `<input type="text" id="edit-input" value="${originalText}" maxlength="52">`;

                button.outerHTML = `
                    <button class="save-btn">Сохранить</button>
                    <button class="cancel-btn">Отменить</button>
                `;

                const saveButton = parent.querySelector(".save-btn");
                const cancelButton = parent.querySelector(".cancel-btn");
                const inputField = parent.querySelector("#edit-input");

                saveButton.onclick = function() {
                    const newText = inputField.value;
                    textElement.innerHTML = newText;

                    saveButton.outerHTML = `<button class="edit-btn">Редактировать</button>`;
                    cancelButton.remove();

                    findEditButtons();
                };

                cancelButton.onclick = function() {
                    textElement.innerHTML = originalText;

                    cancelButton.outerHTML = `<button class="edit-btn">Редактировать</button>`;
                    saveButton.remove();

                    findEditButtons();
                };
            };
        });
    }

    addButton.onclick = function(e) {
        const input = document.querySelector("#input").value;

        if (input.length == 0) {
            alert('Необходимо ввести данные!');
        } else {
            list.innerHTML += `
                <div>
                    <ul class="spisok">
                        <span class="text">${input}</span>
                        <button class="edit-btn">Редактировать</button>
                        <button class="remove-btn">Удалить</button>
                    </ul>
                </div>
            `;
            document.querySelector("#input").value = '';

            currentHeight += 40;
            content.style.height = `${currentHeight}px`;

            findEditButtons();
            findRemoveButtons();
        }
    };

    findEditButtons();
    findRemoveButtons();
});