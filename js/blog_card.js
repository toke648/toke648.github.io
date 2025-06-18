window.onload = () => {
  const captureBtn = document.getElementById('captureBtn');
  if (!captureBtn) return;

  captureBtn.addEventListener('click', async () => {
    // 截取整个网页的根节点
    const area = document.documentElement; // 获取整个网页的根节点

    const canvas = await html2canvas(area, { // 说明创建canvas对象
      scrollX: 0, // 滚动条的X轴位置
      scrollY: -window.scrollY, // 滚动条的Y轴位置
      windowWidth: document.documentElement.scrollWidth, // 窗口的宽度
      windowHeight: document.documentElement.scrollHeight, // 窗口的高度
      useCORS: true, // 允许跨域
      scale: 2, // 放大倍数
    });

    // 打印 canvas 高度用于调试
    console.log('Canvas height:', canvas.height);

    const ctx = canvas.getContext('2d'); // 获取画笔

    const now = new Date(); // 获取当前时间
    const createdAt = now.toLocaleString(); // 转换为可读的时间格式

    // 通过某种加密算法将网址转换为uuid
    const url_name = "https://api.github.com/repos/"; 

    // 定义一个函数，用于将网址转换为 UUID
    async function urlToUUID(url) {
      // 对输入的 URL 进行编码
      const encoder = new TextEncoder();
      const data = encoder.encode(url);
      // 使用 SHA - 256 算法进行哈希计算
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      // 将哈希结果转换为十六进制字符串
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      // 提取前 32 位作为 UUID 的基础数据
      const uuidHex = hashHex.slice(0, 32);
      // 按照 UUID v5 规范设置版本和变体位
      return `${uuidHex.slice(0, 8)}-${uuidHex.slice(8, 12)}-5${uuidHex.slice(13, 16)}-8${uuidHex.slice(17, 20)}-${uuidHex.slice(20, 32)}`;
    }

    // 调用函数生成基于网址的 UUID
    const uuid = await urlToUUID(url_name);

    const boxWidth = 300;
    const boxHeight = 80;
    const padding = 10;

    // 👇 左下角位置计算（Y 要减去 boxHeight）
    const x = padding;
    const y = canvas.height - boxHeight - padding;

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect(x, y, boxWidth, boxHeight);
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.fillText(`创建时间: ${createdAt}`, x + 10, y + 20);
    ctx.fillText(`UUID: ${uuid.slice(0, 8)}`, x + 10, y + 40);
    ctx.fillText(`访问量: 1234`, x + 10, y + 60);

    const imgData = canvas.toDataURL("image/png"); // 获取canvas的图片数据
    const link = document.createElement('a'); // 创建一个a标签
    link.href = imgData; // 设置a标签的href属性为图片数据
    link.download = 'blog_card.png'; // 设置a标签的download属性为文件名
    link.click(); // 模拟点击a标签
  });
};