<template>
  <div class="container">
    <h1 class="header">Телефонная Книга Vue</h1>

    <ContactForm
        @add-contact="addInList"
        :validation-errors="validationErrors"
    />

    <FilterForm
        @apply-filter="applyFilter"
        @reset-filter="resetFilter"
        v-model="filter"
    />

    <ContactTable
        :contacts="filteredContacts"
        :selected-contacts="selectedContacts"
        :select-all="selectAll"
        @toggle-select-all="toggleSelectAll"
        @delete-selected="deleteSelected"
        @edit-contact="editItem"
        @save-contact="saveItem"
        @cancel-edit="cancelItem"
        @confirm-delete="confirmDelete"
    />
  </div>
</template>

<script>
import ContactForm from './ContactForm.vue';
import FilterForm from './FilterForm.vue';
import ContactTable from './ContactTable.vue';

export default {
  components: {
    ContactForm,
    FilterForm,
    ContactTable
  },
  data() {
    return {
      name: '',
      surname: '',
      phoneNumber: '',
      contacts: [],
      filter: '',
      validationErrors: [],
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

    async addInList(contact) {
      this.validationErrors = [];
      if (!contact.name.trim()) this.validationErrors.push("Необходимо заполнить поле «Имя».");
      if (!contact.surname.trim()) this.validationErrors.push("Необходимо заполнить поле «Фамилия».");
      if (!contact.phoneNumber.trim()) this.validationErrors.push("Необходимо заполнить поле «Номер телефона».");

      const duplicate = this.contacts.some(existingContact => existingContact.phoneNumber === contact.phoneNumber);
      if (duplicate) this.validationErrors.push("Контакт с таким номером уже существует.");

      if (!this.validationErrors.length) {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(contact)
        });

        const newContact = await response.json();
        this.contacts.push({...newContact, isEditing: false});
      }
    },

    editItem(index) {
      this.contacts[index].isEditing = true;
      this.contacts[index].originalData = {...this.contacts[index]};
    },

    async saveItem(index) {
      const contact = this.contacts[index];
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
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
      this.contacts[index] = {...this.contacts[index].originalData};
      this.contacts[index].isEditing = false;
      delete this.contacts[index].originalData;
    },

    async deleteContact(index) {
      const contact = this.contacts[index];
      await fetch(`/api/contacts/${contact.id}`, {method: 'DELETE'});
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
};
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  margin: auto;
}

.header {
  color: #42b983;
  text-align: center;
}
</style>