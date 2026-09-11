const $ = id => document.getElementById(id);

/* =========================================================
   DOM REFERENCES
========================================================= */

const player = $("videoPlayer");
const overlay = $("playerOverlay");
const statusBox = $("playerStatus");
const nowTitle = $("nowTitle");
const liveIndicator = $("liveIndicator");
const nowLogo = $("nowLogo");
const nowMeta = $("nowMeta");

const countryFilter = $("countryFilter");
const categoryFilter = $("categoryFilter");
const channelSearch = $("channelSearch");
const clearFiltersBtn = $("clearFilters");

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
const THEME_KEY = "supa-stream-theme";

const MAX_RECENTLY_WATCHED = 8;


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(text) {
  if (statusBox) {
    statusBox.textContent = text;
  }
}

function showRetryButton(show) {
  if (!retryPlaybackBtn || !playbackError) return;

  playbackError.hidden = !show;
}

function showPlaybackError(title, message) {
  if (!playbackError) return;

  if (playbackErrorTitle) {
    playbackErrorTitle.textContent = title;
  }

  if (playbackErrorMessage) {
    playbackErrorMessage.textContent = message;
  }

  showRetryButton(true);
}

function scrollToPlayer() {
  document
    .querySelector(".hero-screen")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
}


/* =========================================================
   LOGO SYSTEM
========================================================= */

/*
   This is the important fix.

   If a channel has a working logoUrl:
   -> show the real image.

   If logoUrl is empty:
   -> show the channel's text logo.

   If logoUrl exists but the image fails:
   -> automatically replace it with the text logo.

   Therefore a broken external logo can NEVER leave
   a broken-image icon on the card.
*/

function logoFallbackHTML(channel) {
  const text = escapeHTML(
    channel.logo ||
    channel.name?.slice(0, 3) ||
    "TV"
  );

  return `
    <span
      class="logo-fallback"
      aria-hidden="true"
    >
      ${text}
    </span>
  `;
}

function channelLogoHTML(channel) {
  const logoText = escapeHTML(
    channel.logo ||
    channel.name?.slice(0, 3) ||
    "TV"
  );

  const logoUrl =
    typeof channel.logoUrl === "string"
      ? channel.logoUrl.trim()
      : "";

  /*
     No logo URL:
     immediately use text fallback.
  */

  if (!logoUrl) {
    return logoFallbackHTML(channel);
  }

  /*
     Logo URL exists:
     try to load the real image.
  */

  return `
    <img
      src="${escapeHTML(logoUrl)}"
      alt="${escapeHTML(channel.name)} logo"
      width="160"
      height="160"
      loading="lazy"
      decoding="async"
      data-logo-fallback="${logoText}"
      onerror="
        this.onerror = null;
        this.replaceWith(
          Object.assign(
            document.createElement('span'),
            {
              className: 'logo-fallback',
              textContent: this.dataset.logoFallback || 'TV',
              ariaHidden: 'true'
            }
          )
        );
      "
    >
  `;
}

function updateNowPlayingLogo(channel) {
  if (!nowLogo) return;

  const logoUrl =
    typeof channel.logoUrl === "string"
      ? channel.logoUrl.trim()
      : "";

  if (!logoUrl) {
    nowLogo.innerHTML =
      logoFallbackHTML(channel);
    return;
  }

  nowLogo.innerHTML = `
    <img
      src="${escapeHTML(logoUrl)}"
      alt="${escapeHTML(channel.name)} logo"
      width="64"
      height="64"
      decoding="async"
    >
  `;

  const image = nowLogo.querySelector("img");

  if (image) {
    image.addEventListener(
      "error",
      () => {
        nowLogo.innerHTML =
          logoFallbackHTML(channel);
      },
      { once: true }
    );
  }
}


/* =========================================================
   FAVORITES
========================================================= */

function getFavorites() {
  try {
    const saved =
      JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
      );

    return Array.isArray(saved)
      ? saved
      : [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(list)
    );
  } catch {
    // Ignore storage errors.
  }
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const channel = CHANNELS.find(
    item => item.id === id
  );

  if (!channel) return;

  let favorites = getFavorites();

  let message;

  if (favorites.includes(id)) {
    favorites =
      favorites.filter(
        favoriteId =>
          favoriteId !== id
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
    const saved =
      JSON.parse(
        localStorage.getItem(
          RECENTLY_WATCHED_KEY
        )
      );

    return Array.isArray(saved)
      ? saved
      : [];
  } catch {
    return [];
  }
}

function saveRecentlyWatched(list) {
  try {
    localStorage.setItem(
      RECENTLY_WATCHED_KEY,
      JSON.stringify(list)
    );
  } catch {
    // Ignore storage errors.
  }
}

