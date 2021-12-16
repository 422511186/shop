<template>
  <div id="opp">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$router.push('/main')
  }
}
</script>

<style>
#opp{
  height: 100%;
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
</style>
