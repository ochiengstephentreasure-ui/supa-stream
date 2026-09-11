const $ = id => document.getElementById(id);

const player = $("videoPlayer");
const overlay = $("playerOverlay");
const statusBox = $("playerStatus");
const nowTitle = $("nowTitle");
const liveIndicator = $("liveIndicator");
const nowLogo = $("nowLogo");
const nowMeta = $("nowMeta");
const countryFilter = $("countryFilter");
const menuToggle = $("menuToggle");
const mainNav = $("mainNav");
const previousChannelBtn = $("previousChannel");
const nextChannelBtn = $("nextChannel");
const fullscreenBtn = $("fullscreenBtn");
const retryPlaybackBtn = $("retryPlayback");
const playbackError = $("playbackError");
const playbackErrorTitle = $("playbackErrorTitle");
const playbackErrorMessage = $("playbackErrorMessage");

let hls = null;
let currentChannel = null;
let currentChannelIndex = -1;

const FAVORITES_KEY = "supa-stream-favorites";
const RECENTLY_WATCHED_KEY = "supa-stream-recently-watched";
const MAX_RECENTLY_WATCHED = 8;

/* =========================================================
   HELPERS
========================================================= */

function showRetryButton(show) {
  if (!retryPlaybackBtn || !playbackError) return;

  playbackError.hidden = !show;
}

function showPlaybackError(title, message) {
  if (!playbackError) return;

  playbackErrorTitle.textContent = title;
  playbackErrorMessage.textContent = message;

  showRetryButton(true);
}

function setStatus(text) {
  if (!statusBox) return;

  statusBox.textContent = text;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   FAVORITES
========================================================= */

function getFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem(FAVORITES_KEY)
    ) || [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(list)
  );
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();

  const channel = CHANNELS.find(
    channelItem => channelItem.id === id
  );

  if (!channel) return;

  let message;

  if (favorites.includes(id)) {
    favorites = favorites.filter(
      x => x !== id
    );

    message =
      `${channel.name} removed from favorites`;
  } else {
    favorites.push(id);

    message =
      `${channel.name} added to favorites`;
  }

  saveFavorites(favorites);

  renderChannels();
  renderFavorites();

  showToast(message);
}

/* =========================================================
   RECENTLY WATCHED
========================================================= */

function getRecentlyWatched() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(RECENTLY_WATCHED_KEY)
    );

    return Array.isArray(saved)
      ? saved
      : [];
  } catch {
    return [];
  }
}

function saveRecentlyWatched(list) {
  localStorage.setItem(
    RECENTLY_WATCHED_KEY,
    JSON.stringify(list)
  );
}

function addRecentlyWatched(id) {
  if (!id) return;

  let recent = getRecentlyWatched();

  recent = recent.filter(
    channelId => channelId !== id
  );

  recent.unshift(id);

  recent = recent.slice(
    0,
    MAX_RECENTLY_WATCHED
  );

  saveRecentlyWatched(recent);

  renderRecentlyWatched();
}

function renderRecentlyWatched() {
  const grid = $("recentGrid");
  const empty = $("recentEmpty");

  if (!grid || !empty) return;

  const recentIds = getRecentlyWatched();

  const channels = recentIds
    .map(id =>
      CHANNELS.find(
        channel => channel.id === id
      )
    )
    .filter(Boolean);

  grid.innerHTML =
    channels.map(channelCard).join("");

  empty.hidden = channels.length !== 0;

  bindChannelEvents(grid);
}

