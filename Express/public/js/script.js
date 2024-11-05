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
        async fetchContacts() {
            const response = await fetch('/api/contacts');
            this.contacts = await response.json();
        },

        async addInList() {
            this.validationErrors = [];
            if (!this.name.trim()) this.validationErrors.push("Необходимо заполнить поле «Имя».");
            if (!this.surname.trim()) this.validationErrors.push("Необходимо заполнить поле «Фамилия».");
            if (!this.phoneNumber.trim()) this.validationErrors.push("Необходимо заполнить поле «Номер телефона».");
            const duplicate = this.contacts.some(contact => contact.phoneNumber === this.phoneNumber);
            if (duplicate) this.validationErrors.push("Контакт с таким номером уже существует.");

            if (!this.validationErrors.length) {
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: this.name,
                        surname: this.surname,
                        phoneNumber: this.phoneNumber
                    })
                });

                const newContact = await response.json();
                this.contacts.push({ ...newContact, isEditing: false });
                this.name = this.surname = this.phoneNumber = '';
            }
        },

        editItem(index) {
            this.contacts[index].isEditing = true;
            this.contacts[index].originalData = { ...this.contacts[index] };
        },

        async saveItem(index) {
            const contact = this.contacts[index];
            const response = await fetch(`/api/contacts/${contact.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contact.name,
                    surname: contact.surname,
                    phoneNumber: contact.phoneNumber
                })
            });

            this.contacts[index] = await response.json();
            this.contacts[index].isEditing = false;
        },

        cancelItem(index) {
            this.contacts[index] = { ...this.contacts[index].originalData };
            this.contacts[index].isEditing = false;
            delete this.contacts[index].originalData;
        },

        async deleteContact(index) {
            const contact = this.contacts[index];
            await fetch(`/api/contacts/${contact.id}`, { method: 'DELETE' });
            this.contacts.splice(index, 1);
        },

        confirmDelete(index) {
            Swal.fire({
                title: 'Вы уверены?',
                text: 'Это действие нельзя отменить!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Да, удалить',
                cancelButtonText: 'Отмена'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteContact(index);
                }
            });
        },

        async deleteSelected() {
            for (let index of Array.from(this.selectedContacts).reverse()) {
                await this.deleteContact(index);
            }

            this.selectedContacts.clear();
            this.selectAll = false;
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
    },
    mounted() {
        this.fetchContacts();
    }
});

app.mount("#app");