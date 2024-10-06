$(function() {
    const addButton = $(".btn");
    const list = $(".list");
    const content = $(".content");
    let currentHeight = content.outerHeight();

    function findRemoveButtons() {
        const removeButtons = $(".remove-btn");
        removeButtons.each(function() {
            $(this).click(function() {
                $(this).parent().remove();
                currentHeight -= 40;
                content.css("height", `${currentHeight}px`);
            });
        });
    }

    function findEditButtons() {
        const editButtons = $(".edit-btn");

        editButtons.each(function() {
            $(this).click(function() {
                const parent = $(this).parent();
                const textElement = parent.find(".text");
                const originalText = textElement.text();

                textElement.html(`<input type="text" id="edit-input" value="${originalText}" maxlength="52">`);

                $(this).replaceWith(`
                    <button class="save-btn">Сохранить</button>
                    <button class="cancel-btn">Отменить</button>
                `);

                const saveButton = parent.find(".save-btn");
                const cancelButton = parent.find(".cancel-btn");
                const inputField = parent.find("#edit-input");

                saveButton.click(function() {
                    const newText = inputField.val();
                    textElement.text(newText);

                    saveButton.replaceWith(`<button class="edit-btn">Редактировать</button>`);
                    cancelButton.remove();

                    findEditButtons();
                });

                cancelButton.click(function() {
                    textElement.text(originalText);

                    cancelButton.replaceWith(`<button class="edit-btn">Редактировать</button>`);
                    saveButton.remove();

                    findEditButtons();
                });
            });
        });
    }

    addButton.click(function() {
        const input = $("#input").val();

        if (input.length === 0) {
            alert('Необходимо ввести данные!');
        } else {
            list.append(`
                <div>
                    <ul class="spisok">
                        <span class="text">${input}</span>
                        <button class="edit-btn">Редактировать</button>
                        <button class="remove-btn">Удалить</button>
                    </ul>
                </div>
            `);
            $("#input").val('');

            currentHeight += 40;
            content.css("height", `${currentHeight}px`);

            findEditButtons();
            findRemoveButtons();
        }
    });

    findEditButtons();
    findRemoveButtons();
});