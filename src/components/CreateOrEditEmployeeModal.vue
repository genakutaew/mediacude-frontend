
<template lang="pug">
.container
  input(type="text", v-model="formData.first_name", placeholder="Имя")
  br
  input(type="text", v-model="formData.middle_name", placeholder="Фамилия")
  br
  input(type="text", v-model="formData.last_name", placeholder="Отчество")
  br
  multiselect(
    :options="genderOptions",
    label="name",
    v-model="formData.gender",
    :allow-empty="false",
    placeholder="Выберите пол",
    track-by="type"
  )
  input(type="text", v-model="formData.salary", placeholder="Зп")
  br 
  multiselect(
    :options="departmentsOptions",
    label="name",
    :multiple="true",
    :close-on-select="false",
    v-model="formData.departments",
    :allow-empty="false",
    placeholder="Выберите отделы",
    track-by="id"
  )
  button(@click="handleSubmit") Сохранить
</template>

<script>
import DepartmentApi from "@/api/DepartmentsApi";
import EmployeesApi from "@/api/EmployeesApi";

export default {
  props: {
    employee: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isEditing: false,
      genderOptions: [
        { type: "male", name: "Мужчина" },
        { type: "female", name: "Женщина" },
      ],
      departmentsOptions: [],
      formData: {
        id: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        salary: "",
        departments: [],
      },
    };
  },
  mounted() {
    if (this.employee?.id) {
      this.isEditing = true;
      this.formData = this.employee;
      this.formData.gender = this.genderOptions.find(option=>option.type === this.formData.gender)
    } else {
      this.isEditing = false;
    }
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      DepartmentApi.index()
        .then((response) => {
          this.departmentsOptions = response.data.departments;
        })
        .catch((error) => {
          this.$toasted.error("Ошибка загрузки отделов");
        });
    },
    handleSubmit() {
      this.formData.gender = this.formData.gender.type;
      this.formData.departments_ids = this.formData.departments.map(
        (department) => department.id
      );

      let method = this.isEditing
        ? EmployeesApi.update(this.formData.id, this.formData)
        : EmployeesApi.store(this.formData);

      method
        .then((response) => {
          if (this.isEditing) {
            this.$emit("handleUpdate", response.data.employee);
          } else {
            this.$emit("handleSave", response.data.employee);
          }
        })
        .catch((error) => {
          Object.values(error.response.data.errors).forEach((errorsField) => {
            errorsField.forEach((err) => {
              this.$toasted.error(err);
            });
          });
        });
    },
  },
};
</script>