<template>
  <div class="index">
    <!--    头部    -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card" shadow="hover">
          <div class="d-flex" style="align-items: center">
            <i
              class="text-white h2 border-radius-1 mb-0"
              :class="[item.icon, item.color]"
              style="padding:0 2px"
            />
            <div class="ml-2">
              <h5 class="text-left mb-1">{{ item.num }}</h5>
              <small class="text-muted">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--  中部图  -->
    <el-row :gutter="20" class="mt-3">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right;padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="row">
            <div class="col-3" v-for="(itme, index) in [1,2,3,4]" :key="index">
              <button class="btn btn-light w-100">
                <h5>60</h5>
                <small class="text-muted">数据</small>
              </button>
            </div>
          </div>
        </el-card>

        <el-card class="box-card mt-3">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right;padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="row">
            <div
              class="col-2 w-100"
              v-for="(itme, index) in [1,2,3,4,5,6]"
              :key="index"
              style="padding:0"
            >
              <button class="btn btn-light">
                <h5>60</h5>
                <small class="text-muted">数字</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height:358px">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right;padding: 3px 0" type="text">操作按钮</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      counts: [
        {
          icon: "icon-shuju",
          num: 30,
          desc: "今日人数（个）",
          color: "bg-primary"
        },
        {
          icon: "icon-lipinka",
          num: 30,
          desc: "今日人数（个）",
          color: "bg-danger"
        },
        {
          icon: "icon-huati",
          num: 30,
          desc: "今日人数（个）",
          color: "bg-warning"
        },
        {
          icon: "icon-shequ",
          num: 30,
          desc: "今日人数（个）",
          color: "bg-success"
        }
      ]
    };
  }
};
</script>
