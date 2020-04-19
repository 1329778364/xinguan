import $ from "jquery"

let access_token = "24.065accaf0918120c9645fba7d28b2c0f.2592000.1589678037.282335-18783164";
let headers = {
    'content-type': 'application/json'
};


function search(image) {
    let request_url = "https://aip.baidubce.com/rest/2.0/face/v3/multi-search"
    request_url = request_url + "?access_token=" + access_token
    let options = {};
    options["image"] = image;
    options["image_type"] = "BASE64";
    options["group_id_list"] = "A";
    options["max_face_num"] = 10;
    options["match_threshold"] = 70;
    options["quality_control"] = "NORMAL";
    options["liveness_control"] = "LOW";
    options["max_user_num"] = 10;

    return $.post(
      request_url, //服务器接口(返回图片路径)
      options,
      "json "
    );


}
function detectFace(image) {
    let request_url = "https://aip.baidubce.com/rest/2.0/face/v3/detect"
    request_url = request_url + "?access_token=" + access_token
    let options = {};
    options["image"] = image;
    options["image_type"] = "BASE64";
    options['face_field'] = 'age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,race,quality,eye_status,emotion,face_type,mask';
    options["face_type"] = "LIVE";
    options["max_face_num"] = 10;
    options["liveness_control"] = "LOW";

    return $.post(
      request_url, //服务器接口(返回图片路径)
      options,
      "json ");
}
export {search,detectFace}