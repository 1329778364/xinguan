<template>
  <div class="content">
    <show-video-canvas @change="getUserList" />
    <div class="userInfoClassify">
      <get-user-pic
        v-bind:userlist="userlist.ConversUserList"
        :ctx="ctx"
        title="患者"
      />
      <get-user-pic
        v-bind:userlist="userlist.closedUsersList"
        :ctx="ctx"
        title="密切"
      />
      <get-user-pic
        v-bind:userlist="userlist.undefinUserList"
        :ctx="ctx"
        title="未定义"
      />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import getUserPic from "../getUserPic/getUserPic";
import showVideoCanvas from "../showVideoCanvas/showVideoCanvas";
export default {
  name: "Process",
  components: {
    getUserPic,
    showVideoCanvas
  },
  data() {
    return {
      ctx: null,
      userlist: {
        ConversUserList: null,
        closedUsersList: null, // 密切接触者
        undefinUserList: null // 未定义用户
      }
    };
  },
  mounted() {},
  methods: {
    getUserList(value) {
      $(".users").empty();

      this.ctx = value["ctx"];
      Object.keys(value["usersList"]).forEach(key => {
        this.userlist[key] = value["usersList"][key];
      });
      // console.log("父组件处理后的数据", this.userlist);
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 10px;
  display: flex;
  vertical-align: baseline;
  justify-content: space-between;
}
</style>
