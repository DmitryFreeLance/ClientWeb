$(function () {
    const addButton = $('.add-btn');
    const phoneNumbers = [];
    const applyFilterButton = $('.apply-filter-btn');
    const resetFilterButton = $('.reset-filter-btn');
    const filterInput = $('#filter-input');

    function applyFilter() {
        const filterText = filterInput.val().toLowerCase();

        $('table.phone-book tr:gt(0)').each(function () {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.includes(filterText));
        });
    }

    function resetFilter() {
        filterInput.val('');
        $('table.phone-book tr').show();
    }

    applyFilterButton.click(applyFilter);
    resetFilterButton.click(resetFilter);

    function bindRemoveButtons() {
        const mainRemoveButton = $('.remove-btn-main');
        const removeButtons = $('.remove-btn');
        const mainCheckBox = $('.main-checkbox');

        removeButtons.click(function () {
            const row = $(this).closest('tr');

            $("#dialog-confirm").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Удалить": function () {
                        row.remove();
                        updateRowNumbers();
                        $(this).dialog("close");
                    },
                    "Отменить": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        mainCheckBox.click(function () {
            const isChecked = $(this).prop('checked');
            $('.checkboxes').prop('checked', isChecked);
        });

        mainRemoveButton.click(function () {
            const selectedRows = $(".checkboxes:checked").closest('tr');

            if (selectedRows.length) {
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить выбранные": function () {
                            selectedRows.remove();
                            updateRowNumbers();
                            $(this).dialog("close");
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        });
    }

    function bindEditButtons() {
        const editButtons = $('.edit-btn');

        editButtons.click(function () {
            const currentRow = $(this).closest('tr');
            const editableCells = currentRow.find(".editable");
            const originalValues = [];

            editableCells.each(function () {
                const originalText = $(this).text();
                originalValues.push(originalText);
                $(this).html(`<input type="text" class="temp-input" value="${originalText}" maxlength="18">`);
            });

            currentRow.find(".temp-input:last").keypress(function (e) {
                if (e.key < '0' || e.key > '9') {
                    e.preventDefault();
                }
            });

            $(this).replaceWith(`
                <button class="save-btn">Сохранить</button>
                <button class="cancel-btn">Отменить</button>
            `);

            const saveButton = currentRow.find(".save-btn");
            const cancelButton = currentRow.find(".cancel-btn");

            saveButton.click(function () {
                const newValues = [];

                editableCells.each(function () {
                    newValues.push($(this).find('input').val());
                });

                editableCells.each(function (index) {
                    $(this).text(newValues[index]);
                });

                cancelButton.replaceWith(`<button class="edit-btn"><img class="images" src="../images/edit.png" alt="Редактировать" title="Редактировать"></button>`);
                saveButton.remove();
                bindEditButtons();
            });

            cancelButton.click(function () {
                editableCells.each(function (index) {
                    $(this).text(originalValues[index]);
                });

                cancelButton.replaceWith(`<button class="edit-btn"><img class="images" src="../images/edit.png" alt="Редактировать" title="Редактировать"></button>`);
                saveButton.remove();
                bindEditButtons();
            });
        });
    }

    function updateRowNumbers() {
        $('.number').each(function (index) {
            $(this).text(index + 1);
        });
    }

    function validatePhoneNumber() {
        const phone = $('#phone').val().trim();
        const errorPhone = $('.error-phone-msg');

        if (phoneNumbers.includes(phone)) {
            errorPhone.text('Такой номер телефона уже существует');
            $('#phone').addClass('red-background');
            return false;
        }

        $('#phone').removeClass('red-background');
        return true;
    }

    function validateFields() {
        let isValid = true;
        const inputs = $(".main-input");
        const error = $('.error-msg');
        const errorPhone = $('.error-phone-msg');

        error.text('');
        errorPhone.text('');

        inputs.each(function () {
            if (!$(this).val().trim()) {
                $(this).addClass('red-background');
                isValid = false;
            } else {
                $(this).removeClass('red-background');
            }
        });

        if (!isValid) {
            error.text('Необходимо заполнить поля: ');

            inputs.filter('.red-background').each(function () {
                const placeholder = $(this).prop('placeholder');
                error.append(`${placeholder} `);
            });
        }

        if (!validatePhoneNumber()) {
            isValid = false;
        }

        return isValid;
    }

    $('#phone').keypress(function (e) {
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    });

    addButton.click(function () {
        if (validateFields()) {
            const name = $('#name').val().trim();
            const surname = $('#surname').val().trim();
            const phone = $('#phone').val().trim();
            phoneNumbers.push(phone);
            const nextCellNumber = $('table.phone-book tr').length;

            $('table.phone-book').append(`
                <tr>
                    <td><input type="checkbox" class="checkboxes"></td>
                    <td class="number">${nextCellNumber}</td>
                    <td class="editable">${surname}</td>
                    <td class="editable">${name}</td>
                    <td class="editable">${phone}</td>
                    <td>
                        <button class="edit-btn"><img class="images" src="../images/edit.png" alt="Редактировать" title="Редактировать"></button>
                        <button class="remove-btn"><img class="images" src="../images/trash.png" alt="Удалить" title="Удалить"></button>
                    </td>
                </tr>
            `);

            $(".main-input").removeClass('red-background').val('');
            bindRemoveButtons();
            bindEditButtons();
        }
    });
});