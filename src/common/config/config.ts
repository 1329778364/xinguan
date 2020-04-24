export default {
  logo: "WLQ",
  navbars: {
    active: 0,
    list: [
      {
        name: "首页",
        subActive: 0,
        subMenu: [
          {
            icon: "icon-aliyu",
            name: "后台首页",
            pathname: "index"
          },
          {
            icon: "icon-huati",
            name: "商品列表",
            pathname: "shop_good_list"
          }
        ]
      },
      {
        name: "商品",
        subActive: 0,
        subMenu: [
          {
            icon: "icon-tishi",
            name: "商品列表",
            pathname: "shop_good_list"
          }
        ]
      },
      {
        name: "新闻",
        subActive: 0,
        subMenu: [
          {
            icon: "icon-guanzhu",
            name: "新闻1"
          },
          {
            icon: "icon-jiju",
            name: "新闻2"
          }
        ]
      },
      {
        name: "日记",
        subActive: 0,
        subMenu: [
          {
            icon: "icon-paihangbang",
            name: "日记1"
          },
          {
            icon: "icon-shangquan",
            name: "日记2"
          }
        ]
      }
    ]
  }
};
