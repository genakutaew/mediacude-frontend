<template lang="pug">
  .container
    .title Сотрудники
    .body
      employee(v-for="(employee, index) in employees" :employee="employee" :index="index")
</template>

<script>
import EmployeesApi from "../api/EmployeesApi";
import Employee from '@/components/Employee'

export default {
  components: {Employee},
  data() {
    return {
      employees: []
    }
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      EmployeesApi.index()
          .then(response => {
            this.employees = response.data.employees
          })
          .catch(error => {
            this.$toasted.error('Ошибка загрузки сотрудников')
          })
    }
  }
}
</script>