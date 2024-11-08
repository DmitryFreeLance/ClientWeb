document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector(".add-btn");
    const inputField = document.querySelector(".input-field");
    const taskList = document.querySelector(".task-list");
    const errorText = document.querySelector(".error-text");

    function addTask() {
        const taskText = inputField.value.trim();

        if (taskText.length === 0) {
            inputField.classList.add("error-border");
            errorText.textContent = "Необходимо ввести данные!";
            errorText.style.display = "block";
            return;
        }

        inputField.classList.remove("error-border");
        errorText.style.display = "none";

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskTextSpan = document.createElement("span");
        taskTextSpan.classList.add("task-text");
        taskTextSpan.textContent = taskText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
        attachTaskButtonHandlers(taskItem);
    }

    function attachTaskButtonHandlers(taskItem) {
        const editButton = taskItem.querySelector(".edit-btn");
        const removeButton = taskItem.querySelector(".remove-btn");

        editButton.addEventListener("click", () => editTask(taskItem));
        removeButton.addEventListener("click", () => taskItem.remove());
    }

    function editTask(taskItem) {
        const textElement = taskItem.querySelector(".task-text");
        const originalText = textElement.textContent;

        textElement.innerHTML = `<input type="text" class="edit-input" value="${originalText}" maxlength="50">`;

        const editButtonsDiv = taskItem.querySelector(".task-buttons");
        editButtonsDiv.innerHTML = `
            <button class="save-btn">Сохранить</button>
            <button class="cancel-btn">Отменить</button>
        `;

        const saveButton = taskItem.querySelector(".save-btn");
        const cancelButton = taskItem.querySelector(".cancel-btn");
        const editInputField = taskItem.querySelector(".edit-input");

        saveButton.addEventListener("click", () => saveTask(editInputField, textElement, originalText, editButtonsDiv));
        cancelButton.addEventListener("click", () => cancelEdit(textElement, originalText, editButtonsDiv));

        editInputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                saveTask(editInputField, textElement, originalText, editButtonsDiv);
            }
        });
    }

    function saveTask(editInputField, textElement, originalText, editButtonsDiv) {
        const newText = editInputField.value.trim();

        if (newText.length === 0) {
            errorText.textContent = "Текст не может быть пустым!";
            editInputField.classList.add("error-border");
            return;
        }

        editInputField.classList.remove("error-border");
        textElement.textContent = newText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        resetButtons(editButtonsDiv);
    }

    function cancelEdit(textElement, originalText, editButtonsDiv) {
        textElement.textContent = originalText;
        resetButtons(editButtonsDiv);
    }

    function resetButtons(editButtonsDiv) {
        editButtonsDiv.innerHTML = `
            <button class="edit-btn">Редактировать</button>
            <button class="remove-btn">Удалить</button>
        `;
        attachTaskButtonHandlers(editButtonsDiv.parentElement);
    }

    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    addButton.addEventListener("click", addTask);
});