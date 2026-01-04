const API_URL = "https://YOUR_API_URL";
const BOT = "YourBotUsername";

const moviesEl = document.getElementById("movies");
const searchEl = document.getElementById("search");

async function load(q=""){
  const url = q ? `${API_URL}/search?q=${encodeURIComponent(q)}` : `${API_URL}/movies`;
  const res = await fetch(url);
  const movies = await res.json();
  render(movies);
}

function render(movies){
  moviesEl.innerHTML = "";
  movies.forEach(m=>{
    const d=document.createElement("div");
    d.className="card";
    d.innerHTML=`
      <img src="${m.poster || 'https://via.placeholder.com/300x450'}">
      <div class="info"><strong>${m.title}</strong><br></div>
    `;
    (m.files||[]).forEach(f=>{
      const b=document.createElement("button");
      b.innerText=f.quality;
      b.onclick=()=>window.open(`https://t.me/${BOT}?start=${m.movie_id}_${f.quality}`,"_blank");
      d.querySelector(".info").appendChild(b);
    });
    moviesEl.appendChild(d);
  });
}

searchEl.addEventListener("input", e=>load(e.target.value));
load();