/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {
  const toast = $("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* =========================================================
   PLAYER
========================================================= */

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

  addRecentlyWatched(channel.id);

  currentChannelIndex =
    CHANNELS.findIndex(
      channelItem =>
        channelItem.id === channel.id
    );

  stopPlayer();

  showRetryButton(false);

  nowTitle.textContent = channel.name;

  nowMeta.textContent =
    `${channel.category} · ${channel.country}`;

  if (channel.logoUrl) {
    nowLogo.innerHTML =
      `<img src="${escapeHTML(channel.logoUrl)}" alt="${escapeHTML(channel.name)} logo" width="64" height="64">`;
  } else {
    nowLogo.textContent =
      channel.logo || "TV";
  }

  liveIndicator.textContent =
    "● CONNECTING";

  liveIndicator.classList.remove(
    "active"
  );

  overlay.classList.remove("hidden");

  setStatus(
    `Connecting to ${channel.name}...`
  );

  const url = channel.stream;

  /* -------------------------------------------------------
     Native HLS support
  ------------------------------------------------------- */

  if (
    player.canPlayType(
      "application/vnd.apple.mpegurl"
    )
  ) {
    player.src = url;

    player.addEventListener(
      "loadedmetadata",
      () => {
        player.play().catch(() => {});
      },
      { once: true }
    );

  /* -------------------------------------------------------
     HLS.js support
  ------------------------------------------------------- */

  } else if (
    window.Hls &&
    Hls.isSupported()
  ) {
    hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30
    });

    hls.loadSource(url);
    hls.attachMedia(player);

    hls.on(
      Hls.Events.MANIFEST_PARSED,
      () => {
        player.play().catch(() => {});
      }
    );

    hls.on(
      Hls.Events.ERROR,
      (_, data) => {
        if (!data.fatal) return;

        if (
          data.type ===
          Hls.ErrorTypes.NETWORK_ERROR
        ) {
          setStatus(
            "Connection lost — retrying..."
          );

          hls.startLoad();

        } else if (
          data.type ===
          Hls.ErrorTypes.MEDIA_ERROR
        ) {
          setStatus(
            "Playback issue — recovering..."
          );

          hls.recoverMediaError();

        } else {
          setStatus(
            "Stream unavailable"
          );

          liveIndicator.textContent =
            "● OFFLINE";

          liveIndicator.classList.remove(
            "active"
          );

          showRetryButton(true);

          hls.destroy();
          hls = null;
        }
      }
    );

  } else {
    setStatus(
      "HLS is not supported"
    );

    return;
  }
}

/* =========================================================
   PLAYER EVENTS
========================================================= */

player.addEventListener(
  "playing",
  () => {
    overlay.classList.add("hidden");

    setStatus("LIVE");

    liveIndicator.textContent =
      "● LIVE";

    liveIndicator.classList.add(
      "active"
    );

    showRetryButton(false);
  }
);

player.addEventListener(
  "waiting",
  () => {
    setStatus(
      `Buffering ${currentChannel?.name || "stream"}...`
    );
  }
);

player.addEventListener(
  "error",
  () => {
    setStatus(
      currentChannel
        ? `${currentChannel.name} is currently unavailable`
        : "Playback unavailable"
    );

    liveIndicator.textContent =
      "● OFFLINE";

    liveIndicator.classList.remove(
      "active"
    );

    showRetryButton(true);

    showPlaybackError(
      "Stream unavailable",
      currentChannel
        ? `${currentChannel.name} could not be played right now.`
        : "This channel could not be played right now."
    );
  }
);

/* =========================================================
   CHANNEL FILTERING
========================================================= */

function channelMatches(
  channel,
  search,
  category,
  country
) {
  const text = [
    channel.name,
    channel.category,
    channel.country
  ]
    .join(" ")
    .toLowerCase();

  return (
    (!search ||
      text.includes(search)) &&

    (
      category === "all" ||
      channel.category === category
    ) &&

    (
      country === "all" ||
      channel.country === country
    )
  );
}

/* =========================================================
   CHANNEL CARDS
========================================================= */

