<template lang="pug">
  #app
    .navbar
      router-link(to="/") Сетка
      | &nbsp|&nbsp
      router-link(to="/employees") Сотрудники
      | &nbsp|&nbsp
      router-link(to="/departments") Отделы
    .container
      router-view
</template>

<style lang="sass">
#app
  width: 1200px
  margin: 0 auto
.container
  margin-top: 24px
</style>