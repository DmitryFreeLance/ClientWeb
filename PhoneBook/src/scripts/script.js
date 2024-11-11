$(function () {
    const addButton = $('.add-btn');
    const phoneNumbers = [];
    const applyFilterButton = $('.apply-filter-btn');
    const resetFilterButton = $('.reset-filter-btn');
    const filterInput = $('.filter-input');
    const mainRemoveButton = $('.remove-btn-main');
    const mainCheckBox = $('.main-checkbox'); // Главный чекбокс

    mainRemoveButton.hide();

    function applyFilter() {
        const filterText = filterInput.val().toLowerCase();

        $('table.phone-book tbody tr').each(function () {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.includes(filterText));
        });

        toggleRemoveButton();
    }

    function resetFilter() {
        filterInput.val('');
        $('table.phone-book tbody tr').show();
        toggleRemoveButton();
    }

    function toggleRemoveButton() {
        mainRemoveButton.toggle($('.checkboxes:checked:visible').length > 0);
    }

    mainCheckBox.on('change', function () {
        const isChecked = $(this).prop('checked');
        $('.checkboxes').prop('checked', isChecked);
        toggleRemoveButton();
    });

    $(document).on('change', '.checkboxes', toggleRemoveButton);

    applyFilterButton.click(applyFilter);
    resetFilterButton.click(resetFilter);

    function bindRemoveButtons() {
        $('.remove-btn').off('click').on('click', function () {
            const row = $(this).closest('tr');
            const phone = row.find('td:nth-child(5)').text().trim();

            $(".dialog-confirm").dialog({
                resizable: false,
                height: 'auto',
                width: 400,
                modal: true,
                buttons: {
                    'Удалить'() {
                        phoneNumbers.splice(phoneNumbers.indexOf(phone), 1);
                        row.remove();
                        updateRowNumbers();
                        toggleRemoveButton();
                        $(this).dialog('close');
                    },
                    'Отменить'() {
                        $(this).dialog('close');
                    }
                }
            });
        });

        mainRemoveButton.click(function () {
            const selectedRows = $('.checkboxes:checked').closest('tr:visible');

            if (selectedRows.length > 0) {
                $(".dialog-confirm-much").dialog({
                    resizable: false,
                    height: 'auto',
                    width: 400,
                    modal: true,
                    buttons: {
                        'Удалить'() {
                            selectedRows.each(function () {
                                const phone = $(this).find('td:nth-child(5)').text().trim();
                                phoneNumbers.splice(phoneNumbers.indexOf(phone), 1);
                                $(this).remove();
                            });
                            updateRowNumbers();
                            $(this).dialog('close');
                            toggleRemoveButton();
                        },
                        'Отменить'() {
                            $(this).dialog('close');
                        }
                    }
                });
            }
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

        if (!phone) {
            $('#phone').addClass('red-background');
            return false;
        }

        if (phoneNumbers.includes(phone)) {
            errorPhone.text('Такой номер телефона уже существует');
            $('#phone').addClass('red-background');
            return false;
        }

        $('#phone').removeClass('red-background');
        errorPhone.text('');
        return true;
    }

    function validateFields() {
        let isValid = true;
        const inputs = $('.main-input');
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

            inputs.filter('.red-background').each(function (index) {
                const placeholder = $(this).prop('placeholder');
                error.append((index === inputs.filter('.red-background').length - 1) ? `${placeholder}. ` : `${placeholder}, `);
            });
        }

        if (!validatePhoneNumber()) {
            return false;
        }

        return isValid;
    }

    $('#phone').keypress(function (e) {
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    });

    addButton.click(function () {
        if (!validateFields()) return;

        const name = $('#name').val().trim();
        const surname = $('#surname').val().trim();
        const phone = $('#phone').val().trim();

        phoneNumbers.push(phone);
        const nextCellNumber = $('table.phone-book tbody tr').length + 1;

        $('table.phone-book tbody').append(`
            <tr>
                <td><input type='checkbox' class="checkboxes"></td>
                <td class='number'>${nextCellNumber}</td>
                <td class='editable'>${surname}</td>
                <td class='editable'>${name}</td>
                <td class='editable'>${phone}</td>
                <td>
                    <button class='edit-btn'><img class='images' src='../images/edit.png' alt='Редактировать' title='Редактировать'></button>
                    <button class='remove-btn'><img class='images' src='../images/trash.png' alt='Удалить' title='Удалить'></button>
                </td>
            </tr>
        `);

        $(".main-input").removeClass('red-background').val('');
        bindRemoveButtons();
        bindEditButtons();
    });

    function bindEditButtons() {
        $('.edit-btn').off('click').on('click', function () {
            const row = $(this).closest('tr');
            const cells = row.find('.editable');
            const originalValues = cells.map(function () {
                return $(this).text().trim();
            }).get();

            const originalPhone = originalValues[2];
            const phoneIndex = phoneNumbers.indexOf(originalPhone);

            if (phoneIndex > -1) phoneNumbers.splice(phoneIndex, 1);

            cells.each(function () {
                const cell = $(this);
                cell.html(`<input type="text" class="edit-input" value="${cell.text()}">`);
            });

            $(this).replaceWith(`
                <button class='save-btn'>Сохранить</button>
                <button class='cancel-btn'>Отменить</button>
            `);

            $('.save-btn').on('click', function () {
                const newValues = cells.map(function () {
                    return $(this).find('.edit-input').val().trim();
                }).get();

                const newPhone = newValues[2];

                if (newPhone !== originalPhone && phoneNumbers.includes(newPhone)) {
                    alert('Такой номер телефона уже существует');
                    return;
                }

                phoneNumbers.push(newPhone);

                cells.each(function (index) {
                    $(this).text(newValues[index]);
                });

                $(this).siblings('.cancel-btn').remove();
                $(this).replaceWith(`<button class='edit-btn'><img class='images' src='../images/edit.png' alt='Редактировать' title='Редактировать'></button>`);
                bindEditButtons();
            });

            $('.cancel-btn').on('click', function () {
                cells.each(function (index) {
                    $(this).text(originalValues[index]);
                });

                phoneNumbers.push(originalPhone);

                $(this).siblings('.save-btn').remove();
                $(this).replaceWith(`<button class='edit-btn'><img class='images' src='../images/edit.png' alt='Редактировать' title='Редактировать'></button>`);
                bindEditButtons();
            });
        });
    }

    bindRemoveButtons();
    bindEditButtons();
});