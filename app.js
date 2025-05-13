const completeDiv = document.querySelector(".complete");
const blackScreen = document.querySelector(".blackScreen");
let percent = 0;

function updateProgress() {
  if (percent >= 100) {
    completeDiv.textContent = `100% complete`;

    // 顯示黑屏（改用 class 控制）
    blackScreen.classList.add("active");

    // 5 秒後黑屏結束、重置 percent、隱藏黑屏並重新開始
    setTimeout(() => {
      percent = 0;
      completeDiv.textContent = `0% complete`;
      // 隱藏黑屏
      blackScreen.classList.remove("active");
      updateProgress(); // 重啟循環
    }, 5000);

    return;
  }

  // 決定延遲與增幅（可自訂）
  let delay;
  let increment;

  if (percent < 30) {
    delay = Math.random() * 4000 + 2000; // 2-6秒
    increment = Math.random() < 0.8 ? 1 : 2;
  } else if (percent < 70) {
    delay = Math.random() * 2000 + 1000; // 1-3秒
    increment = Math.random() < 0.6 ? 2 : 3;
  } else {
    delay = Math.random() * 5000 + 2000; // 2-7秒
    increment = 1;
  }

  // 更新進度
  percent = Math.min(100, percent + increment);
  completeDiv.textContent = `${percent}% complete`;

  // 計畫下一次更新
  setTimeout(updateProgress, delay);
}

updateProgress();
