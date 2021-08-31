<template lang="pug">
.container
  .title Сотрудники
  .body
    button(@click="toggleModal") Создать нового сотрудника
    create-or-edit-employee-modal(v-if="isOpenModal", @handleSave="handleSave")
    hr
    employee(
      v-for="(employee, index) in employees",
      :employee="employee",
      :key="index",
      @handleUpdate="handleUpdate",
      @handleRemove="handleRemove"
    )
</template>

<script>
import EmployeesApi from "../api/EmployeesApi";
import Employee from "@/components/Employee";
import CreateOrEditEmployeeModal from "@/components/CreateOrEditEmployeeModal";

export default {
  data() {
    return {
      employees: [],
      isOpenModal: false,
    };
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    toggleModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    handleSave(employee) {
      this.isOpenModal = false;
      this.employees.push(employee);
    },
    handleUpdate(employee){
      let employeeIndex = this.employees.findIndex(
        (emp) => emp.id == employee.id
      );
      this.employeess[employeeIndex] = employee;
    },
    handleRemove(id){
      this.employees.splice(
        this.employees.findIndex((employee) => employee.id === id),
        1
      );
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
  components: {
    Employee,
    CreateOrEditEmployeeModal,
  },
};
</script>