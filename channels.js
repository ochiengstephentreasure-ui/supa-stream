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
    id: "africa-24",
    name: "Africa 24",
    category: "News",
    country: "France",
    countryCode: "🇫🇷",
    logo: "A24",
    logoUrl: "",
    stream: "https://africa24.vedge.infomaniak.com/livecast/ik:africa24/manifest.m3u8"
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
    id: "al-ghad-tv",
    name: "Al Ghad TV",
    category: "News",
    country: "Egypt",
    countryCode: "🇪🇬",
    logo: "AG",
    logoUrl: "",
    stream: "https://eazyvwqssi.erbvr.com/alghadtv/alghadtv.m3u8"
  },

  {
    id: "bloomberg-tv-asia",
    name: "Bloomberg TV Asia",
    category: "Business",
    country: "Hong Kong",
    countryCode: "🇭🇰",
    logo: "B",
    logoUrl: "",
    stream: "https://bloomberg.com/media-manifest/streams/asia.m3u8"
  },

  {
    id: "kohavision",
    name: "Kohavision",
    category: "News",
    country: "Kosovo",
    countryCode: "🇽🇰",
    logo: "KTV",
    logoUrl: "",
    stream: "https://gjirafa-video-live.gjirafa.net/gjvideo-livestream/lj9-pxm-o53-rp0/tracks-v4a1/mono.m3u8"
  },

  {
    id: "teleamazonas",
    name: "Teleamazonas",
    category: "News",
    country: "Ecuador",
    countryCode: "🇪🇨",
    logo: "TA",
    logoUrl: "",
    stream: "https://teleamazonas-live.cdn.vustreams.com/live/fd4ab346-b4e3-4628-abf0-b5a1bc192428/live.isml/playlist.m3u8"
  },

  {
    id: "nation-tv",
    name: "Nation TV",
    category: "News",
    country: "Thailand",
    countryCode: "🇹🇭",
    logo: "NT",
    logoUrl: "",
    stream: "https://nationtv-1jdcjo.cdn.byteark.com/fleetstream/nationtvlive/index.m3u8"
  },

  {
    id: "iqraa-quran",
    name: "Iqraa Quran",
    category: "Entertainment",
    country: "Saudi Arabia",
    countryCode: "🇸🇦",
    logo: "IQ",
    logoUrl: "",
    stream: "https://playlist.fasttvcdn.com/pl/dlkqw1ftuvuuzkcb4pxdcg/Iqraafasttv2/playlist.m3u8"
  },

  {
    id: "telebarn",
    name: "TeleBarn",
    category: "News",
    country: "Switzerland",
    countryCode: "🇨🇭",
    logo: "TB",
    logoUrl: "",
    stream: "https://viamotionhsi.netplus.ch/live/eds/telebaern/browser-HLS8/telebaern.m3u8"
  },

  {
    id: "tv-tabalong",
    name: "TV Tabalong",
    category: "Entertainment",
    country: "Indonesia",
    countryCode: "🇮🇩",
    logo: "TVT",
    logoUrl: "",
    stream: "https://5bf7b725107e5.streamlock.net/tvtabalong/tvtabalong/playlist.m3u8"
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
    id: "hamdard-tv",
    name: "Hamdard TV",
    category: "News",
    country: "Canada",
    countryCode: "🇨🇦",
    logo: "HT",
    logoUrl: "",
    stream: "https://tv.hamdardtv.com/hamdard/index.m3u8"
  },

  {
    id: "vostok-24",
    name: "Восток 24 (Владивосток)",
    category: "News",
    country: "Russia",
    countryCode: "🇷🇺",
    logo: "В24",
    logoUrl: "",
    stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/vladivostok/vostok24-hd/index.m3u8"
  },

  {
    id: "dm-sat",
    name: "DM Sat",
    category: "Entertainment",
    country: "Serbia",
    countryCode: "🇷🇸",
    logo: "DM",
    logoUrl: "",
    stream: "https://viamotionhsi.netplus.ch/live/eds/dmsat/browser-HLS8/dmsat.m3u8"
  },

  {
    id: "comedy-play",
    name: "Comedy Play",
    category: "Entertainment",
    country: "Romania",
    countryCode: "🇷🇴",
    logo: "CP",
    logoUrl: "",
    stream: "https://stream1.antenaplay.ro/live/ComedyPlay/playlist.m3u8"
  },

  {
    id: "caritas-tv",
    name: "Cáritas TV",
    category: "Entertainment",
    country: "Paraguay",
    countryCode: "🇵🇾",
    logo: "CTV",
    logoUrl: "",
    stream: "https://rds3.desdeparaguay.net/caritastv/caritastv/playlist.m3u8"
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
    id: "cgtn",
    name: "CGTN",
    category: "News",
    country: "China",
    countryCode: "🇨🇳",
    logo: "CGTN",
    logoUrl: "",
    stream: "https://news.cgtn.com/resource/live/english/cgtn-news.m3u8"
  },

  {
    id: "meridiano-tv",
    name: "Meridiano TV",
    category: "Sports",
    country: "Venezuela",
    countryCode: "🇻🇪",
    logo: "MTV",
    logoUrl: "",
    stream: "https://e1.viginet.vectormax.com:5210/quickstart/114-934-21/index.m3u8"
  },

  {
    id: "fish-tv",
    name: "Fish TV",
    category: "Entertainment",
    country: "Ghana",
    countryCode: "🇬🇭",
    logo: "FTV",
    logoUrl: "",
    stream: "https://tv.localstreamgh.com/fishtv/index.m3u8"
  },
  
  {
    id: "abc-news",
    name: "ABC News",
    category: "News",
    country: "United States",
    stream: "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8",
    logoUrl: "",
    fallbackLogo: "ABC"
  },
  
  {
    id: "france-24",
    name: "France 24 English",
    category: "News",
    country: "France",
    stream: "https://live.france24.com/hls/live/2037218/F24_EN_HI_HLS/master_5000.m3u8",
    logoUrl: "",
    fallbackLogo: "F24"
  },
  
  {
    id: "dw-english",
    name: "DW English",
    category: "News",
    country: "Germany",
    stream: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8",
    logoUrl: "",
    fallbackLogo: "DW"
  },
  
  {
    id: "al-jazeera-english",
    name: "Al Jazeera English",
    category: "News",
    country: "Qatar",
    stream: "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8",
    logoUrl: "",
    fallbackLogo: "AJ"
  },
  
  {
    id: "trt-world",
    name: "TRT World",
    category: "News",
    country: "Türkiye",
    stream: "https://api.trtworld.com/livestream/v1/WcM3Oa2LHD9iUjWDSRUI335NkMWVTUV351H56dqC/master.m3u8",
    logoUrl: "",
    fallbackLogo: "TRT"
  },
  
  {
    id: "cgtn-documentary",
    name: "CGTN Documentary",
    category: "Documentary",
    country: "China",
    stream: "https://news.cgtn.com/resource/live/documentary/cgtn-documentary.m3u8",
    logoUrl: "",
    fallbackLogo: "CD"
  },
  
  {
    id: "nbc-news-now",
    name: "NBC News NOW",
    category: "News",
    country: "United States",
    stream: "https://dai2.xumo.com/amagi_hls_data_xumo1212A-xumo-nbcnewsnow/CDN/master.m3u8",
    logoUrl: "",
    fallbackLogo: "NBC"
  }
];
