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
          },
          {
            icon: "icon-huati",
            name: "新闻",
            pathname: "news_times"
          },
          {
            icon: "icon-huati",
            name: "日记",
            pathname: "dairy_fanfan"
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
          },
          {
            icon: "icon-tishi",
            name: "商品详情",
            pathname: "shop_good_detail"
          },
          {
            icon: "icon-tishi",
            name: "商品分类",
            pathname: "shop_good_class"
          }
        ]
      },
      {
        name: "新闻",
        subActive: 0,
        subMenu: [
          {
            icon: "icon-guanzhu",
            name: "时政",
            pathname: "news_times"
          },
          {
            icon: "icon-jiju",
            name: "体育新闻",
            pathname: "news_gym"
          }
        ]
      },
      {
        name: "日记",
        subActive: 0,
        subMenu: [
          {
            icon: "icon-paihangbang",
            name: "芳芳日记",
            pathname: "dairy_fanfan"
          },
          {
            icon: "icon-shangquan",
            name: "圆圆日记",
            pathname: "dairy_yuanyuan"
          }
        ]
      }
    ]
  }
};
