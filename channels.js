const CHANNELS = [
  {
    id: "demo-news",
    name: "Supa News",
    category: "News",
    country: "Demo",
    countryCode: "🌐",
    logo: "SN",
    logoUrl: "https://placehold.co/160x160/png?text=SN",
    stream: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },

  {
    id: "demo-tv",
    name: "Supa TV",
    category: "Entertainment",
    country: "Demo",
    countryCode: "🌐",
    logo: "ST",
    logoUrl: "https://placehold.co/160x160/png?text=ST",
    stream: "https://test-streams.mux.dev/test_001/stream.m3u8"
  },

  {
    id: "5-minute-craft",
    name: "5-Minute Craft",
    category: "Entertainment",
    country: "Finland",
    countryCode: "🇫🇮",
    logo: "5M",
    logoUrl: "",
    stream: "https://soul-5mincrafteng-rakuten.amagi.tv/playlist.m3u8"
  },

  {
    id: "ada-tv",
    name: "Ada TV",
    category: "Entertainment",
    country: "Cyprus",
    countryCode: "🇨🇾",
    logo: "ADA",
    logoUrl: "",
    stream: "https://yayin1.canlitv.fun/live/kibrisadatv.stream/playlist.m3u8"
  },

  {
    id: "armenia-1",
    name: "Armenia 1",
    category: "Entertainment",
    country: "Armenia",
    countryCode: "🇦🇲",
    logo: "A1",
    logoUrl: "",
    stream: "https://amtv.tulixcdn.com/amtv2/am2abr/index.m3u8"
  },

  {
    id: "red-plus",
    name: "Red+",
    category: "News",
    country: "Colombia",
    countryCode: "🇨🇴",
    logo: "RED+",
    logoUrl: "",
    stream: "https://inforedvos.lcdn.claro.net.co/Content/HLS_HLS_DIR/Live/channel(REDMASHDWEB)/master.m3u8"
  },

  {
    id: "canal-24-horas",
    name: "Canal 24 Horas",
    category: "News",
    country: "Spain",
    countryCode: "🇪🇸",
    logo: "24H",
    logoUrl: "",
    stream: "https://ztnr.rtve.es/ztnr/1694255.m3u8"
  },

  {
    id: "nhk-world-japan",
    name: "NHK World-Japan",
    category: "News",
    country: "Japan",
    countryCode: "🇯🇵",
    logo: "NHK",
    logoUrl: "",
    stream: "https://masterpl.hls.nhkworld.jp/hls/w/live/smarttv.m3u8"
  },

  {
    id: "arirang-tv",
    name: "Arirang TV",
    category: "Entertainment",
    country: "South Korea",
    countryCode: "🇰🇷",
    logo: "AR",
    logoUrl: "",
    stream: "https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8"
  },

  {
    id: "bbs-tv",
    name: "BBS TV",
    category: "News",
    country: "Uganda",
    countryCode: "🇺🇬",
    logo: "BBS",
    logoUrl: "",
    stream: "https://bbstv.ug/hls/ch01/index.m3u8"
  },

  {
    id: "gb-news",
    name: "GB News",
    category: "News",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "GB",
    logoUrl: "",
    stream: "https://hlspackager.akamaized.net/live/DB/GB_NEWS/HLS/GB_NEWS.m3u8"
  },

  {
    id: "bloomberg-tv",
    name: "Bloomberg TV",
    category: "Business",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "B",
    logoUrl: "",
    stream: "https://bloomberg.com/media-manifest/streams/asia.m3u8"
  },

  {
    id: "janta-tv",
    name: "Janta TV",
    category: "News",
    country: "India",
    countryCode: "🇮🇳",
    logo: "JT",
    logoUrl: "",
    stream: "https://live.jswk.online/IK_RTPM/live/index.m3u8"
  },

  {
    id: "mrtv-news",
    name: "MRTV News",
    category: "News",
    country: "Myanmar",
    countryCode: "🇲🇲",
    logo: "MN",
    logoUrl: "",
    stream: "https://mrtvott.com/cache/MRTV-NEWS-HD/master.m3u8"
  },

  {
    id: "abc-news",
    name: "ABC News",
    category: "News",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "ABC",
    logoUrl: "",
    stream: "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8"
  },

  {
    id: "dw-english",
    name: "DW English",
    category: "News",
    country: "Germany",
    countryCode: "🇩🇪",
    logo: "DW",
    logoUrl: "",
    stream: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
  },

  {
    id: "al-jazeera-english",
    name: "Al Jazeera English",
    category: "News",
    country: "Qatar",
    countryCode: "🇶🇦",
    logo: "AJ",
    logoUrl: "",
    stream: "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8"
  },

  {
    id: "otv-ghana",
    name: "OTV",
    category: "Entertainment",
    country: "Ghana",
    countryCode: "🇬🇭",
    logo: "OTV",
    logoUrl: "",
    stream: "https://5dcabf026b188.streamlock.net/OceansTV/livestream/playlist.m3u8"
  },

  {
    id: "omide-iran-tv",
    name: "Omide Iran TV",
    category: "Entertainment",
    country: "Iran",
    countryCode: "🇮🇷",
    logo: "OI",
    logoUrl: "",
    stream: "https://oitnhls.wns.live/hls/stream.m3u8"
  },
  
  {
    id: "trace-africa",
    name: "Trace Africa",
    category: "Entertainment",
    country: "France",
    countryCode: "🇫🇷",
    logo: "TA",
    logoUrl: "",
    stream: "https://channels.trace.plus/Traceprod/AFRICA_FR_hd/index.m3u8"
  },

  {
    id: "trace-naija",
    name: "Trace Naija",
    category: "Entertainment",
    country: "Nigeria",
    countryCode: "🇳🇬",
    logo: "TN",
    logoUrl: "",
    stream: "https://channels.trace.plus/Traceprod/NAIJA_hd/index.m3u8"
  },

  {
    id: "trace-urban-africa",
    name: "Trace Urban Africa",
    category: "Entertainment",
    country: "France",
    countryCode: "🇫🇷",
    logo: "TU",
    logoUrl: "",
    stream: "https://channels.trace.plus/Traceprod/URBAN_AFRIC_FR_hd/index.m3u8"
  },

  {
    id: "trace-gospel-east-africa",
    name: "Trace Gospel Nigeria & East Africa",
    category: "Entertainment",
    country: "Nigeria",
    countryCode: "🇳🇬",
    logo: "TG",
    logoUrl: "",
    stream: "https://channels.trace.plus/Traceprod/GOSPEL_ROA_hd/index.m3u8"
  },

{
  id: "9xm",
  name: "9XM",
  category: "Entertainment",
  country: "India",
  countryCode: "🇮🇳",
  logo: "9XM",
  logoUrl: "",
  stream: "https://9xjio.wiseplayout.com/9XM/master.m3u8"
},
  
  {
  id: "3abn-kids-network",
  name: "3ABN Kids Network",
  category: "Entertainment",
  country: "United States",
  countryCode: "🇺🇸",
  logo: "3K",
  logoUrl: "",
  stream: "https://3abn.bozztv.com/3abn2/Kids_live/smil:Kids_live.smil/playlist.m3u8"
},
  
  {
  id: "afarin-baxcha",
  name: "Afarin Baxcha",
  category: "Entertainment",
  country: "Iran",
  countryCode: "🇮🇷",
  logo: "AB",
  logoUrl: "",
  stream: "https://5dcabf026b188.streamlock.net/afarinTV/livestream/playlist.m3u8"
},
  {
  id: "american-classics",
  name: "American Classics",
  category: "Entertainment",
  country: "United States",
  countryCode: "🇺🇸",
  logo: "AC",
  logoUrl: "",
  stream: "https://dai2.xumo.com/xumocdn/p=redbox&deviceid=&is_lat=&subp=RedboxdesktopWebWindows/amagi_hls_data_xumo1212A-redboxamericanclassics/CDN/1280x720_5000000/index.m3u8"
}
  
];


