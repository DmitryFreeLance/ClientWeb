$(document).ready(function () {
    const $addButton = $(".add-btn");
    const $inputField = $(".input-field");
    const $taskList = $(".task-list");

    function addTask() {
        const taskText = $.trim($inputField.val());

        if (taskText.length === 0) {
            $inputField.addClass("error");
            alert("Необходимо ввести данные!");
            return;
        }

        const $taskItem = $("<li>").addClass("task-item");
        const $taskTextSpan = $("<span>").addClass("task-text").text(taskText);

        const $buttonsDiv = $("<div>").addClass("task-buttons");
        const $editButton = $("<button>").addClass("edit-btn").text("Редактировать");
        const $removeButton = $("<button>").addClass("remove-btn").text("Удалить");

        $buttonsDiv.append($editButton, $removeButton);
        $taskItem.append($taskTextSpan, $buttonsDiv);
        $taskList.append($taskItem);

        $inputField.val("").removeClass("error");

        findEditButtons();

        $removeButton.on("click", function () {
            $taskItem.remove();
        });
    }

    function findEditButtons() {
        $(".edit-btn").each(function () {
            $(this).on("click", function () {
                const $parent = $(this).closest("li");
                const $textElement = $parent.find(".task-text");
                const originalText = $textElement.text();

                $textElement.html(`<input type="text" class="edit-input" value="${originalText}" maxlength="50">`);

                $(this).replaceWith(`
                    <button class="save-btn">Сохранить</button>
                    <button class="cancel-btn">Отменить</button>
                `);

                const $saveButton = $parent.find(".save-btn");
                const $cancelButton = $parent.find(".cancel-btn");
                const $inputField = $parent.find(".edit-input");

                $saveButton.on("click", function () {
                    const newText = $.trim($inputField.val());

                    if (newText.length === 0) {
                        alert("Текст не может быть пустым!");
                        return;
                    }

                    $textElement.text(newText);

                    $saveButton.replaceWith(`<button class="edit-btn">Редактировать</button>`);
                    $cancelButton.remove();

                    findEditButtons();
                });

                $cancelButton.on("click", function () {
                    $textElement.text(originalText);

                    $cancelButton.replaceWith(`<button class="edit-btn">Редактировать</button>`);
                    $saveButton.remove();

                    findEditButtons();
                });
            });
        });
    }

    $inputField.on("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    $addButton.on("click", addTask);
});