<template lang="pug">
  .container
    .title Отделы
    .body
      department(v-for="(department, index) in departments" :department="department" :index="index")
</template>

<script>
import DepartmentApi from '@/api/DepartmentsApi'
import Department from '@/components/Department'

export default {
  components: {Department},
  data() {
    return {
      departments: []
    }
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      DepartmentApi.index()
          .then(response => {
            this.departments = response.data.departments
          })
          .catch(error => {
            this.$toasted.error('Ошибка загрузки отделов')
          })
    }
  }
}
</script>