function addRecentlyWatched(id) {
  if (!id) return;

  let recent =
    getRecentlyWatched();

  recent =
    recent.filter(
      channelId =>
        channelId !== id
    );

  recent.unshift(id);

  recent =
    recent.slice(
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

  const recentIds =
    getRecentlyWatched();

  const channels =
    recentIds
      .map(id =>
        CHANNELS.find(
          channel =>
            channel.id === id
        )
      )
      .filter(Boolean);

  grid.innerHTML =
    channels
      .map(channelCard)
      .join("");

  empty.hidden =
    channels.length !== 0;

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

  toastTimer =
    setTimeout(() => {
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

  if (!player) return;

  player.pause();

  player.removeAttribute("src");

  player.load();
}

function playChannel(channel) {
  if (
    !channel ||
    !channel.stream ||
    !player
  ) {
    return;
  }

  currentChannel = channel;

  currentChannelIndex =
    CHANNELS.findIndex(
      item =>
        item.id === channel.id
    );

  addRecentlyWatched(channel.id);

  stopPlayer();

  showRetryButton(false);

  if (nowTitle) {
    nowTitle.textContent =
      channel.name;
  }

  if (nowMeta) {
    nowMeta.textContent =
      `${channel.category} · ${channel.country}`;
  }

  updateNowPlayingLogo(channel);

  if (liveIndicator) {
    liveIndicator.textContent =
      "● CONNECTING";

    liveIndicator.classList.remove(
      "active"
    );
  }

  if (overlay) {
    overlay.classList.remove(
      "hidden"
    );
  }

  setStatus(
    `Connecting to ${channel.name}...`
  );

  const url = channel.stream;


  /* -------------------------------------------------------
     Native HLS
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
        player
          .play()
          .catch(() => {});
      },
      { once: true }
    );

    return;
  }


  /* -------------------------------------------------------
     HLS.js
  ------------------------------------------------------- */

  if (
    window.Hls &&
    Hls.isSupported()
  ) {
    hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30
    });

    hls.attachMedia(player);

    hls.loadSource(url);

    hls.on(
      Hls.Events.MANIFEST_PARSED,
      () => {
        player
          .play()
          .catch(() => {});
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

          return;
        }

        if (
          data.type ===
          Hls.ErrorTypes.MEDIA_ERROR
        ) {
          setStatus(
            "Playback issue — recovering..."
          );

          hls.recoverMediaError();

          return;
        }

        setStatus(
          "Stream unavailable"
        );

        if (liveIndicator) {
          liveIndicator.textContent =
            "● OFFLINE";

          liveIndicator.classList.remove(
            "active"
          );
        }

        showPlaybackError(
          "Stream unavailable",
          `${channel.name} could not be played right now.`
        );

        hls.destroy();
        hls = null;
      }
    );

    return;
  }


  /* -------------------------------------------------------
     Unsupported browser
  ------------------------------------------------------- */

  setStatus(
    "HLS is not supported by this browser."
  );

  showPlaybackError(
    "HLS not supported",
    "Your browser cannot play this type of live stream."
  );
}


/* =========================================================
   PLAYER EVENTS
========================================================= */

