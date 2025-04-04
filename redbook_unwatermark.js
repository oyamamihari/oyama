/*
Quantumult X 小红书去水印（图片 + 视频）
作者: ChatGPT 优化版
更新时间: 2025-04-05
*/

let body = $response.body;
let obj = JSON.parse(body);

try {
  const cleanImageUrl = url => url?.split("?")[0];

  // 笔记列表去图片水印
  if (obj?.data?.note_list) {
    obj.data.note_list.forEach(note => {
      // 图片列表
      if (note.image_list) {
        note.image_list.forEach(img => {
          img.url = cleanImageUrl(img.url);
        });
      }

      // 视频封面图
      if (note.cover && note.cover.url) {
        note.cover.url = cleanImageUrl(note.cover.url);
      }

      // 视频链接（无水印）
      if (note.video && note.video.media) {
        const media = note.video.media;
        media.url = media.url || media.hd || media.sd;
        media.h264 = media.h264 || {};
        media.h264.url = media.h264.url || media.h264.hd || media.h264.sd;
      }
    });
  }

  // 详情页
  if (obj?.data?.note) {
    const note = obj.data.note;

    // 图片列表
    if (note.image_list) {
      note.image_list.forEach(img => {
        img.url = cleanImageUrl(img.url);
      });
    }

    // 视频处理
    if (note.video && note.video.media) {
      const media = note.video.media;
      media.url = media.url || media.hd || media.sd;
      media.h264 = media.h264 || {};
      media.h264.url = media.h264.url || media.h264.hd || media.h264.sd;
    }
  }

  $done({ body: JSON.stringify(obj) });

} catch (err) {
  console.log("小红书去水印脚本出错：" + err);
  $done({});
}
