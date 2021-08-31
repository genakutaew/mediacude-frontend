<template lang="pug">
.container
  .title
    .title Имя: {{ employee.first_name }}
    .title Фамилия: {{ employee.middle_name }}
    .title Отчество: {{ employee.last_name }}
    .title Пол: {{ employee.gender | genderToText }}
    .title Зп: {{ employee.salary }}
    .title Отделы:&nbsp
      span(v-for="(department, index) in employee.departments") {{ department.name + (index === employee.departments.length - 1 ? '.' : ', ') }}
  button(@click="toggleModal") Редактировать
  button(@click="handleRemove") Удалить
  create-or-edit-employee-modal(
    v-if="isOpenModal",
    @handleUpdate="handleUpdate",
    :employee="employee"
  ) 
</template>

<script>
import EmployeesApi from "@/api/EmployeesApi";
import CreateOrEditEmployeeModal from "@/components/CreateOrEditEmployeeModal";

export default {
  props: {
    employee: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isOpenModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    handleUpdate(employee) {
      this.$emit("handleUpdate", employee);
      this.isOpenModal = false;
    },
    handleRemove() {
      EmployeesApi.destroy(this.employee.id)
        .then((response) => {
          this.$emit("handleRemove", this.employee.id);
        })
        .catch((error) => {
          this.$toasted.error("Не удалось удалить сотрудника");
        });
    },
  },
  filters: {
    genderToText(val) {
      switch (val) {
        case "male":
          return "Мужчина";
        case "female":
          return "Женщина";
      }
    },
  },
  components: {
    CreateOrEditEmployeeModal,
  },
};
</script>