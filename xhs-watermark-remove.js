// xhs-watermark-remove.js
let body = $response.body; // 获取响应体
try {
    // 将响应体解析为 JSON 对象
    let data = JSON.parse(body);

    // 根据 API 数据结构，移除水印相关内容
    if (data && data.data && data.data.media) {
        data.data.media = data.data.media.map(item => {
            if (item.watermark_url) {
                item.watermark_url = ""; // 清空水印链接
            }
            return item;
        });
    }

    // 将修改后的 JSON 对象转为字符串
    body = JSON.stringify(data);
} catch (e) {
    console.log("小红书去水印脚本出错: " + e.message);
}

$done({ body }); // 返回修改后的响应体
