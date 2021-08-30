<template lang="pug">
  .container
    .title {{ department.name }}
    .title {{ department.employees_count }}
    .title {{ department.max_salary }}
</template>

<script>
import DepartmentApi from '@/api/DepartmentsApi'

export default {
  props: {
    department: {
      type: Object,
      default: () => {}
    }
  },
}
</script>