function channelCard(channel) {
  const favorite =
    isFavorite(channel.id);

  return `
    <article
      class="channel-card"
      data-channel="${escapeHTML(channel.id)}"
      tabindex="0"
      role="button"
      aria-label="Watch ${escapeHTML(channel.name)}"
    >

      <button
        class="favorite-btn ${favorite ? "active" : ""}"
        data-favorite="${escapeHTML(channel.id)}"
        aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}"
      >
        ${favorite ? "★" : "☆"}
      </button>

      <div class="channel-logo">
        ${
          channel.logoUrl
            ? `
              <img
                src="${escapeHTML(channel.logoUrl)}"
                alt="${escapeHTML(channel.name)} logo"
                width="160"
                height="160"
                loading="lazy"
              >
            `
            : `
              <span>
                ${escapeHTML(channel.logo || "TV")}
              </span>
            `
        }
      </div>

      <div class="channel-name">
        ${escapeHTML(channel.name)}
      </div>

      <div class="channel-status">
        <span class="status-dot"></span>
        <span>Live stream</span>
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

/* =========================================================
   RENDER CHANNELS
========================================================= */

function renderChannels() {
  const grid = $("channelGrid");
  const empty = $("emptyState");

  if (!grid || !empty) return;

  const search =
    $("channelSearch")
      .value
      .trim()
      .toLowerCase();

  const category =
    $("categoryFilter").value;

 const country =
  $("countryFilter").value;

$("categoryFilter").classList.toggle(
  "filter-active",
  category !== "all"
);

$("countryFilter").classList.toggle(
  "filter-active",
  country !== "all"
);

  const results =
    CHANNELS.filter(channel =>
      channelMatches(
        channel,
        search,
        category,
        country
      )
    );

  /* -------------------------------------------------------
     Results count
  ------------------------------------------------------- */

  let resultsInfo =
    $("resultsInfo");

  if (!resultsInfo) {
    resultsInfo =
      document.createElement("div");

    resultsInfo.id = "resultsInfo";
    resultsInfo.className = "results-info";

    grid.parentNode.insertBefore(
      resultsInfo,
      grid
    );
  }

  const hasFilters =
    search ||
    category !== "all" ||
    country !== "all";

  if (hasFilters) {
    resultsInfo.innerHTML = `
      <span class="results-dot"></span>
      <span>
        Showing
        <strong>${results.length}</strong>
        channel${results.length === 1 ? "" : "s"}
      </span>
    `;

    resultsInfo.hidden = false;
  } else {
    resultsInfo.hidden = true;
  }

  /* -------------------------------------------------------
     Render results
  ------------------------------------------------------- */

  if (results.length > 0) {
    grid.innerHTML =
      results
        .map(channelCard)
        .join("");

    empty.hidden = true;

  } else {
    grid.innerHTML = "";

    empty.hidden = true;

    grid.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">⌕</div>

        <h3>No channels found</h3>

        <p>
          Try a different search term or
          change your filters.
        </p>
      </div>
    `;
  }

  bindChannelEvents(grid);
}
function renderFavorites() {
  const grid = $("favoriteGrid");
  const empty = $("favoriteEmpty");

  if (!grid || !empty) return;

  const favorites =
    getFavorites();

  const channels =
    CHANNELS.filter(
      channel =>
        favorites.includes(channel.id)
    );

  grid.innerHTML =
    channels.map(channelCard).join("");

  empty.hidden =
    channels.length !== 0;

  bindChannelEvents(grid);
}

/* =========================================================
   CHANNEL EVENTS
========================================================= */

function bindChannelEvents(container) {
  if (!container) return;

  container
    .querySelectorAll("[data-channel]")
    .forEach(card => {

      const openChannel = () => {
        if (
          document.activeElement === card
        ) {
          card.blur();
        }

        const channel =
          CHANNELS.find(
            x =>
              x.id ===
              card.dataset.channel
          );

        if (!channel) return;

        playChannel(channel);

        document
          .querySelector(".hero-screen")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
      };

      card.addEventListener(
        "click",
        event => {
          if (
            event.target.closest(
              "[data-favorite]"
            )
          ) {
            return;
          }

          openChannel();
        }
      );

      card.addEventListener(
        "keydown",
        event => {
          if (
            event.target.closest(
              "[data-favorite]"
            )
          ) {
            return;
          }

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            openChannel();
          }
        }
      );
    });

  container
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {
          event.stopPropagation();

          toggleFavorite(
            button.dataset.favorite
          );
        }
      );

      button.addEventListener(
        "keydown",
        event => {
          event.stopPropagation();
        }
      );
    });
}

/* =========================================================
   FILTER OPTIONS
========================================================= */

