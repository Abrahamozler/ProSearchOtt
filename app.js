const API_URL = "https://only-jacinda-chennaicfc6-d4d87c57.koyeb.app";
const BOT = "ProSearchFilesBot";

const moviesEl = document.getElementById("movies");
const searchEl = document.getElementById("search");

async function load(q = "") {
  let url = q
    ? `${API_URL}/search?q=${encodeURIComponent(q)}`
    : `${API_URL}/movies`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("API DATA:", data); // 👈 debug
    render(data);

  } catch (e) {
    console.error("API ERROR", e);
  }
}

function render(movies) {
  moviesEl.innerHTML = "";

  if (!movies || movies.length === 0) {
    moviesEl.innerHTML = "<p>No movies found</p>";
    return;
  }

  movies.forEach(m => {
    const d = document.createElement("div");
    d.className = "card";

    d.innerHTML = `
      <img src="${m.poster || 'https://via.placeholder.com/300x450'}">
      <div class="info">
        <strong>${m.title}</strong><br>
      </div>
    `;

    (m.files || []).forEach(f => {
      const b = document.createElement("button");
      b.innerText = f.quality;
      b.onclick = () =>
        window.open(`https://t.me/${BOT}?start=${m.movie_id}_${f.quality}`, "_blank");
      d.querySelector(".info").appendChild(b);
    });

    moviesEl.appendChild(d);
  });
}

searchEl.addEventListener("input", e => load(e.target.value));
load();
