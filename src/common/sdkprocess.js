let AipFace = require("baidu-aip-sdk").face;


let APP_ID = '18783164';
let API_KEY = '9gOfV7GRSkOmHBhpW3hj6AaO';
let SECRET_KEY = '5vuA04qARYTyK9OqPpNI2SVVdH0r4EpW';
let client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

let imageType = "BASE64";

// 人脸搜索参数
let options_search = {};
options_search["max_face_num"] = 10;
options_search["match_threshold"] = 70;
options_search["quality_control"] = "NORMAL";
options_search["liveness_control"] = "LOW";
options_search["max_user_num"] = 10;

// 人脸检测参数 特征提取
let options_detect = {};
options_detect['face_field'] = 'age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,race,quality,eye_status,emotion,face_type,mask';
options_detect["face_type"] = "LIVE";
options_detect["max_face_num"] = 10;
options_detect["liveness_control"] = "LOW";

// 带参数调用人脸检测
function detect(image, options = options_detect){
  client.detect(image, imageType, options).then(function(result) {
    console.log(JSON.stringify(result));
    }).catch(function(err) {
      // 如果发生网络错误
    console.log(err);
  });
}

function search(image, options= options_search, groupIdList="A"){
  // 带参数调用人脸搜索
  client.search(image, imageType, groupIdList, options).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
}


export {search,detect}

