<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">
        <input type="checkbox" class="main-checkbox" @click="toggleSelectAll" v-model="localSelectAll">
      </th>
      <th scope="col">#</th>
      <th scope="col">Фамилия</th>
      <th scope="col">Имя</th>
      <th scope="col">Номер телефона</th>
      <th scope="col" class="last-col">
        <button class="remove-btn-main" title="Удалить выбранные контакты" @click="deleteSelected">
          <img class="images" src="/images/trash.png" alt="удалить">
        </button>
      </th>
    </tr>
    </thead>
    <tbody class="table-group-divider">
    <tr v-for="(contact, index) in contacts" :key="index">
      <td>
        <input
            type="checkbox"
            :value="index"
            :checked="selectedContacts.includes(index)"
            @change="toggleContact(index)"
        >
      </td>
      <td>{{ index + 1 }}</td>
      <td v-if="!contact.isEditing">{{ contact.surname }}</td>
      <td v-else>
        <input v-model="contact.surname" type="text" class="form-control">
      </td>
      <td v-if="!contact.isEditing">{{ contact.name }}</td>
      <td v-else>
        <input v-model="contact.name" type="text" class="form-control">
      </td>
      <td v-if="!contact.isEditing">{{ contact.phoneNumber }}</td>
      <td v-else>
        <input v-model="contact.phoneNumber" type="text" class="form-control">
      </td>
      <td>
        <button v-if="!contact.isEditing" @click="editContact(index)" class="remove-btn-main">
          <img class="images" src="/images/edit.png" alt="редактировать">
        </button>
        <button v-if="contact.isEditing" @click="saveContact(index)" class="btn btn-sm btn-success btn-margin">
          Сохранить
        </button>
        <button v-if="contact.isEditing" @click="cancelEdit(index)" class="btn btn-sm btn-secondary">
          Отмена
        </button>
        <button v-if="!contact.isEditing" @click="confirmDelete(index)" class="remove-btn-main">
          <img class="images" src="/images/trash.png" alt="удалить">
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    contacts: Array,
    selectedContacts: Set,
    selectAll: Boolean
  },
  data() {
    return {
      localSelectAll: this.selectAll
    };
  },
  watch: {
    localSelectAll(value) {
      this.$emit('toggle-select-all', value);
    }
  },
  methods: {
    editContact(index) {
      this.$emit('edit-contact', index);
    },
    saveContact(index) {
      this.$emit('save-contact', index);
    },
    cancelEdit(index) {
      this.$emit('cancel-edit', index);
    },
    confirmDelete(index) {
      this.$emit('confirm-delete', index);
    },
    deleteSelected() {
      this.$emit('delete-selected');
    },
    toggleSelectAll() {
      this.localSelectAll = !this.localSelectAll;
      this.$emit('toggle-select-all');
    },
    toggleContact(index) {
      if (this.selectedContacts.includes(index)) {
        this.selectedContacts = this.selectedContacts.filter(i => i !== index);
      } else {
        this.selectedContacts.push(index);
      }
    }
  }
};
</script>

<style scoped>
.main-checkbox {
  cursor: pointer;
}
.remove-btn-main img {
  width: 20px;
  height: 20px;
}
</style>