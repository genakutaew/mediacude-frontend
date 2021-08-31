<template lang="pug">
.container
  .title Сетка
  .body
    table
      tr(v-for="row in intersectionDepartmentsAndEmployees")
        td(v-for="col in row") {{ col }}
</template>

<script>
import DepartmentApi from "@/api/DepartmentsApi";
import EmployeesApi from "@/api/EmployeesApi";

export default {
  data() {
    return {
      employees: [],
      departments: [],
      intersectionDepartmentsAndEmployees: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      Promise.all([DepartmentApi.index(), EmployeesApi.index()])
        .then((response) => {
          this.departments = response[0].data.departments;
          this.employees = response[1].data.employees;
          this.getIntersectionDepartmentsAndEmployees();
        })
        .catch((error) => {
          this.$toasted.error("Ошибка загрузки");
        });
    },
    getIntersectionDepartmentsAndEmployees() {
      for (let i = 0; i < this.employees.length; i++) {
        this.intersectionDepartmentsAndEmployees[i] = [];
        for (let j = 0; j < this.departments.length; j++) {
          if (
            this.employees[i].departments.some(
              (department) => department.id === this.departments[j].id
            ) &&
            this.departments[j].employees.some(
              (employee) => employee.id === this.employees[i].id
            )
          ) {
            this.intersectionDepartmentsAndEmployees[i][j] = "х";
          } else {
            this.intersectionDepartmentsAndEmployees[i][j] = "";
          }
        }
        this.intersectionDepartmentsAndEmployees[i].unshift(
          this.employees[i].first_name + " " + this.employees[i].middle_name
        );
      }
      this.intersectionDepartmentsAndEmployees.unshift([
        "",
        ...this.departments.map((department) => department.name),
      ]);
    },
  },
};
</script>


<style scoped lang="sass">
table
  border: 1px solid black
  border-collapse: collapse

td
  text-align: center
  border: 1px solid black

td:first-child
  text-align: left
</style>