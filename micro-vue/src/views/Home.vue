<template>
  <div>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      name: "xxx",
    };
  },
  mounted() {
    console.log(this.$route.query.info);
  },
};
</script>

<style></style>
