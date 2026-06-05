const grid = document.getElementById("grid");

const episodes = Array.from({ length: 12 }, (_, i) => ({
    title: `Top Podcast Episode ${i + 1}`,
    creator: "Future Media",
    views: `${(i + 1) * 100}K views`,
    date: `${i + 1} days ago`
}));

episodes.forEach((episode) => {

    const card = document.createElement("article");

    card.className = "video-card";

    card.innerHTML = `
    <div class="thumb">
      <img src="https://picsum.photos/600/400?random=${i + 10}">
      <div class="overlay"></div>

      <button class="play-btn">▶</button>

      <span class="duration">
        ${40 + i}:12
      </span>

      <button class="menu">⋮</button>

      <span class="video-badge">
        VIDEO
      </span>
    </div>

    <div class="card-content">
      <h3>${episode.title}</h3>

      <div class="creator">
        ${episode.creator}
        <span class="verified">✓</span>
      </div>

      <div class="meta">
        ${episode.views} • ${episode.date}
      </div>
    </div>
  `;

    grid.appendChild(card);
});

document.querySelectorAll(".pill").forEach(btn => {

    btn.addEventListener("click", () => {

        const group = btn.parentElement;

        group.querySelectorAll(".pill").forEach(p =>
            p.classList.remove("active")
        );

        btn.classList.add("active");
    });
});

document.querySelectorAll(".pagination button")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            document
                .querySelectorAll(".pagination button")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");
        });
    });