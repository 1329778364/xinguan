<template>
  <div class="About">
    <el-container style="position: absolute; bottom: 0;left:0;right:0;top: 0; overflow: hidden;">
      <el-header class="d-flex align-items-center" style="background-color:#545c64;">
        <span class="h5 text-light mb-0" style="margin-right: auto">{{ $conf.logo }}</span>
        <el-menu
          :default-active="navbars.active.toString()"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item, index) in navbars.list"
            :key="index"
            :index="index.toString()"
          >{{ item.name }}</el-menu-item>
        </el-menu>
      </el-header>
      <el-container style="height: 100%; padding-bottom: 60px">
        <el-aside width="200px" class="test-5">
          <el-menu
            style="height: 100%"
            :default-active="slideMenuActive"
            class="el-menu-vertical-demo"
            @select="slideSelect"
          >
            <el-menu-item
              :key="index"
              v-for="(item, index) in slideMenus"
              :index="index.toString()"
            >
              <div class="d-flex align-items-center">
                <span class="mr-2 mb-0 h4" :class="item.icon" />
                <span slot="title h4">{{ item.name }}</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="bg-light">
          <div
            v-if="bran.length > 0"
            class="border-bottom bg-white"
            style="padding: 20px; margin :-20px -20px 0 -20px"
          >
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :key="index"
                :to="{ path: item.path }"
              >{{ item.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!--主页面各个模块的内容显示-->
          <router-view />

          <template>
            <el-backtop target=".el-main"></el-backtop>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {},
  data() {
    return {
      navbars: [],
      bran: []
    };
  },

  created() {
    /*初始化菜单*/
    this.navbars = this.$conf.navbars;
    this.getRouterBran();
    //  初始化选中菜单
    this.__init_menu();
  },

  computed: {
    slideMenus() {
      return this.navbars.list[this.navbars.active].subMenu || [];
    },
    slideMenuActive: {
      get() {
        return this.navbars.list[this.navbars.active].subActive || "0";
      },
      set(val) {
        this.navbars.list[this.navbars.active].subActive = val;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getRouterBran();
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navbars.active,
          left: this.slideMenuActive
        })
      );
    }
  },
  methods: {
    __init_menu() {
      let res = localStorage.getItem("navActive");
      if (res) {
        res = JSON.parse(res);
        this.navbars.active = res.top;
        this.slideMenuActive = res.left;
      }
    },
    // 获取面包屑导航
    getRouterBran() {
      let B = this.$route.matched.filter(value => {
        return value.name;
      });
      let arr = [];
      B.forEach((v, k) => {
        if (v.name === "layout" || v.name === "index") return;
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        });
      });
      if (arr.length > 0) {
        arr.unshift({ name: "index", path: "/index", title: "后台首页" });
      }
      this.bran = arr;
      // console.log(this.bran);
    },
    handleSelect(key, keyPath) {
      // if (this.navbars.active === key) return;
      this.navbars.active = key;
      this.$router.push({
        name: this.slideMenus[this.slideMenuActive].pathname
      });
      this.slideMenuActive = "0";
    },
    slideSelect(key, keyPath) {
      if (key === this.slideMenuActive) return;
      this.$router.push({ name: this.slideMenus[key].pathname });
      this.navbars.active = key;
      this.slideMenuActive = "0";

      console.log(this.slideMenuActive, this.navbars.active);
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>
