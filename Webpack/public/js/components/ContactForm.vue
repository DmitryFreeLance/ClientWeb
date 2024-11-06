<template>
  <div>
    <div v-if="validationErrors.length" class="alert alert-danger">
      <ul>
        <li v-for="error in validationErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <form class="d-flex align-items-center mb-4 myForm" @submit.prevent="onSubmit">
      <input v-model="name"
             :class="{ 'error-border': validationErrors.includes('Необходимо заполнить поле «Имя».') }"
             type="text" class="form-control me-2" placeholder="Имя" maxlength="30">
      <input v-model="surname"
             :class="{ 'error-border': validationErrors.includes('Необходимо заполнить поле «Фамилия».') }"
             type="text" class="form-control me-2" placeholder="Фамилия" maxlength="30">
      <input v-model="phoneNumber"
             :class="{ 'error-border': validationErrors.includes('Необходимо заполнить поле «Номер телефона».') }"
             type="text" class="form-control me-2" placeholder="Номер телефона" maxlength="20">
      <button type="submit" class="btn btn-primary">Добавить</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    validationErrors: Array
  },
  data() {
    return {
      name: '',
      surname: '',
      phoneNumber: ''
    };
  },
  methods: {
    onSubmit() {
      this.$emit('add-contact', {
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNumber
      });

      this.name = '';
      this.surname = '';
      this.phoneNumber = '';
    }
  }
};
</script>

<style scoped>
.error-border {
  border: 1px solid #ff0000ff;
}
</style>