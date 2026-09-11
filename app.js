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

function safeHttpUrl(value) {
  try {
    const url = new URL(String(value).trim());

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    }

    return "";
  } catch {
    return "";
  }
}

function createStableId(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (
      (hash << 5) -
      hash +
      value.charCodeAt(i)
    ) | 0;
  }

  return `imported-${Math.abs(hash)}`;
}

function getCountryFromCode(code) {
  const countries = {
    au: "Australia",
    at: "Austria",
    be: "Belgium",
    br: "Brazil",
    ca: "Canada",
    ch: "Switzerland",
    cn: "China",
    co: "Colombia",
    de: "Germany",
    dk: "Denmark",
    eg: "Egypt",
    es: "Spain",
    fi: "Finland",
    fr: "France",
    gb: "United Kingdom",
    gh: "Ghana",
    gr: "Greece",
    ie: "Ireland",
    in: "India",
    it: "Italy",
    jp: "Japan",
    ke: "Kenya",
    kr: "South Korea",
    mx: "Mexico",
    ng: "Nigeria",
    nl: "Netherlands",
    no: "Norway",
    nz: "New Zealand",
    pl: "Poland",
    pt: "Portugal",
    qa: "Qatar",
    ro: "Romania",
    rs: "Serbia",
    ru: "Russia",
    se: "Sweden",
    tr: "Türkiye",
    tz: "Tanzania",
    ua: "Ukraine",
    ug: "Uganda",
    us: "United States",
    za: "South Africa"
  };

  return countries[String(code).toLowerCase()] || "";
}

