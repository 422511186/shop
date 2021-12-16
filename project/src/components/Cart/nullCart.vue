<template>
<div class="flex">
  <img src="../../assets/空购物车.svg" alt="">
  <div class="txt">
    购物车是空的
  </div>
</div>
</template>

<script>
export default {
name: "nullCart"
}
</script>

<style scoped>
.flex{
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  font-size: 1.4rem;
}
.txt{
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bbb;
}
</style>
