$(document).ready(function () {
    const addButton = $(".add-btn");
    const inputField = $(".input-field");
    const taskList = $(".task-list");

    function addTask() {
        const taskText = inputField.val().trim();

        if (taskText.length === 0) {
            inputField.addClass("error");
            alert("Необходимо ввести данные!");
            return;
        }

        const taskItem = $("<li>").addClass("task-item");
        const taskTextSpan = $("<span>").addClass("task-text").text(taskText);

        const buttonsDiv = $("<div>").addClass("task-buttons");
        const editButton = $("<button>").addClass("edit-button").text("Редактировать");
        const removeButton = $("<button>").addClass("remove-button").text("Удалить");

        buttonsDiv.append(editButton, removeButton);
        taskItem.append(taskTextSpan, buttonsDiv);
        taskList.append(taskItem);

        inputField.val("").removeClass("error");

        setupTaskButtons(taskItem, taskTextSpan, editButton, removeButton);
    }

    function setupTaskButtons(taskItem, taskTextSpan, editButton, removeButton) {
        editButton.click(() => {
            startEditing(taskItem, taskTextSpan);
        });

        removeButton.click(() => {
            taskItem.remove();
        });
    }

    function startEditing(taskItem, taskTextSpan) {
        const originalText = taskTextSpan.text();
        taskTextSpan.html(`<input type="text" class="edit-input" value="${originalText}" maxlength="50">`);

        const editInput = taskTextSpan.find(".edit-input");
        const saveButton = $("<button>").addClass("save-button").text("Сохранить");
        const cancelButton = $("<button>").addClass("cancel-button").text("Отменить");

        taskItem.find(".task-buttons").append(saveButton, cancelButton);
        taskItem.find(".edit-button, .remove-button").hide();

        saveButton.click(() => {
            const newText = editInput.val().trim();

            if (newText.length === 0) {
                alert("Текст не может быть пустым!");
                return;
            }

            taskTextSpan.text(newText);
            endEditing(taskItem, saveButton, cancelButton);
        });

        cancelButton.click(() => {
            taskTextSpan.text(originalText);
            endEditing(taskItem, saveButton, cancelButton);
        });

        editInput.keydown(function (e) {
            if (e.key === "Enter") {
                saveButton.click();
            }
        });
    }

    function endEditing(taskItem, saveButton, cancelButton) {
        taskItem.find(".edit-button, .remove-button").show();
        saveButton.remove();
        cancelButton.remove();
    }

    inputField.keydown(function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    addButton.click(addTask);
});