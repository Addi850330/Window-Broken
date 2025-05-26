const completeDiv = document.querySelector(".complete");
const blackScreen = document.querySelector(".blackScreen");
const windowload = document.querySelector(".windowload");
let percent = 0;

function openBlackWindow() {
  window.open("black.html", "_blank");
}

function updateProgress() {
  if (percent >= 100) {
    completeDiv.textContent = `100% complete`;
    // 顯示黑屏（改用 class 控制）
    blackScreen.classList.add("active");

    // 第一次黑屏 5 秒 > 顯示 windowload 畫面 4 秒 > 再黑屏 3 秒 > 重啟
    setTimeout(() => {
      blackScreen.classList.remove("active");
      windowload.style.display = "flex"; // 顯示 windowload 畫面

      setTimeout(() => {
        windowload.style.display = "none";
        blackScreen.classList.add("active"); // 再次黑屏

        setTimeout(() => {
          blackScreen.classList.remove("active");
          percent = 0;
          completeDiv.textContent = `0% complete`;
          updateProgress(); // 重啟循環
        }, 3000);
      }, 9000);
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
// 初始狀態隱藏 windowload 畫面
windowload.style.display = "none";

updateProgress();
