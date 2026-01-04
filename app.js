fetch("movies.json")
  .then(res => res.json())
  .then(movies => {
    const container = document.getElementById("movies");

    movies.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie";

      div.innerHTML = `
        <img src="${movie.poster}">
        <h3>${movie.title}</h3>
      `;

      movie.versions.forEach(v => {
        const btn = document.createElement("button");
        btn.innerText = v.size;
        btn.onclick = () => {
          window.open(
            "https://t.me/YourBotUsername?start=" + v.tg,
            "_blank"
          );
        };
        div.appendChild(btn);
      });

      container.appendChild(div);
    });
  });
