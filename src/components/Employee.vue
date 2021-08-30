<template lang="pug">
  .container
    .title
      span {{ employee.first_name }} &nbsp
      span {{ employee.middle_name }} &nbsp
      span {{ employee.last_name }} &nbsp
    .title
      span(v-for="department in employee.departments") {{ department.name }} &nbsp
</template>

<script>
import EmployeesApi from '@/api/EmployeesApi'

export default {
  props: {
    employee: {
      type: Object,
      default: () => {}
    }
  },
}
</script>