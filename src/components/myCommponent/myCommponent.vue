<template>
  <div class="myCommponent">
    <div class="title-class" v-for="item in title">{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: "myCommponent",
  model: {
    prop: "title", //指向props的参数名
    event: "change" //事件名称
  },
  props: {
    title: Array
  },
  data() {
    return {};
  },
  watch: {
    //监听值变化，再赋值给modelVal
    title(value) {
      console.log("监听到title变化，更新DOM", value);
      let myCommponent = document.querySelector(".myCommponent");
      let div = document.createElement("div");
      div.innerText = value;
      myCommponent.appendChild(div);

      this.$emit("change", value);
    }
  }
};
</script>

<style scoped>
@import "./_myCommponent.scss"; /*引入公共样式*/
</style>
