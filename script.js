const menuToggle = document.getElementById("menuToggle");
const mobilePanel = document.getElementById("mobilePanel");

if (menuToggle && mobilePanel) {
  menuToggle.addEventListener("click", () => {
    const open = mobilePanel.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  });

  document.querySelectorAll(".mobile-panel a").forEach(link => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "메뉴 열기");
    });
  });
}

// 12장 학습지 활동 사진 슬라이더
const track = document.getElementById("slideTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentSlide = document.getElementById("currentSlide");
const dots = document.getElementById("dots");

if (track && prevBtn && nextBtn && currentSlide && dots) {
  const total = track.querySelectorAll(".slide").length;
  let index = 0;

  function renderDots() {
    dots.innerHTML = "";
    for (let i = 0; i < total; i += 1) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `${i + 1}번 사진 보기`);
      dot.addEventListener("click", () => goTo(i));
      dots.appendChild(dot);
    }
  }

  function goTo(nextIndex) {
    index = (nextIndex + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    currentSlide.textContent = String(index + 1).padStart(2, "0");
    dots.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  renderDots();
  goTo(0);
}

// TOP 버튼
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
// 학습지 이미지 확대
const activityImages = document.querySelectorAll(".activity-image");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

function openImage(image) {
  const fullImage = image.dataset.full || image.src;

  modalImage.src = fullImage;
  modalImage.alt = image.alt;

  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeImage() {
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  setTimeout(() => {
    modalImage.src = "";
  }, 250);
}

// 사진 클릭 → 확대
activityImages.forEach(image => {
  image.addEventListener("click", () => {
    openImage(image);
  });
});

// X 버튼 → 닫기
modalClose.addEventListener("click", closeImage);

// 사진이 아닌 영역 클릭 → 닫기
imageModal.addEventListener("click", (event) => {
  if (event.target !== modalImage) {
    closeImage();
  }
});

// ESC → 닫기
document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    imageModal.classList.contains("open")
  ) {
    closeImage();
  }
});