function inferCountry(tvgId, channelName) {
  const id = String(tvgId || "");

  const match = id.match(/\.([a-z]{2})(?:@|$)/i);

  if (match) {
    const country = getCountryFromCode(match[1]);

    if (country) {
      return {
        country,
        countryCode: match[1].toUpperCase()
      };
    }
  }

  const name = String(channelName || "").toLowerCase();

  const hints = [
    ["uganda", "UG", "Uganda"],
    ["australia", "AU", "Australia"],
    ["uk", "GB", "United Kingdom"],
    ["britain", "GB", "United Kingdom"],
    ["american", "US", "United States"],
    ["usa", "US", "United States"],
    ["canada", "CA", "Canada"]
  ];

  for (const [hint, code, country] of hints) {
    if (name.includes(hint)) {
      return {
        country,
        countryCode: code
      };
    }
  }

  return {
    country: "Imported",
    countryCode: "🌐"
  };
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

  const channel = getAllChannels().find(
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
      getAllChannels().find(
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

  const allChannels = getAllChannels();

  currentChannelIndex =
    allChannels.findIndex(
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
    channel.country,
    channel.groupTitle || "",
    channel.tvgId || ""
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

  const importedBadge =
    channel.imported
      ? `<span class="channel-source">IPTV</span>`
      : "";

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
        ${importedBadge}
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

  const search =
    $("channelSearch")
      .value
      .trim()
      .toLowerCase();

  const category =
    $("categoryFilter").value;

  const country =
    $("countryFilter").value;

  const results =
    getAllChannels().filter(channel =>
      channelMatches(
        channel,
        search,
        category,
        country
      )
    );

  grid.innerHTML =
    results.map(channelCard).join("");

  empty.hidden =
    results.length !== 0;

  bindChannelEvents(grid);
}

function renderFavorites() {
  const grid = $("favoriteGrid");
  const empty = $("favoriteEmpty");

  const favorites =
    getFavorites();

  const channels =
    getAllChannels().filter(
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
          getAllChannels().find(
            x =>
              x.id ===
              card.dataset.channel
          );

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

  const categories = [
    ...new Set(
      getAllChannels()
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

  const countries = [
    ...new Set(
      getAllChannels()
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
   M3U PARSER
========================================================= */

function parseAttributes(extinfLine) {
  const attributes = {};

  const attributeRegex =
    /([\w-]+)="([^"]*)"/g;

  let match;

  while (
    (match =
      attributeRegex.exec(extinfLine)) !== null
  ) {
    attributes[
      match[1].toLowerCase()
    ] = match[2];
  }

  return attributes;
}

function parseM3U(text, playlistId) {
  const lines =
    text
      .replace(/^\uFEFF/, "")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

  const channels = [];

  let pendingInfo = null;

  for (const line of lines) {

    if (
      line.startsWith("#EXTINF:")
    ) {
      const commaIndex =
        line.indexOf(",");

      if (commaIndex === -1) {
        pendingInfo = null;
        continue;
      }

      const info =
        line.slice(0, commaIndex);

      const displayName =
        line
          .slice(commaIndex + 1)
          .trim();

      const attributes =
        parseAttributes(info);

      pendingInfo = {
        attributes,
        displayName
      };

      continue;
    }

    if (
      line.startsWith("#")
    ) {
      continue;
    }

    if (!pendingInfo) {
      continue;
    }

    const stream =
      safeHttpUrl(line);

    if (!stream) {
      pendingInfo = null;
      continue;
    }

    const attributes =
      pendingInfo.attributes;

    const name =
      attributes["tvg-name"] ||
      pendingInfo.displayName ||
      "Unnamed channel";

    const tvgId =
      attributes["tvg-id"] || "";

    const logoUrl =
      safeHttpUrl(
        attributes["tvg-logo"] || ""
      );

    const groupTitle =
      attributes["group-title"] ||
      "Imported";

    const countryInfo =
      inferCountry(
        tvgId,
        name
      );

    const idBase =
      `${playlistId}|${tvgId}|${name}|${stream}`;

    const channel = {
      id: createStableId(idBase),

      name,

      category:
        groupTitle ||
        "Imported",

      country:
        countryInfo.country,

      countryCode:
        countryInfo.countryCode,

      logo:
        name
          .split(/\s+/)
          .slice(0, 2)
          .map(word =>
            word.charAt(0)
          )
          .join("")
          .toUpperCase()
          .slice(0, 4),

      logoUrl,

      stream,

      source: "m3u",

      imported: true,

      playlistId,

      tvgId,

      groupTitle,

      tvgName:
        attributes["tvg-name"] || "",

      language:
        attributes["tvg-language"] || ""
    };

    channels.push(channel);

    pendingInfo = null;
  }

  return channels;
}

/* =========================================================
   PLAYLIST UI
========================================================= */

function renderImportedPlaylists() {
  if (!importedPlaylistsContainer) {
    return;
  }

  const playlists =
    getImportedPlaylists();

  if (!playlists.length) {
    importedPlaylistsContainer.innerHTML =
      "";

    return;
  }

  importedPlaylistsContainer.innerHTML =
    playlists
      .map(playlist => `
        <div
          class="imported-playlist"
          data-playlist="${escapeHTML(playlist.id)}"
        >
          <div class="imported-playlist-info">
            <strong>
              ${escapeHTML(playlist.name)}
            </strong>

            <span>
              ${playlist.channels.length}
              channel${playlist.channels.length === 1 ? "" : "s"}
            </span>
          </div>

          <button
            type="button"
            class="remove-playlist"
            data-remove-playlist="${escapeHTML(playlist.id)}"
            aria-label="Remove ${escapeHTML(playlist.name)}"
          >
            Remove
          </button>
        </div>
      `)
      .join("");
}

function refreshChannelInterface() {
  populateCategories();
  populateCountries();
  renderImportedPlaylists();
  renderChannels();
  renderFavorites();
  renderRecentlyWatched();
}

function importPlaylistFile(file) {
  if (!file) return;

  const name =
    file.name ||
    "Imported playlist";

  playlistStatus.textContent =
    `Reading ${name}...`;

  const reader =
    new FileReader();

  reader.onload = () => {
    try {
      const text =
        String(reader.result || "");

      const playlistId =
        createStableId(
          `${name}|${file.size}|${file.lastModified}`
        );

      const channels =
        parseM3U(
          text,
          playlistId
        );

      if (!channels.length) {
        playlistStatus.textContent =
          "No playable channels were found in this playlist.";

        showToast(
          "No channels found in playlist"
        );

        return;
      }

      const playlists =
        getImportedPlaylists();

      const playlist = {
        id: playlistId,
        name,
        importedAt:
          new Date().toISOString(),
        channels
      };

      const existingIndex =
        playlists.findIndex(
          item =>
            item.id === playlistId
        );

      if (existingIndex >= 0) {
        playlists[existingIndex] =
          playlist;
      } else {
        playlists.push(playlist);
      }

      saveImportedPlaylists(
        playlists
      );

      playlistStatus.textContent =
        `${channels.length} channel${channels.length === 1 ? "" : "s"} imported from ${name}.`;

      showToast(
        `${channels.length} channels imported`
      );

      refreshChannelInterface();

    } catch (error) {
      console.error(
        "Playlist import error:",
        error
      );

      playlistStatus.textContent =
        "The playlist could not be imported.";

      showToast(
        "Playlist import failed"
      );
    }
  };

  reader.onerror = () => {
    playlistStatus.textContent =
      "Could not read the selected file.";

    showToast(
      "Could not read playlist"
    );
  };

  reader.readAsText(file);
}
if (choosePlaylistButton && playlistFileInput) {
  choosePlaylistButton.addEventListener(
    "click",
    () => {
      playlistFileInput.click();
    }
  );
}

if (playlistFileInput) {
  playlistFileInput.addEventListener(
    "change",
    event => {
      const file =
        event.target.files?.[0];

      importPlaylistFile(file);

      event.target.value = "";
    }
  );
}

if (importedPlaylistsContainer) {
  importedPlaylistsContainer.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          "[data-remove-playlist]"
        );

      if (!button) return;

      const playlistId =
        button.dataset.removePlaylist;

      const playlists =
        getImportedPlaylists();

      const playlist =
        playlists.find(
          item =>
            item.id === playlistId
        );

      const updated =
        playlists.filter(
          item =>
            item.id !== playlistId
        );

      saveImportedPlaylists(
        updated
      );

      if (
        currentChannel?.playlistId ===
        playlistId
      ) {
        stopPlayer();

        currentChannel = null;
        currentChannelIndex = -1;

        nowTitle.textContent =
          "No channel selected";

        nowMeta.textContent =
          "Select a channel to begin";

        nowLogo.textContent = "TV";

        liveIndicator.textContent =
          "● OFFLINE";

        liveIndicator.classList.remove(
          "active"
        );

        setStatus("Ready");
      }

      playlistStatus.textContent =
        playlist
          ? `${playlist.name} removed.`
          : "Playlist removed.";

      showToast(
        playlist
          ? `${playlist.name} removed`
          : "Playlist removed"
      );

      refreshChannelInterface();
    }
  );
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
      getAllChannels()[0];

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
      getAllChannels();

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
      getAllChannels();

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
renderImportedPlaylists();
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
