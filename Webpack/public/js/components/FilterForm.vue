<template>
  <form class="d-flex align-items-center mb-4 myForm" @submit.prevent="applyFilter">
    <input v-model="localFilter" type="text" class="form-control me-2 myFilter"
           placeholder="Введите текст для фильтрации" maxlength="30">
    <button type="button" @click="applyFilter" class="btn btn-primary btn-margin">Применить</button>
    <button type="button" @click="resetFilter" class="btn btn-primary">Сбросить</button>
  </form>
</template>

<script>
export default {
  props: {
    modelValue: String
  },
  data() {
    return {
      localFilter: this.modelValue
    };
  },
  watch: {
    localFilter(value) {
      this.$emit('update:modelValue', value);
    }
  },
  methods: {
    applyFilter() {
      this.$emit('apply-filter');
    },
    resetFilter() {
      this.localFilter = '';
      this.$emit('reset-filter');
    }
  }
};
</script>

<style scoped>
.myFilter {
  width: 100%;
}
</style>