if (player) {
  player.addEventListener(
    "playing",
    () => {
      if (overlay) {
        overlay.classList.add(
          "hidden"
        );
      }

      setStatus("LIVE");

      if (liveIndicator) {
        liveIndicator.textContent =
          "● LIVE";

        liveIndicator.classList.add(
          "active"
        );
      }

      showRetryButton(false);
    }
  );

  player.addEventListener(
    "waiting",
    () => {
      setStatus(
        `Buffering ${
          currentChannel?.name ||
          "stream"
        }...`
      );
    }
  );

  player.addEventListener(
    "error",
    () => {
      const name =
        currentChannel?.name ||
        "This channel";

      setStatus(
        `${name} is currently unavailable`
      );

      if (liveIndicator) {
        liveIndicator.textContent =
          "● OFFLINE";

        liveIndicator.classList.remove(
          "active"
        );
      }

      showPlaybackError(
        "Stream unavailable",
        `${name} could not be played right now.`
      );
    }
  );
}


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
    channel.country,
    channel.logo
  ]
    .filter(Boolean)
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
        class="favorite-btn ${
          favorite ? "active" : ""
        }"
        data-favorite="${escapeHTML(channel.id)}"
        aria-label="${
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }"
        type="button"
      >
        ${favorite ? "★" : "☆"}
      </button>


      <div class="channel-logo">
        ${channelLogoHTML(channel)}
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
          ${escapeHTML(
            channel.countryCode || "🌐"
          )}
          ${escapeHTML(
            channel.country || "Unknown"
          )}
        </span>

        <span class="channel-category">
          ${escapeHTML(
            channel.category || "General"
          )}
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
    channelSearch
      ? channelSearch.value
          .trim()
          .toLowerCase()
      : "";

  const category =
    categoryFilter
      ? categoryFilter.value
      : "all";

  const country =
    countryFilter
      ? countryFilter.value
      : "all";


  /* -------------------------------------------------------
     Active filter styling
  ------------------------------------------------------- */

  if (categoryFilter) {
    categoryFilter.classList.toggle(
      "filter-active",
      category !== "all"
    );
  }

  if (countryFilter) {
    countryFilter.classList.toggle(
      "filter-active",
      country !== "all"
    );
  }


  /* -------------------------------------------------------
     Filter channels
  ------------------------------------------------------- */

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
      document.createElement(
        "div"
      );

    resultsInfo.id =
      "resultsInfo";

    resultsInfo.className =
      "results-info";

    grid.parentNode.insertBefore(
      resultsInfo,
      grid
    );
  }

  const hasFilters =
    Boolean(search) ||
    category !== "all" ||
    country !== "all";

  if (hasFilters) {
    resultsInfo.innerHTML = `
      <span class="results-dot"></span>

      <span>
        Showing
        <strong>${results.length}</strong>
        channel${
          results.length === 1
            ? ""
            : "s"
        }
      </span>
    `;

    resultsInfo.hidden = false;
  } else {
    resultsInfo.hidden = true;
  }


  /* -------------------------------------------------------
     Render results
  ------------------------------------------------------- */

  if (results.length) {
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

        <div class="search-empty-icon">
          ⌕
        </div>

        <h3>No channels found</h3>

        <p>
          Try a different search term
          or change your filters.
        </p>

      </div>
    `;
  }

  bindChannelEvents(grid);
}


/* =========================================================
   FAVORITES RENDERING
========================================================= */

function renderFavorites() {
  const grid = $("favoriteGrid");
  const empty = $("favoriteEmpty");

  if (!grid || !empty) return;

  const favorites =
    getFavorites();

  const channels =
    CHANNELS.filter(
      channel =>
        favorites.includes(
          channel.id
        )
    );

  grid.innerHTML =
    channels
      .map(channelCard)
      .join("");

  empty.hidden =
    channels.length !== 0;

  bindChannelEvents(grid);
}


/* =========================================================
   CHANNEL EVENTS
========================================================= */

function bindChannelEvents(container) {
  if (!container) return;


  /* -------------------------------------------------------
     Channel cards
  ------------------------------------------------------- */

  container
    .querySelectorAll(
      "[data-channel]"
    )
    .forEach(card => {

      const openChannel = () => {
        const channel =
          CHANNELS.find(
            item =>
              item.id ===
              card.dataset.channel
          );

        if (!channel) return;

        playChannel(channel);

        card.blur();

        scrollToPlayer();
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


  /* -------------------------------------------------------
     Favorite buttons
  ------------------------------------------------------- */

  container
    .querySelectorAll(
      "[data-favorite]"
    )
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
  if (!categoryFilter) return;

  const categories =
    [
      ...new Set(
        CHANNELS
          .map(
            channel =>
              channel.category
          )
          .filter(Boolean)
      )
    ].sort(
      (a, b) =>
        a.localeCompare(b)
    );

  categoryFilter.innerHTML =
    `
      <option value="all">
        All categories
      </option>
    ` +
    categories
      .map(
        category =>
          `
            <option value="${escapeHTML(
              category
            )}">
              ${escapeHTML(category)}
            </option>
          `
      )
      .join("");
}

function populateCountries() {
  if (!countryFilter) return;

  const countries =
    [
      ...new Set(
        CHANNELS
          .map(
            channel =>
              channel.country
          )
          .filter(Boolean)
      )
    ].sort(
      (a, b) =>
        a.localeCompare(b)
    );

  countryFilter.innerHTML =
    `
      <option value="all">
        All countries
      </option>
    ` +
    countries
      .map(
        country =>
          `
            <option value="${escapeHTML(
              country
            )}">
              ${escapeHTML(country)}
            </option>
          `
      )
      .join("");
}


/* =========================================================
   SEARCH / FILTER EVENTS
========================================================= */

if (channelSearch) {
  channelSearch.addEventListener(
    "input",
    renderChannels
  );
}

if (categoryFilter) {
  categoryFilter.addEventListener(
    "change",
    renderChannels
  );
}

if (countryFilter) {
  countryFilter.addEventListener(
    "change",
    renderChannels
  );
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener(
    "click",
    () => {
      if (channelSearch) {
        channelSearch.value = "";
      }

      if (categoryFilter) {
        categoryFilter.value =
          "all";
      }

      if (countryFilter) {
        countryFilter.value =
          "all";
      }

      renderChannels();
    }
  );
}


/* =========================================================
   START WATCHING
========================================================= */

const startWatching =
  $("startWatching");

if (startWatching) {
  startWatching.addEventListener(
    "click",
    () => {
      const first =
        CHANNELS[0];

      if (!first) return;

      playChannel(first);

      scrollToPlayer();
    }
  );
}


/* =========================================================
   THEME
========================================================= */

const themeToggle =
  $("themeToggle");

function updateThemeButton() {
  if (!themeToggle) return;

  const isLight =
    document.body.classList.contains(
      "light"
    );

  themeToggle.textContent =
    isLight
      ? "☀"
      : "☾";

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

try {
  const savedTheme =
    localStorage.getItem(
      THEME_KEY
    );

  if (savedTheme === "light") {
    document.body.classList.add(
      "light"
    );
  }
} catch {
  // Ignore storage errors.
}

updateThemeButton();

if (themeToggle) {
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

      try {
        localStorage.setItem(
          THEME_KEY,
          theme
        );
      } catch {
        // Ignore storage errors.
      }

      updateThemeButton();
    }
  );
}


/* =========================================================
   CHANNEL NAVIGATION
========================================================= */

if (previousChannelBtn) {
  previousChannelBtn.addEventListener(
    "click",
    () => {
      if (!CHANNELS.length) return;

      currentChannelIndex =
        currentChannelIndex <= 0
          ? CHANNELS.length - 1
          : currentChannelIndex - 1;

      playChannel(
        CHANNELS[
          currentChannelIndex
        ]
      );
    }
  );
}

if (nextChannelBtn) {
  nextChannelBtn.addEventListener(
    "click",
    () => {
      if (!CHANNELS.length) return;

      currentChannelIndex =
        currentChannelIndex >=
        CHANNELS.length - 1
          ? 0
          : currentChannelIndex + 1;

      playChannel(
        CHANNELS[
          currentChannelIndex
        ]
      );
    }
  );
}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
  "keydown",
  event => {
    const target =
      event.target;

    const tag =
      target?.tagName
        ?.toLowerCase();

    if (
      tag === "input" ||
      tag === "select" ||
      tag === "textarea" ||
      target?.isContentEditable
    ) {
      return;
    }

    if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();

      previousChannelBtn?.click();

      return;
    }

    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();

      nextChannelBtn?.click();

      return;
    }

    if (
      event.code === "Space"
    ) {
      event.preventDefault();

      if (!player) return;

      if (player.paused) {
        player
          .play()
          .catch(() => {});
      } else {
        player.pause();
      }
    }
  }
);


/* =========================================================
   FULLSCREEN
========================================================= */

function updateFullscreenButton() {
  if (!fullscreenBtn) return;

  const isFullscreen =
    Boolean(
      document.fullscreenElement
    );

  fullscreenBtn.textContent =
    isFullscreen
      ? "✕"
      : "⛶";

  fullscreenBtn.setAttribute(
    "aria-label",
    isFullscreen
      ? "Exit fullscreen"
      : "Enter fullscreen"
  );

  fullscreenBtn.setAttribute(
    "title",
    isFullscreen
      ? "Exit fullscreen"
      : "Fullscreen"
  );
}

if (fullscreenBtn) {
  fullscreenBtn.addEventListener(
    "click",
    async () => {
      const screen =
        document.querySelector(
          ".screen-frame"
        );

      if (!screen) return;

      try {
        if (
          !document.fullscreenElement
        ) {
          await screen.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch {
        showToast(
          "Fullscreen is not available"
        );
      }

      updateFullscreenButton();
    }
  );
}

document.addEventListener(
  "fullscreenchange",
  updateFullscreenButton
);

updateFullscreenButton();


/* =========================================================
   MOBILE MENU
========================================================= */

if (
  menuToggle &&
  mainNav
) {
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
        isOpen
          ? "✕"
          : "☰";
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

          menuToggle.textContent =
            "☰";
        }
      );
    });
}


/* =========================================================
   RETRY PLAYBACK
========================================================= */

if (retryPlaybackBtn) {
  retryPlaybackBtn.addEventListener(
    "click",
    () => {
      if (!currentChannel) return;

      showRetryButton(false);

      setStatus(
        `Retrying ${currentChannel.name}...`
      );

      if (liveIndicator) {
        liveIndicator.textContent =
          "● CONNECTING";

        liveIndicator.classList.remove(
          "active"
        );
      }

      playChannel(
        currentChannel
      );
    }
  );
}


/* =========================================================
   INITIAL RENDER
========================================================= */

populateCategories();
populateCountries();

renderRecentlyWatched();
renderChannels();
renderFavorites();
