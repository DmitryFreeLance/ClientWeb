$(function(){
    const addButton = $('.add-btn');
    const numbers = [];
    const applyFilterButton = $('.apply-filter-btn');
    const resetFilterButton = $('.reset-filter-btn');
    const filterInput = $('#filter-input');

    function applyFilter() {
        const filterText = filterInput.val().toLowerCase();

        $('tr:gt(0)').each(function() {
            const rowText = $(this).text().toLowerCase();

            if (rowText.includes(filterText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function resetFilter() {
        filterInput.val('');
        $('table tr').show();
    }

    applyFilterButton.click(function() {
        applyFilter();
    });

    resetFilterButton.click(function() {
        resetFilter();
    });

    function findRemoveButtons(){
        const mainRemoveButton = $('.remove-btn-main')
        const removeButtons = $('.remove-btn');
        const mainCheckBox = $('.main-checkbox')

        removeButtons.each(function () {
            $(this).click(function () {
                const row = $(this).parents('tr');

                $( "#dialog-confirm" ).dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            row.remove();
                            cellsReWrite();
                            $(this).dialog("close");
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            })
        });

        mainCheckBox.click(function(){
            const isChecked = $(this).prop('checked');
            $('input[type="checkbox"]').prop('checked', isChecked);
        })

        mainRemoveButton.click(function () {
            $("#dialog-confirm").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Удалить": function () {
                        const checkedCheckBoxLines = $(".checkboxes:checked").map(function () {
                            return $(this).closest('tr');
                        }).get();
                        checkedCheckBoxLines.forEach(function (line) {
                            line.remove();
                        });

                        cellsReWrite();
                        $(this).dialog("close");
                    },
                    "Отменить": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
    };

    function findEditButtons() {
        const editButtons = $('.edit-btn');

        editButtons.each(function() {
            $(this).click(function() {
                const currentRow = $(this).closest('tr');
                const textElements = currentRow.find(".mayChange");
                const originalText = textElements.text();

                const originalTexts = [];

                textElements.each(function() {
                    const originalText = $(this).text();
                    originalTexts.push(originalText);
                    $(this).html(`<input type="text" class="temp" value="${originalText}" maxlength="18">`);
                });

                $('.temp:last').keypress(function(e){
                    if(e.key < '0' || e.key > '9'){
                        e.preventDefault();
                    }
                })

                $(this).replaceWith(`
                <button class="save-btn">Сохранить</button>
                <button class="cancel-btn">Отменить</button>
            `);

                const saveButton = currentRow.find(".save-btn");
                const cancelButton = currentRow.find(".cancel-btn");

                saveButton.click(function(){
                    const newTexts = [];

                    textElements.each(function(index){
                        const newText = $(this).find('input').val();
                        newTexts.push(newText);
                    })

                    textElements.each(function(index){
                        $(this).text(newTexts[index]);
                    })

                    cancelButton.replaceWith(`<button class="edit-btn"><img class="images" src="edit.png" alt="picture"></button>`)
                    saveButton.remove();
                    findEditButtons();
                })

                cancelButton.click(function(){
                    textElements.each(function(index) {
                        $(this).text(originalTexts[index]);
                    });

                    cancelButton.replaceWith(`<button class="edit-btn"><img class="images" src="edit.png" alt="picture"></button>`)
                    saveButton.remove();
                    findEditButtons();
                })
            });
        });
    }

    function cellsReWrite(){
        const number = $('.number');
        let nextCellNumber = 1;

        number.each(function(){
            $(this).text(nextCellNumber);
            nextCellNumber++;
        })
    };

    addButton.click(function(){
        if(checkValidation()){
            const error = $('.error-msg');
            const errorPhone = $('.error-phone-msg');
            const name = $('#name').val();
            const surname = $('#surname').val();
            const phone = $('#phone').val();
            numbers.push(phone);
            const cell = $('table');
            const inputs = $(".main-input");
            const nextCellNumber = $('tr').length;

            error.text('');
            errorPhone.text('');

            $(inputs).removeClass('red-background').val('');

            $(cell).append(`<tr class="text"> <td><input type="checkbox" class="checkboxes"></td> <td class="number">${nextCellNumber}</td> <td class="mayChange">${surname}</td> <td class="mayChange">${name}</td> <td class="mayChange">${phone}</td> <td><button class="edit-btn"><img class="images" src="edit.png" alt="picture"></button><button class="remove-btn"><img class="images" src="trash.png" alt="picture"></button></td> </tr>`);
            findRemoveButtons();
            findEditButtons();
        }
    });

    function checkNumber(){
        let valid = true;
        const errorPhone = $('.error-phone-msg');
        const phone = $("#phone").val();

        if(numbers.includes(phone)){
            errorPhone.text('Такой номер телефона уже существует');
            $("#phone").addClass('red-background');
            valid = false;
        }

        return valid;
    }

    function checkValidation(){
        let valid = true;
        const inputs = $(".main-input");
        const error = $('.error-msg');
        const errorPhone = $('.error-phone-msg');
        const phone = $('#phone').val().trim();

        error.text('');
        errorPhone.text('');

        $(inputs).each(function(){
            if($(this).val().trim() == ''){
                $(this).addClass('red-background');
                valid = false;
            }
            else {
                $(this).removeClass('red-background');
            }
        })

        if (!valid) {
            error.text('Необходимо заполнить поля: ');

            const redInputs = $(".red-background");

            $(redInputs).each(function() {
                const placeholder = $(this).attr('placeholder');
                error.append(`${placeholder} `);
            });
        }

        if(phone.length < 11){
            valid = false;
            errorPhone.text('Неверный формат номера телефона. Введите в формате: 79512220053');
            $("#phone").addClass('red-background');
        } else {
            $("#phone").removeClass('red-background');
        }

        if(!checkNumber()){
            valid = false;
        }

        return valid;
    };

    $('#phone').keypress(function(e){
        if(e.key < '0' || e.key > '9'){
            e.preventDefault();
        }
    })
});