$(document).ready(() => {
    const addButton = $(".add-btn");
    const inputField = $(".input-field");
    const taskList = $(".task-list");
    const errorMsg = $(".error-msg");

    const showError = (message) => {
        errorMsg.text(message).show();
        inputField.addClass("error");
    };

    const hideError = () => {
        errorMsg.hide();
        inputField.removeClass("error");
    };

    const addTask = () => {
        const taskText = inputField.val().trim();
        if (taskText.length === 0) {
            showError("Необходимо ввести данные!");
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

        inputField.val("");
        hideError();

        setupTaskButtons(taskItem, taskTextSpan, editButton, removeButton);
    };

    const setupTaskButtons = (taskItem, taskTextSpan, editButton, removeButton) => {
        editButton.click(() => startEditing(taskItem, taskTextSpan));
        removeButton.click(() => taskItem.remove());
    };

    const startEditing = (taskItem, taskTextSpan) => {
        const originalText = taskTextSpan.text();
        const editInput = $("<input>").attr({
            type: "text",
            class: "edit-input",
            value: originalText,
            maxlength: 50
        });

        taskTextSpan.html(editInput);

        const saveButton = $("<button>").addClass("save-button").text("Сохранить");
        const cancelButton = $("<button>").addClass("cancel-button").text("Отменить");

        taskItem.find(".task-buttons").append(saveButton, cancelButton);
        taskItem.find(".edit-button, .remove-button").hide();

        saveButton.click(() => {
            const newText = editInput.val().trim();
            if (newText.length === 0) {
                showError("Текст не может быть пустым!");
                return;
            }

            taskTextSpan.text(newText);
            hideError();
            endEditing(taskItem, saveButton, cancelButton);
        });

        cancelButton.click(() => {
            taskTextSpan.text(originalText);
            hideError();
            endEditing(taskItem, saveButton, cancelButton);
        });

        editInput.keydown((e) => {
            if (e.key === "Enter") saveButton.click();
        });
    };

    const endEditing = (taskItem, saveButton, cancelButton) => {
        taskItem.find(".edit-button, .remove-button").show();
        saveButton.remove();
        cancelButton.remove();
    };

    inputField.keydown((e) => {
        if (e.key === "Enter") addTask();
    });

    addButton.click(addTask);
});