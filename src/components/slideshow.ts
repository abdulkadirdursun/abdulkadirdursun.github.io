import { MediaItem } from "../types";

export function createSlideshow(media: MediaItem[]): HTMLElement {
  const container = document.createElement("div");
  container.className = "slideshow";

  const track = document.createElement("div");
  track.className = "slides-track";

  for (const item of media) {
    const slide = document.createElement("div");
    slide.className = "slide";

    if (item.type === "image" && item.src) {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "";
      img.loading = "lazy";
      slide.appendChild(img);
    } else if (item.type === "youtube" && item.videoId) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${item.videoId}`;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      slide.appendChild(iframe);
    }

    track.appendChild(slide);
  }

  container.appendChild(track);

  if (media.length <= 1) return container;

  // State
  let current = 0;
  let autoTimer: ReturnType<typeof setInterval> | null = null;

  function goTo(index: number): void {
    current = (index + media.length) % media.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));

    // Pause auto-advance on youtube slides, resume on image slides
    if (media[current].type === "youtube") {
      stopAuto();
    } else {
      startAuto();
    }
  }

  function startAuto(): void {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto(): void {
    if (autoTimer !== null) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Arrows
  const prevBtn = document.createElement("button");
  prevBtn.className = "slideshow-arrow prev";
  prevBtn.innerHTML = `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M10.354 3.354a.5.5 0 00-.708-.708l-5 5a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708L5.707 8l4.647-4.646z"/></svg>`;
  prevBtn.addEventListener("click", () => goTo(current - 1));

  const nextBtn = document.createElement("button");
  nextBtn.className = "slideshow-arrow next";
  nextBtn.innerHTML = `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5.646 3.354a.5.5 0 01.708-.708l5 5a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708L10.293 8 5.646 3.354z"/></svg>`;
  nextBtn.addEventListener("click", () => goTo(current + 1));

  container.appendChild(prevBtn);
  container.appendChild(nextBtn);

  // Dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slideshow-dots";

  const dots: HTMLButtonElement[] = [];
  for (let i = 0; i < media.length; i++) {
    const dot = document.createElement("button");
    dot.className = "slideshow-dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }

  container.appendChild(dotsContainer);

  // Start auto-advance if first slide is not youtube
  if (media[0].type !== "youtube") {
    startAuto();
  }

  return container;
}
