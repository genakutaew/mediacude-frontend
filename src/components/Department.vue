<template lang="pug">
.container
  .title Имя: {{ department.name }}
  .title Количество сотрудников: {{ department.employees_count }}
  .title Максимальная зп: {{ department.max_salary }}
  button(@click="toggleModal") Редактировать
  button(@click="handleRemove") Удалить
  create-or-edit-department-modal(
    v-if="isOpenModal",
    @handleUpdate="handleUpdate",
    :department="department"
  )
</template>

<script>
import DepartmentApi from "@/api/DepartmentsApi";
import CreateOrEditDepartmentModal from "@/components/CreateOrEditDepartmentModal";

export default {
  props: {
    department: {
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
    handleUpdate(department) {
      this.$emit("handleUpdate", department);
      this.isOpenModal = false;
    },
    handleRemove() {
      DepartmentApi.destroy(this.department.id)
        .then((response) => {
          if(response.data.status){
            this.$emit("handleRemove", this.department.id);
          }else{
            this.$toasted.error("Нельзя удалить не пустой отдел");
          }
        })
        .catch((error) => {
          this.$toasted.error("Не удалось удалить отдел");
        });
    },
  },
  components: {
    CreateOrEditDepartmentModal,
  },
};
</script>