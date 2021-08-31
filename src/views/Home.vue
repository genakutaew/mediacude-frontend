<template lang="pug">
.container
  .title Сетка
  .body
    .table
      .row(v-for="employee in employees")
        .col {{ employee.first_name + ' ' + employee.middle_name }}
</template>

<script>
import DepartmentApi from "@/api/DepartmentsApi";
import EmployeesApi from "@/api/EmployeesApi";

export default {
  data() {
    return {
      employees: [],
      departments: [],
    };
  },
  mounted() {
    this.getEmployees();
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      DepartmentApi.index()
        .then((response) => {
          this.departments = response.data.departments;
        })
        .catch((error) => {
          this.$toasted.error("Ошибка загрузки отделов");
        });
    },
    getEmployees() {
      EmployeesApi.index()
        .then((response) => {
          this.employees = response.data.employees;
        })
        .catch((error) => {
          this.$toasted.error("Ошибка загрузки сотрудников");
        });
    },
  },
};
</script>


<style scoped lang="sass">
</style>