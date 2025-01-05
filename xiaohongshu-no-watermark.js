/**
 * QuantumultX 小红书去水印脚本
 * 作者: ChatGPT
 */

let body = $response.body;

// 检查响应是否有效
if (body) {
    let obj = JSON.parse(body);

    // 处理无水印 URL
    if (obj.data) {
        // 替换视频链接
        if (obj.data.video) {
            obj.data.video.url = obj.data.video.url.replace(/watermark=.*/, "watermark=false");
        }
        // 替换图片链接
        if (obj.data.images) {
            obj.data.images = obj.data.images.map(img => img.replace(/watermark=.*/, "watermark=false"));
        }
    }

    body = JSON.stringify(obj);
}

// 返回修改后的响应
$done({ body });
