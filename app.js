const $ = id => document.getElementById(id);

const player = $("videoPlayer");
const overlay = $("playerOverlay");
const statusBox = $("playerStatus");
const nowTitle = $("nowTitle");
const liveIndicator = $("liveIndicator");
const fullscreenBtn = $("fullscreenBtn");
let hls = null;
let currentChannel = null;

const FAVORITES_KEY = "supa-stream-favorites";

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites(favorites);
  renderChannels();
  renderFavorites();
}

function setStatus(text) {
  statusBox.textContent = text;
}

function stopPlayer() {
  if (hls) {
    hls.destroy();
    hls = null;
  }

  player.pause();
  player.removeAttribute("src");
  player.load();
}

function playChannel(channel) {
  if (!channel || !channel.stream) return;

  currentChannel = channel;

  stopPlayer();

  nowTitle.textContent = channel.name;
  liveIndicator.textContent = "● CONNECTING";
  liveIndicator.classList.remove("active");

  overlay.classList.remove("hidden");
  setStatus("Connecting...");

  const url = channel.stream;

  if (player.canPlayType("application/vnd.apple.mpegurl")) {
    player.src = url;

    player.addEventListener(
      "loadedmetadata",
      () => {
        player.play().catch(() => {});
      },
      { once: true }
    );

  } else if (window.Hls && Hls.isSupported()) {
    hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30
    });

    hls.loadSource(url);
    hls.attachMedia(player);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      player.play().catch(() => {});
    });

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (!data.fatal) return;

      setStatus("Stream error");

      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
        setStatus("Retrying...");
        hls.startLoad();
      } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
        hls.recoverMediaError();
      } else {
        hls.destroy();
        hls = null;
      }
    });

  } else {
    setStatus("HLS is not supported");
    return;
  }
}

player.addEventListener("playing", () => {
  overlay.classList.add("hidden");
  setStatus("LIVE");
  liveIndicator.textContent = "● LIVE";
  liveIndicator.classList.add("active");
});

player.addEventListener("waiting", () => {
  setStatus("Buffering...");
});

player.addEventListener("error", () => {
  setStatus("Playback unavailable");
  liveIndicator.textContent = "● OFFLINE";
  liveIndicator.classList.remove("active");
});

function channelMatches(channel, search, category) {
  const text = [
    channel.name,
    channel.category,
    channel.country
  ].join(" ").toLowerCase();

  return (
    (!search || text.includes(search)) &&
    (category === "all" || channel.category === category)
  );
}

function channelCard(channel) {
  const favorite = isFavorite(channel.id);

  return `
    <article class="channel-card" data-channel="${channel.id}">
      <button
        class="favorite-btn ${favorite ? "active" : ""}"
        data-favorite="${channel.id}"
        aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}"
      >
        ${favorite ? "★" : "☆"}
      </button>

      <div class="channel-logo">${escapeHTML(channel.logo || "TV")}</div>

      <div class="channel-name">
        ${escapeHTML(channel.name)}
      </div>

      <div class="channel-meta">
        ${escapeHTML(channel.category)} · ${escapeHTML(channel.country)}
      </div>
    </article>
  `;
}

function renderChannels() {
  const grid = $("channelGrid");
  const empty = $("emptyState");

  const search = $("channelSearch").value.trim().toLowerCase();
  const category = $("categoryFilter").value;

  const results = CHANNELS.filter(channel =>
    channelMatches(channel, search, category)
  );

  grid.innerHTML = results.map(channelCard).join("");
  empty.hidden = results.length !== 0;

  bindChannelEvents(grid);
}

function renderFavorites() {
  const grid = $("favoriteGrid");
  const empty = $("favoriteEmpty");

  const favorites = getFavorites();

  const channels = CHANNELS.filter(channel =>
    favorites.includes(channel.id)
  );

  grid.innerHTML = channels.map(channelCard).join("");
  empty.hidden = channels.length !== 0;

  bindChannelEvents(grid);
}

function bindChannelEvents(container) {
  container.querySelectorAll("[data-channel]").forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest("[data-favorite]")) return;

      const channel = CHANNELS.find(
        x => x.id === card.dataset.channel
      );

      playChannel(channel);

      document.querySelector(".hero-screen")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
    });
  });

  container.querySelectorAll("[data-favorite]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleFavorite(button.dataset.favorite);
    });
  });
}

function populateCategories() {
  const select = $("categoryFilter");

  const categories = [
    ...new Set(CHANNELS.map(channel => channel.category))
  ].sort();

  select.innerHTML =
    `<option value="all">All categories</option>` +
    categories
      .map(category =>
        `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
      )
      .join("");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

$("channelSearch").addEventListener("input", renderChannels);

$("categoryFilter").addEventListener("change", renderChannels);

$("startWatching").addEventListener("click", () => {
  const first = CHANNELS[0];

  if (first) {
    playChannel(first);

    document.querySelector(".hero-screen")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
  }
});

$("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

populateCategories();
renderChannels();
renderFavorites();
fullscreenBtn.addEventListener("click", async () => {
  const screen = document.querySelector(".screen-frame");

  if (!document.fullscreenElement) {
    await screen.requestFullscreen();
    fullscreenBtn.textContent = "✕";
    fullscreenBtn.setAttribute("aria-label", "Exit fullscreen");
    fullscreenBtn.setAttribute("title", "Exit fullscreen");
  } else {
    await document.exitFullscreen();
    fullscreenBtn.textContent = "⛶";
    fullscreenBtn.setAttribute("aria-label", "Enter fullscreen");
    fullscreenBtn.setAttribute("title", "Fullscreen");
  }
});
