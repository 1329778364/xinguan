<template>
  <div class="showVideoCanvas">
    <div class="show-head">
      <div class="video-box">
        <video id="video" autoplay="autoplay" @click="openMedia" />
        <img
          @click="openMedia"
          v-show="showaction"
          class="action-img"
          src="../../../src/assets/img/icons/action.png"
          alt
        />
      </div>
      <canvas id="canvas" width="640px" height="360px" />
      <canvas id="canvas-copy" width="640px" height="360px" />
    </div>
  </div>
</template>

<script>
import { detectFace, search } from "../../common/processface";
// import { search, detect } from "../../common/sdkprocess";
export default {
  props: {},
  data() {
    return {
      takePicInterval: null,
      mediaStreamTrack: null, // 视频对象(全局)
      video: "",
      canvas: "",
      canvas_copy: "",
      ctx: "",
      ctx_copy: "",
      stopCapture: "",
      showaction: [],
      usersList: {
        ConversUserList: [], // 患者数据
        closedUsersList: [], // 密切接触者
        undefinUserList: [] // 未定义用户
      }
    };
  },

  mounted() {
    this.canvas = document.getElementById("canvas");
    this.canvas_copy = document.getElementById("canvas-copy");
    this.video = document.getElementById("video");
    this.ctx = this.canvas.getContext("2d");
    this.ctx_copy = this.canvas_copy.getContext("2d");
  },
  methods: {
    openMedia() {
      if (this.showaction) {
        this.showaction = false;
      } else {
        this.showaction = true;
        this.closeMedia();
        return;
      }
      // 想要获取一个最接近 1280x720 的相机分辨率
      var constraints = { audio: false, video: { width: 1280, height: 720 } };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(mediaStream => {
          video.srcObject = mediaStream;
          this.mediaStreamTrack = mediaStream.getTracks();

          video.onloadedmetadata = () => {
            video.play();
          };
          this.stopCapture = false;
          this.takePhoto();
        })
        .catch(err => {
          console.log(err.name + ": " + err.message);
        });
    },

    // 拍照
    takePhoto() {
      //获得Canvas对象
      this.ctx.drawImage(this.video, 0, 0, 640, 360);
      let srcImg = document.getElementById("canvas").toDataURL();
      // 这里的img就是得到的图片
      let postImg = srcImg.replace("data:image/png;base64,", "");
      Promise.all([search(postImg), detectFace(postImg)])
        .then(
          value => {
            this.ctx_copy.drawImage(this.canvas, 0, 0, 640, 360);
            let getSearchUserLocation = this.dealWithSearch(
              this.ctx_copy,
              value[0]
            ); // search
            this.dealWithDetect(this.ctx_copy, value[1], getSearchUserLocation); // detected
            return Promise.resolve("处理数据并绘制成功");
          },
          reason => {
            console.log("网络错误!", reason);
          }
        )
        .then(value => {
          // console.log(value);
          if (this.showaction) {
            return;
          } else {
            setTimeout(() => {
              return this.takePhoto();
            }, 1000);
          }
        });
    },

    dealWithDetect(ctx, data, searchedUsersLocation) {
      // console.log("人脸信息", data);
      if (data["error_code"] != 0) {
        return console.log("人脸检测错误!" + data["error_msg"]);
      }
      let faceDetail = data["result"]["face_list"];
      this.plotFaceDetail(ctx, faceDetail, searchedUsersLocation);
    },

    dealWithSearch(ctx, data) {
      // console.log("搜索人脸", data);
      if (data["error_code"] != 0) {
        return console.log("人脸搜索错误!" + data["error_msg"]);
      }
      let searchResults = data["result"]["face_list"];
      return this.plotSearchDetail(ctx, searchResults);
    },

    plotSearchDetail(ctx, searchResults) {
      // 主要包括人脸框， 和检索信息
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ff0000";
      ctx.font = "24px serif";
      let locations = [];
      for (let user of searchResults) {
        let location = user["location"];
        locations.push(location); // 查找到的人脸的位置信息
        let group_id = user["user_list"][0]["group_id"] || "unknown";
        let user_id = user["user_list"][0]["user_id"] || "unknown";
        let user_info = user["user_list"][0]["user_info"] || "unknown";
        let score = user["user_list"][0]["score"];
        ctx.strokeRect(
          location["left"],
          location["top"],
          location["width"],
          location["height"]
        );
        ctx.strokeText(
          "ID: " + user_id,
          location["left"],
          location["top"] - 10
        );
        ctx.strokeText(
          "Info:" + user_info,
          location["left"],
          location["top"] - 40
        );
        ctx.strokeText(
          "score：" + parseInt(score),
          location["left"],
          location["top"] - 70
        );
        ctx.stroke();
      }
      return locations;
    },

    plotFaceDetail(ctx, faceDetail, searchedUsersLocation) {
      // 获取脸部具体特征信息
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ff0000";
      ctx.font = "24px serif";

      this.usersList.undefinUserList = []; // 新的一次检查 将上一次进行清零
      this.usersList.ConversUserList = [];
      this.usersList.closedUsersList = [];

      // 已经检索到的用户位置
      var dict = [];
      if (searchedUsersLocation) {
        dict = searchedUsersLocation.map((value, index) => {
          this.usersList.ConversUserList.push(value); // 将存储的患者信息存储起来
          return value["left"];
        });
      }

      for (let user of faceDetail) {
        let location = user["location"];
        let age = user["age"];
        let gender = user["gender"];
        let landmark72 = user["landmark72"];
        let race = user["race"];

        // 已经被搜索出来的用户不进行展示
        if (dict.indexOf(location["left"]) !== -1) {
          this.plotDots(ctx, landmark72);
        } else {
          if (dict.length > 0) {
            // 表示为 图片里面的人是密切接触者
            this.usersList.closedUsersList.push(location);
          } else {
            // 待确认身份 信息的展示 与图片的截取及上传数据库，
            this.usersList.undefinUserList.push(location);
          }

          // this.writePictureToCanvas(location);
          ctx.strokeRect(
            location["left"],
            location["top"],
            location["width"],
            location["height"]
          );
          ctx.strokeText("ID: ", location["left"], location["top"] - 10);
          ctx.strokeText("Info:", location["left"], location["top"] - 40);
          ctx.strokeText("score：", location["left"], location["top"] - 70);
          this.plotDots(ctx, landmark72);
        }
        ctx.stroke();
      }
      this.$emit("change", {
        ctx: { content: this.canvas },
        usersList: this.usersList
      });
    },

    plotDots(ctx, dotset, radius = "1") {
      ctx.strokeStyle = "#7cdddf";
      for (let dot of dotset) {
        ctx.beginPath();
        ctx.arc(dot["x"], dot["y"], radius, 0, 2 * Math.PI, false);
        ctx.stroke();
      }
    },

    // 关闭摄像头
    closeMedia() {
      this.mediaStreamTrack.forEach(track => {
        track.stop();
      });
      this.video.srcObject = null;
    },

    getWaitCheckPerson() {}
  }
};
</script>

<style lang="scss" scoped>
@import "./_showVideoCanvas.scss"; /*引入公共样式*/
</style>
