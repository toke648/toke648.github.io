    document.addEventListener('DOMContentLoaded', function() {
      const captureBtn = document.getElementById('captureBtn');
      
      // 创建弹窗
      const modal = document.createElement('div');
      modal.id = 'preview-modal';
      document.body.appendChild(modal);
      
      // 点击背景关闭
      modal.addEventListener('click', function(e) {
        if(e.target === modal) {
          modal.style.display = 'none';
        }
      });
      
      captureBtn.addEventListener('click', function() {
        // 截图整个页面(排除弹窗本身)
        html2canvas(document.body, {
          ignoreElements: (element) => element === modal
        }).then(canvas => {
          modal.innerHTML = '';
          
          const modalContent = `
            <div class="preview-content">
              <div style="text-align:right;">
                <button id="modal-close" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
              </div>
              <div class="preview-image-container">
                <img class="preview-image" src="${canvas.toDataURL('image/png')}">
              </div>
              <div class="preview-footer">
                <a href="${canvas.toDataURL('image/png')}" 
                   download="page-screenshot.png" 
                   style="
                     display:inline-block;
                     padding:8px 15px;
                     background:#1890ff;
                     color:white;
                     text-decoration:none;
                     border-radius:4px;
                   ">
                  下载图片
                </a>
              </div>
            </div>
          `;
          
          modal.innerHTML = modalContent;
          modal.style.display = 'flex';
          
          document.getElementById('modal-close').addEventListener('click', function() {
            modal.style.display = 'none';
          });
        });
      });
    });