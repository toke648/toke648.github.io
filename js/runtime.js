// 获取网站开始运行的时间，需要替换为你的网站实际创建时间
const startTime = new Date('2024-01-01T00:00:00'); 

function updateRuntime() {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    const runtimeElement = document.getElementById('website-runtime');
    if (runtimeElement) {
        runtimeElement.textContent = `网站已运行：${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
    }
}

// 页面加载完成后初始化运行时间显示
window.addEventListener('load', () => {
    updateRuntime();
    // 每秒更新一次运行时间
    setInterval(updateRuntime, 1000); 
});