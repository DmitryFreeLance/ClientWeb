const app = Vue.createApp({
    data() {
        return {
            name: '',
            surname: '',
            phoneNumber: '',
            contacts: [],
            filter: '',
            validationErrors: [],
            contactToDelete: null,
            selectedContacts: new Set(),
            selectAll: false
        };
    },
    computed: {
        filteredContacts() {
            const filterText = this.filter.toLowerCase();
            return this.contacts.filter(contact =>
                contact.name.toLowerCase().includes(filterText) ||
                contact.surname.toLowerCase().includes(filterText) ||
                contact.phoneNumber.toLowerCase().includes(filterText)
            );
        }
    },
    methods: {
        addInList() {
            this.validationErrors = [];
            if (!this.name.trim()) this.validationErrors.push("Необходимо заполнить поле «Имя».");
            if (!this.surname.trim()) this.validationErrors.push("Необходимо заполнить поле «Фамилия».");
            if (!this.phoneNumber.trim()) this.validationErrors.push("Необходимо заполнить поле «Номер телефона».");
            const duplicate = this.contacts.some(contact => contact.phoneNumber === this.phoneNumber);
            if (duplicate) this.validationErrors.push("Контакт с таким номером уже существует.");

            if (!this.validationErrors.length) {
                this.contacts.push({
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber,
                    isEditing: false
                });
                this.name = this.surname = this.phoneNumber = '';
            }
        },

        editItem(index) {
            this.contacts[index].originalName = this.contacts[index].name;
            this.contacts[index].originalSurname = this.contacts[index].surname;
            this.contacts[index].originalPhoneNumber = this.contacts[index].phoneNumber;

            this.contacts[index].isEditing = true;
        },

        saveItem(index) {
            if (!this.contacts[index].name.trim() || !this.contacts[index].surname.trim() || !this.contacts[index].phoneNumber.trim()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: 'Все поля должны быть заполнены перед сохранением!'
                });
                return;
            }

            this.contacts[index].isEditing = false;

            delete this.contacts[index].originalName;
            delete this.contacts[index].originalSurname;
            delete this.contacts[index].originalPhoneNumber;
        },

        cancelItem(index) {
            if (this.contacts[index].originalName !== undefined) {
                this.contacts[index].name = this.contacts[index].originalName;
                this.contacts[index].surname = this.contacts[index].originalSurname;
                this.contacts[index].phoneNumber = this.contacts[index].originalPhoneNumber;
            }

            this.contacts[index].isEditing = false;

            delete this.contacts[index].originalName;
            delete this.contacts[index].originalSurname;
            delete this.contacts[index].originalPhoneNumber;
        },

        confirmDelete(index) {
            Swal.fire({
                title: "Подтвердите удаление",
                text: "Вы действительно хотите удалить выбранные строки?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Да, удалить",
                cancelButtonText: "Отмена"
            }).then(result => {
                if (result.isConfirmed) {
                    if (index !== undefined) {
                        this.contacts.splice(index, 1);
                    } else {
                        this.contacts = this.contacts.filter((_, i) => !this.selectedContacts.has(i));
                        this.selectedContacts.clear();
                        this.selectAll = false;
                    }
                }
            });
        },

        deleteSelected() {
            if (this.selectedContacts.size > 0) this.confirmDelete();
        },

        toggleSelectAll() {
            this.selectAll = !this.selectAll;
            this.selectedContacts = new Set(
                this.selectAll ? this.filteredContacts.map((_, index) => index) : []
            );
        },

        applyFilter() {
            this.filter = this.filter.trim();
        },
        resetFilter() {
            this.filter = '';
        }
    }
});

app.mount("#app");