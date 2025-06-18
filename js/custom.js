document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("generate-poster");
  const card = document.getElementById("poster-card");

  if (!btn || !card) return;

  btn.addEventListener("click", () => {
    const title = document.querySelector("h1")?.innerText || document.title;
    const date = document.querySelector("time")?.innerText || new Date().toLocaleDateString();
    const url = window.location.href;

    document.getElementById("poster-title").innerText = title;
    document.getElementById("poster-date").innerText = date;
    document.getElementById("poster-url").innerText = url;

    const qrContainer = document.getElementById("poster-qrcode");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, { text: url, width: 100, height: 100 });

    card.style.display = "block";

    // 延迟生成图片，确保 QRCode 渲染完成
    setTimeout(() => {
      html2canvas(card).then(canvas => {
        const link = document.createElement("a");
        link.download = "blog-poster.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        card.style.display = "none";
      });
    }, 300);
  });
});
