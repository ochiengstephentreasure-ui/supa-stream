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
    id: "abc-news",
    name: "ABC News",
    category: "News",
    country: "United States",
    stream: "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8",
    logoUrl: "",
    fallbackLogo: "ABC"
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
  id: "bbc-news",
  name: "BBC News",
  category: "News",
  country: "United Kingdom",
  countryCode: "🇬🇧",
  logo: "BBC",
  logoUrl: "",
  stream: "https://vs-cmaf-pushb-ww.live.cf.bbc.co.uk/x=4/dash/ldtv/llp/llp_ww_2_4_8/llp_ww_2_4_8.mpd"
},

{
  id: "euronews-english",
  name: "Euronews English",
  category: "News",
  country: "Europe",
  countryCode: "🇪🇺",
  logo: "EU",
  logoUrl: "",
  stream: "https://euronews-euronews-world-1-eu.rakuten.wurl.tv/playlist.m3u8"
},

{
  id: "news18-india",
  name: "News18 India",
  category: "News",
  country: "India",
  countryCode: "🇮🇳",
  logo: "18",
  logoUrl: "",
  stream: "https://nw18live.cdn.jio.com/bpk-tv/News18_India_BTS/output/index.m3u8"
},

{
  id: "sky-news",
  name: "Sky News",
  category: "News",
  country: "United Kingdom",
  countryCode: "🇬🇧",
  logo: "SKY",
  logoUrl: "",
  stream: "https://skynews-skynews-1-eu.rakuten.wurl.tv/playlist.m3u8"
},

{
  id: "rai-news-24",
  name: "Rai News 24",
  category: "News",
  country: "Italy",
  countryCode: "🇮🇹",
  logo: "Rai",
  logoUrl: "",
  stream: "https://streamcdnb2-rai-it.akamaized.net/hls/live/2033190/rainews24/rainews24_1800k.m3u8"
},

{
  id: "nasa-tv",
  name: "NASA TV Public",
  category: "Science",
  country: "United States",
  countryCode: "🇺🇸",
  logo: "NASA",
  logoUrl: "",
  stream: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master_2000.m3u8"
},

{
  id: "newsmax",
  name: "Newsmax",
  category: "News",
  country: "United States",
  countryCode: "🇺🇸",
  logo: "NM",
  logoUrl: "",
  stream: "https://newsmax-newsmax-1-eu.rakuten.wurl.tv/playlist.m3u8"
},

{
  id: "ntv-news24",
  name: "NTV News24",
  category: "News",
  country: "Japan",
  countryCode: "🇯🇵",
  logo: "NTV",
  logoUrl: "",
  stream: "https://n24-streaming.ntv.co.jp/hls/live/2018695/n24/index.m3u8"
},

{
  id: "tv5monde",
  name: "TV5MONDE",
  category: "Entertainment",
  country: "France",
  countryCode: "🇫🇷",
  logo: "TV5",
  logoUrl: "",
  stream: "https://tv5monde.akamaized.net/hls/live/2038230/tv5monde/master.m3u8"
},

{
  id: "france-info",
  name: "Franceinfo",
  category: "News",
  country: "France",
  countryCode: "🇫🇷",
  logo: "FI",
  logoUrl: "",
  stream: "https://static.france24.com/live/F24_FR_HI_HLS/live_tv.m3u8"
}
  
];
