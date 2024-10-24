document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector(".add-btn");
    const inputField = document.querySelector(".input-field");
    const taskList = document.querySelector(".task-list");

    function addTask() {
        const taskText = inputField.value.trim();

        if (taskText.length === 0) {
            inputField.classList.add("error");
            alert("Необходимо ввести данные!");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskTextSpan = document.createElement("span");
        taskTextSpan.classList.add("task-text");
        taskTextSpan.textContent = taskText;

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("task-buttons");

        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "Редактировать";

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-btn");
        removeButton.textContent = "Удалить";

        buttonsDiv.append(editButton, removeButton);
        taskItem.append(taskTextSpan, buttonsDiv);
        taskList.appendChild(taskItem);

        inputField.value = "";
        inputField.classList.remove("error");

        findEditButtons();
        removeButton.addEventListener("click", () => taskItem.remove());
    }

    function findEditButtons() {
        const editButtons = document.querySelectorAll(".edit-btn");

        editButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const parent = button.parentElement.parentElement;
                const textElement = parent.querySelector(".task-text");

                const originalText = textElement.textContent;

                textElement.innerHTML = `<input type="text" class="edit-input" value="${originalText}" maxlength="50">`;

                button.outerHTML = `
                    <button class="save-btn">Сохранить</button>
                    <button class="cancel-btn">Отменить</button>
                `;

                const saveButton = parent.querySelector(".save-btn");
                const cancelButton = parent.querySelector(".cancel-btn");
                const inputField = parent.querySelector(".edit-input");

                saveButton.addEventListener("click", function () {
                    const newText = inputField.value.trim();

                    if (newText.length === 0) {
                        alert("Текст не может быть пустым!");
                        return;
                    }

                    textElement.textContent = newText;

                    saveButton.outerHTML = `<button class="edit-btn">Редактировать</button>`;
                    cancelButton.remove();

                    findEditButtons();
                });

                cancelButton.addEventListener("click", function () {
                    textElement.textContent = originalText;

                    cancelButton.outerHTML = `<button class="edit-btn">Редактировать</button>`;
                    saveButton.remove();

                    findEditButtons();
                });
            });
        });
    }

    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    addButton.addEventListener("click", addTask);
});