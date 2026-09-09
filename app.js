const $ = id => document.getElementById(id);

const player = $("videoPlayer");
const overlay = $("playerOverlay");
const statusBox = $("playerStatus");
const nowTitle = $("nowTitle");
const liveIndicator = $("liveIndicator");
const nowLogo = $("nowLogo");
const nowMeta = $("nowMeta");
const countryFilter = $("countryFilter");
const previousChannelBtn = $("previousChannel");
const nextChannelBtn = $("nextChannel");
const fullscreenBtn = $("fullscreenBtn");
let hls = null;
let currentChannel = null;
let currentChannelIndex = -1;

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

currentChannelIndex = CHANNELS.findIndex(
  channelItem => channelItem.id === channel.id
);
  stopPlayer();

 nowTitle.textContent = channel.name;

nowMeta.textContent =
  `${channel.category} · ${channel.country}`;

if (channel.logoUrl) {
  nowLogo.innerHTML =
   `<img src="${escapeHTML(channel.logoUrl)}" alt="${escapeHTML(channel.name)} logo" width="64" height="64">`
} else {
  nowLogo.textContent = channel.logo || "TV";
}

liveIndicator.textContent = "● CONNECTING";
liveIndicator.classList.remove("active");

  overlay.classList.remove("hidden");
  setStatus(`Connecting to ${channel.name}...`);
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

  if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
    setStatus("Connection lost — retrying...");
    hls.startLoad();
  } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
    setStatus("Playback issue — recovering...");
    hls.recoverMediaError();
  } else {
    setStatus("Stream unavailable");
    liveIndicator.textContent = "● OFFLINE";
    liveIndicator.classList.remove("active");

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
  setStatus(`Buffering ${currentChannel?.name || "stream"}...`);
});

player.addEventListener("error", () => {
  setStatus(
    currentChannel
      ? `${currentChannel.name} is currently unavailable`
      : "Playback unavailable"
  );

  liveIndicator.textContent = "● OFFLINE";
  liveIndicator.classList.remove("active");
});

function channelMatches(channel, search, category, country) {
  const text = [
    channel.name,
    channel.category,
    channel.country
  ].join(" ").toLowerCase();

  return (
    (!search || text.includes(search)) &&
    (category === "all" || channel.category === category) &&
    (country === "all" || channel.country === country)
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

      <div class="channel-logo">
  ${
    channel.logoUrl
      ? `<img src="${escapeHTML(channel.logoUrl)}" alt="${escapeHTML(channel.name)} logo" width="160" height="160" loading="lazy">`
      : `<span>${escapeHTML(channel.logo || "TV")}</span>`
  }
</div>

      <div class="channel-name">
        ${escapeHTML(channel.name)}
      </div>

      <div class="channel-meta">
  <span class="channel-country">
    ${escapeHTML(channel.countryCode || "🌐")}
    ${escapeHTML(channel.country)}
  </span>
  <span class="channel-category">
    ${escapeHTML(channel.category)}
  </span>
</div>
    </article>
  `;
}

function renderChannels() {
  const grid = $("channelGrid");
  const empty = $("emptyState");

  const search = $("channelSearch").value.trim().toLowerCase();
  const category = $("categoryFilter").value;
const country = $("countryFilter").value;
  const results = CHANNELS.filter(channel =>
   channelMatches(channel, search, category, country)
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
function populateCountries() {
  const select = $("countryFilter");

  const countries = [
    ...new Set(CHANNELS.map(channel => channel.country))
  ].sort();

  select.innerHTML =
    `<option value="all">All countries</option>` +
    countries
      .map(country =>
        `<option value="${escapeHTML(country)}">${escapeHTML(country)}</option>`
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
countryFilter.addEventListener("change", renderChannels);
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
previousChannelBtn.addEventListener("click", () => {
  if (!CHANNELS.length) return;

  currentChannelIndex =
    currentChannelIndex <= 0
      ? CHANNELS.length - 1
      : currentChannelIndex - 1;

  playChannel(CHANNELS[currentChannelIndex]);
});

nextChannelBtn.addEventListener("click", () => {
  if (!CHANNELS.length) return;

  currentChannelIndex =
    currentChannelIndex >= CHANNELS.length - 1
      ? 0
      : currentChannelIndex + 1;

  playChannel(CHANNELS[currentChannelIndex]);
});
document.addEventListener("keydown", event => {
  const tag = event.target.tagName.toLowerCase();

  if (tag === "input" || tag === "select" || tag === "textarea") {
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    previousChannelBtn.click();
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    nextChannelBtn.click();
  }
  if (event.code === "Space") {
  event.preventDefault();

  if (player.paused) {
    player.play().catch(() => {});
  } else {
    player.pause();
  }
}
});
populateCategories();
populateCountries();
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
