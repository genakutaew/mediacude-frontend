
<template lang="pug">
.container
  input(type="text", v-model="formData.name", placeholder="Название отдела")
  button(@click="handleSubmit") Сохранить
</template>

<script>
import DepartmentApi from "@/api/DepartmentsApi";

export default {
  props: {
    department: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isEditing: false,
      formData: {
        id: null,
        name: "",
      },
    };
  },
  mounted() {
    if (this.department?.id) {
      this.isEditing = true;
      this.formData = this.department;
    } else {
      this.isEditing = false;
    }
  },
  methods: {
    handleSubmit() {
      let method = this.isEditing
        ? DepartmentApi.update(this.formData.id, this.formData)
        : DepartmentApi.store(this.formData);

      method
        .then((response) => {
          if (this.isEditing) {
            this.$emit("handleUpdate", response.data.department);
          } else {
            this.$emit("handleSave", response.data.department);
          }
        })
        .catch((error) => {
          error.response.data.errors.name.forEach((error) => {
            this.$toasted.error(error);
          });
        });
    },
  },
};
</script>