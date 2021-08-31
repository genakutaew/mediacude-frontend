<template lang="pug">
.container
  .title Отделы
  hr
  .body
    button(@click="toggleModal") Создать новый отдел
    create-or-edit-department-modal(
      v-if="isOpenModal",
      @handleSave="handleSave"
    )
    hr
    template(v-for="(department, index) in departments")
      department(
        :department="department",
        :key="index",
        @handleUpdate="handleUpdate",
        @handleRemove="handleRemove"
      )
      hr(v-if="index !== departments.length - 1")
</template>

<script>
import DepartmentApi from "@/api/DepartmentsApi";
import Department from "@/components/Department";
import CreateOrEditDepartmentModal from "@/components/CreateOrEditDepartmentModal";

export default {
  data() {
    return {
      departments: [],
      isOpenModal: false,
    };
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    toggleModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    handleSave(department) {
      this.departments.push(department);
      this.isOpenModal = false;
    },
    handleUpdate(department) {
      let departmentIndex = this.departments.findIndex(
        (dep) => dep.id == department.id
      );
      this.departments[departmentIndex] = department;
    },
    handleRemove(id) {
      this.departments.splice(
        this.departments.findIndex((department) => department.id === id),
        1
      );
    },
    getDepartments() {
      DepartmentApi.index()
        .then((response) => {
          this.departments = response.data.departments;
        })
        .catch((error) => {
          this.$toasted.error("Ошибка загрузки отделов");
        });
    },
  },
  components: {
    Department,
    CreateOrEditDepartmentModal,
  },
};
</script>