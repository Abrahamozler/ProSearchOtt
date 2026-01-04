const API_URL = "https://only-jacinda-chennaicfc6-d4d87c57.koyeb.app";
const BOT = "ProSearchFilesBot";

const moviesEl = document.getElementById("movies");
const searchEl = document.getElementById("search");

async function load(q=""){
  const url = q ? `${API}/search?q=${q}` : `${API}/movies`;
  const res = await fetch(url);
  render(await res.json());
}

function render(list){
  moviesEl.innerHTML="";
  list.forEach(m=>{
    const d=document.createElement("div");
    d.className="card";
    d.innerHTML=`<img src="${m.poster||''}"><b>${m.title}</b>`;
    m.files.forEach(f=>{
      const b=document.createElement("button");
      b.innerText=f.quality;
      b.onclick=()=>window.open(`https://t.me/${BOT}?start=${m.movie_id}_${f.quality}`);
      d.appendChild(b);
    });
    moviesEl.appendChild(d);
  });
}

searchEl.oninput=e=>load(e.target.value);
load();