function populateCategories() {
  const select =
    $("categoryFilter");

  if (!select) return;

  const categories = [
    ...new Set(
      CHANNELS
        .map(channel =>
          channel.category
        )
        .filter(Boolean)
    )
  ].sort();

  select.innerHTML =
    `<option value="all">All categories</option>` +
    categories
      .map(
        category =>
          `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
      )
      .join("");
}

function populateCountries() {
  const select =
    $("countryFilter");

  if (!select) return;

  const countries = [
    ...new Set(
      CHANNELS
        .map(channel =>
          channel.country
        )
        .filter(Boolean)
    )
  ].sort();

  select.innerHTML =
    `<option value="all">All countries</option>` +
    countries
      .map(
        country =>
          `<option value="${escapeHTML(country)}">${escapeHTML(country)}</option>`
      )
      .join("");
}

/* =========================================================
   SEARCH / FILTERS
========================================================= */

$("channelSearch").addEventListener(
  "input",
  renderChannels
);

$("categoryFilter").addEventListener(
  "change",
  renderChannels
);

countryFilter.addEventListener(
  "change",
  renderChannels
);

$("clearFilters").addEventListener(
  "click",
  () => {
    $("channelSearch").value = "";
    $("categoryFilter").value = "all";
    countryFilter.value = "all";

    renderChannels();
  }
);

/* =========================================================
   START WATCHING
========================================================= */

$("startWatching").addEventListener(
  "click",
  () => {
    const first =
      CHANNELS[0];

    if (first) {
      playChannel(first);

      document
        .querySelector(".hero-screen")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
    }
  }
);

/* =========================================================
   THEME
========================================================= */

const THEME_KEY =
  "supa-stream-theme";

const themeToggle =
  $("themeToggle");

function updateThemeButton() {
  if (!themeToggle) return;

  const isLight =
    document.body.classList.contains(
      "light"
    );

  themeToggle.textContent =
    isLight ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    isLight
      ? "Switch to dark mode"
      : "Switch to light mode"
  );

  themeToggle.setAttribute(
    "title",
    isLight
      ? "Switch to dark mode"
      : "Switch to light mode"
  );
}

const savedTheme =
  localStorage.getItem(
    THEME_KEY
  );

if (savedTheme === "light") {
  document.body.classList.add(
    "light"
  );
}

updateThemeButton();

themeToggle.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "light"
    );

    const theme =
      document.body.classList.contains(
        "light"
      )
        ? "light"
        : "dark";

    localStorage.setItem(
      THEME_KEY,
      theme
    );

    updateThemeButton();
  }
);

/* =========================================================
   CHANNEL NAVIGATION
========================================================= */

previousChannelBtn.addEventListener(
  "click",
  () => {
    const channels =
      CHANNELS;

    if (!channels.length) return;

    currentChannelIndex =
      currentChannelIndex <= 0
        ? channels.length - 1
        : currentChannelIndex - 1;

    playChannel(
      channels[currentChannelIndex]
    );
  }
);

nextChannelBtn.addEventListener(
  "click",
  () => {
    const channels =
      CHANNELS;

    if (!channels.length) return;

    currentChannelIndex =
      currentChannelIndex >=
      channels.length - 1
        ? 0
        : currentChannelIndex + 1;

    playChannel(
      channels[currentChannelIndex]
    );
  }
);

/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
  "keydown",
  event => {
    const tag =
      event.target.tagName.toLowerCase();

    if (
      tag === "input" ||
      tag === "select" ||
      tag === "textarea"
    ) {
      return;
    }

    if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();
      previousChannelBtn.click();
    }

    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowDown"
    ) {
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
  }
);

/* =========================================================
   INITIAL RENDER
========================================================= */

populateCategories();
populateCountries();
renderRecentlyWatched();
renderChannels();
renderFavorites();

/* =========================================================
   FULLSCREEN
========================================================= */

fullscreenBtn.addEventListener(
  "click",
  async () => {
    const screen =
      document.querySelector(
        ".screen-frame"
      );

    try {
      if (!document.fullscreenElement) {
        await screen.requestFullscreen();

        fullscreenBtn.textContent = "✕";

        fullscreenBtn.setAttribute(
          "aria-label",
          "Exit fullscreen"
        );

        fullscreenBtn.setAttribute(
          "title",
          "Exit fullscreen"
        );
      } else {
        await document.exitFullscreen();

        fullscreenBtn.textContent =
          "⛶";

        fullscreenBtn.setAttribute(
          "aria-label",
          "Enter fullscreen"
        );

        fullscreenBtn.setAttribute(
          "title",
          "Fullscreen"
        );
      }
    } catch {
      showToast(
        "Fullscreen is not available"
      );
    }
  }
);

/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle.addEventListener(
  "click",
  () => {
    const isOpen =
      mainNav.classList.toggle(
        "open"
      );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

    menuToggle.textContent =
      isOpen ? "✕" : "☰";
  }
);

mainNav
  .querySelectorAll("a")
  .forEach(link => {
    link.addEventListener(
      "click",
      () => {
        mainNav.classList.remove(
          "open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        menuToggle.textContent = "☰";
      }
    );
  });

/* =========================================================
   RETRY PLAYBACK
========================================================= */

retryPlaybackBtn.addEventListener(
  "click",
  () => {
    if (!currentChannel) return;

    showRetryButton(false);

    setStatus(
      `Retrying ${currentChannel.name}...`
    );

    liveIndicator.textContent =
      "● CONNECTING";

    liveIndicator.classList.remove(
      "active"
    );

    playChannel(
      currentChannel
    );
  }
);
