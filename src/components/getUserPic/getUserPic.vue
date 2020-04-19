<template>
  <div class="getUserPic">
    <h3>{{ title }}</h3>
    <div class="users" ref="usersHead1"></div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: {
    userlist: Array,
    title: String,
    ctx: Object
  },
  watch: {
    userlist(value) {
      // this.$refs.usersHead;
      // console.log("子组件监听到数据变化， 接收到的数据", value); // 是一个数组
      value.forEach(userLocal => {
        // console.log("每个用户的local信息", userLocal);
        this.drawCanvasPic(userLocal);
      });
    }
  },
  data() {
    return {
      canva_box: null
    };
  },
  mounted() {
    this.canva_box = this.$refs.usersHead1;
    // this.canva_box_2 = this.$refs.usersHead2;
    // this.canva_box_2 = this.$refs.usersHead3;
  },
  methods: {
    drawCanvasPic(location) {
      // if (this.undefinUserList.length === 0 || canva_items.length === 0) return;
      let canva = document.createElement("canvas");
      canva.style.height = 100 + "px";
      canva.style.width = 100 + "px";
      let canva_contex = canva.getContext("2d");
      canva_contex.drawImage(
        this.ctx.content,
        location["left"] - 50,
        location["top"] - 50,
        location["width"] + 100,
        location["height"] + 100,
        0,
        0,
        location["width"] + 100,
        location["height"] + 100
      );
      this.canva_box.appendChild(canva);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./_getUserPic.scss"; /*引入公共样式*/
</style>
