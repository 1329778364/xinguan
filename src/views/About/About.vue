<template>
  <div class="About">
    <my-commponent v-model="title" @change="father" />
    <button v-on:click="add">ADD</button>
    <!--    <div>{{ $store.state.count }}</div>-->
  </div>
</template>

<script>
import myCommponent from "../../components/myCommponent/myCommponent";
export default {
  name: "About",
  components: {
    myCommponent
  },
  data() {
    return {
      title: []
    };
  },
  methods: {
    add() {
      // this.title.push(10);
      // console.log(this.title);
      this.$store.commit("increment");
      this.title.push(this.$store.state.count);
    },
    father(event) {
      console.log("度组件接收子组件");
      console.log(this.$store.state.count);
    }
  }
};
</script>

<style scoped></style>
