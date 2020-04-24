import ar from "element-ui/src/locale/lang/ar";

let routes = [
  {
    component: "home/index"
  },
  {
    // 主布局页面
    component: "layout/index",
    children: [
      {
        meta: {
          title: "后台首页"
        },
        component: "index/index"
      },
      {
        meta: {
          title: "商品列表"
        },
        component: "shop/good/list"
      }
    ]
  },
  {
    meta: {
      title: "登录页"
    },
    component: "login/index"
  },
  {
    path: "*",
    redirect: { path: "/home" }
  }
];

function getRouters() {
  // 导入component
  creatRouters(routes);
  return routes;
}

function creatRouters(arr = []) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return;
    let componentFunc = import(`../../views/${arr[i].component}.vue`);
    // 去除index结尾
    let val = getVal(arr[i].component);
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, "_");
    // 生成path
    arr[i].path = arr[i].path || `/${val}`;
    arr[i].component = () => componentFunc;
    if (arr[i].children && arr[i].children.length > 0) {
      creatRouters(arr[i].children);
    }
  }
}
function getVal(str = "") {
  let index = str.lastIndexOf("/");
  let val = str.substring(index + 1, str.length);

  let str2 = str.substring(0, index);
  let index2 = str2.lastIndexOf("/");
  let val2 = str.substring(index2 + 1, str2.length);
  if (val === "index") {
    // || val === val2
    // console.log(val, val2);
    return str.substring(index, -1);
  }
  // console.log(str);
  return str;
}
export default getRouters();
