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
  id: "ebs-hd",
  name: "EBS HD",
  category: "Entertainment",
  country: "Ethiopia",
  countryCode: "🇪🇹",
  logo: "EBS",
  logoUrl: "",
  stream: "https://rpn.bozztv.com/ebstv/ebstv/index.m3u8"
},
  {
  id: "aruba-tv",
  name: "Aruba.TV",
  category: "Entertainment",
  country: "Aruba",
  countryCode: "🇦🇼",
  logo: "ATV",
  logoUrl: "",
  stream: "https://cdn01.setar.aw/Canal49/canal49/playlist.m3u8"
},
  
  {
  id: "tv-exitos",
  name: "TV Éxitos",
  category: "Entertainment",
  country: "Dominican Republic",
  countryCode: "🇩🇴",
  logo: "TVE",
  logoUrl: "",
  stream: "https://streaming.grupomediosdelnorte.com:19360/tvexitos/tvexitos.m3u8"
},
  
  {
  id: "trace-urban-australia",
  name: "Trace Urban",
  category: "Entertainment",
  country: "Australia",
  countryCode: "🇦🇺",
  logo: "TU",
  logoUrl: "",
  stream: "https://lightning-traceurban-samsungau.amagi.tv/playlist.m3u8"
},
  
{
  id: "rtv-zenica",
  name: "RTV Zenica",
  category: "News",
  country: "Bosnia and Herzegovina",
  countryCode: "🇧🇦",
  logo: "RTV",
  logoUrl: "",
  stream: "https://stream.rtvze.ba/live/123/123.m3u8"
},
  
{
  id: "canal-3-la-pampa",
  name: "Canal 3 La Pampa",
  category: "News",
  country: "Argentina",
  countryCode: "🇦🇷",
  logo: "C3",
  logoUrl: "",
  stream: "https://stream.arcast.com.ar/c3lapampa/ngrp:c3lapampa_all/playlist.m3u8"
},
  
  {
  id: "konya-olay-tv",
  name: "Konya Olay TV",
  category: "News",
  country: "Türkiye",
  countryCode: "🇹🇷",
  logo: "KOT",
  logoUrl: "",
  stream: "https://live.artidijitalmedya.com/artidijital_konyaolaytv/konyaolaytv/playlist.m3u8"
},
  
  {
  id: "sportsgrid",
  name: "SportsGrid",
  category: "Sports",
  country: "United States",
  countryCode: "🇺🇸",
  logo: "SG",
  logoUrl: "",
  stream: "https://sportsgrid-plex.amagi.tv/playlist.m3u8"
},
  
{
  id: "canal-sur-andalucia",
  name: "Canal Sur Andalucía",
  category: "News",
  country: "Spain",
  countryCode: "🇪🇸",
  logo: "CSA",
  logoUrl: "",
  stream: "https://dfk2a268yviz9.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-ddiii1m6jt6of/CanalSurAndaluciaES.m3u8"
},

{
  id: "al-mayadeen",
  name: "Al Mayadeen",
  category: "News",
  country: "Lebanon",
  countryCode: "🇱🇧",
  logo: "AM",
  logoUrl: "",
  stream: "https://mdnlv.cdn.octivid.com/almdn/smil:mpegts.stream.smil/playlist.m3u8"
},
  
  {
  id: "oromar-tv",
  name: "Oromar TV",
  category: "News",
  country: "Ecuador",
  countryCode: "🇪🇨",
  logo: "OTV",
  logoUrl: "",
  stream: "https://stream.oromar.tv/hls/oromartv_hi/index.m3u8"
},
  
  {
    id: "fifa-plus",
    name: "FIFA+",
    category: "Sports",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "F+",
    logoUrl: "",
    stream: "https://a62dad94.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWV1X0ZJRkFQbHVzRW5nbGlzaF9ITFM/playlist.m3u8"
  },

  {
    id: "qvc-uk",
    name: "QVC UK",
    category: "Shopping",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "QVC",
    logoUrl: "",
    stream: "https://qvcuk-live.akamaized.net/hls/live/2097112/qvc/master.m3u8"
  },

  {
    id: "sky-news-weather",
    name: "Sky News Weather",
    category: "News",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "SNW",
    logoUrl: "",
    stream: "https://distro001-gb-hls1-prd.delivery.skycdp.com/easel_cdn/ngrp:weather_loop.stream_all/playlist.m3u8"
  },

  {
    id: "california-music-channel",
    name: "California Music Channel",
    category: "Entertainment",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "CMC",
    logoUrl: "",
    stream: "https://cmc-cmctv-cineverse.amagi.tv/playlist.m3u8"
  },

  {
    id: "raj-tv",
    name: "Raj TV",
    category: "Entertainment",
    country: "India",
    countryCode: "🇮🇳",
    logo: "RTV",
    logoUrl: "",
    stream: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/2839e3d1e0f84a2e821c1708d5fdfdf0/index.m3u8"
  },

  {
    id: "tvr-cultural",
    name: "TVR Cultural",
    category: "Entertainment",
    country: "Romania",
    countryCode: "🇷🇴",
    logo: "TVR",
    logoUrl: "",
    stream: "https://tvr-cultural.lg.mncdn.com/tvrcultural/smil:tvrcultural.smil/chunklist_b5160000.m3u8"
  },

  {
    id: "go-tv",
    name: "GO TV",
    category: "Entertainment",
    country: "Paraguay",
    countryCode: "🇵🇾",
    logo: "GO",
    logoUrl: "",
    stream: "https://rds3.desdeparaguay.net/gotv/gotv/playlist.m3u8"
  },
  
{
  id: "shop-channel-japan",
  name: "Shop Channel",
  category: "Shopping",
  country: "Japan",
  countryCode: "🇯🇵",
  logo: "SHOP",
  logoUrl: "",
  stream: "https://stream3.shopch.jp/HLS/master.m3u8"
},
  
{
  id: "bukedde-tv-1",
  name: "Bukedde TV 1",
  category: "Entertainment",
  country: "Uganda",
  countryCode: "🇺🇬",
  logo: "BTV",
  logoUrl: "",
  stream: "https://stream.hydeinnovations.com/bukedde1flussonic/index.m3u8"
},
  
{
  id: "tv-west-uganda",
  name: "TV West",
  category: "Entertainment",
  country: "Uganda",
  countryCode: "🇺🇬",
  logo: "TVW",
  logoUrl: "",
  stream: "https://stream.hydeinnovations.com/tvwest-flussonic/index.m3u8"
},

{
  id: "watan-tv",
  name: "Watan TV",
  category: "News",
  country: "Egypt",
  countryCode: "🇪🇬",
  logo: "WATAN",
  logoUrl: "",
  stream: "https://rp.tactivemedia.com/watantv_source/live/playlist.m3u8"
},
{
  id: "television-canaria",
  name: "Televisión Canaria",
  category: "News",
  country: "Spain",
  countryCode: "🇪🇸",
  logo: "TV CAN",
  logoUrl: "",
  stream: "https://d1oyt3v08gcy18.cloudfront.net/index-events.m3u8"
},
{
  id: "rtk-3",
  name: "RTK 3",
  category: "News",
  country: "Kosovo",
  countryCode: "🇽🇰",
  logo: "RTK 3",
  logoUrl: "",
  stream: "https://gjirafa-video-live.gjirafa.net/gjvideo-livestream/rtk3/index.m3u8"
},
{
  id: "tv-arta",
  name: "TV Arta",
  category: "Entertainment",
  country: "Kosovo",
  countryCode: "🇽🇰",
  logo: "ARTA",
  logoUrl: "",
  stream: "https://gjirafa-video-live.gjirafa.net/gjvideo-live/mps-vgx-u9p-qv1/index.m3u8"
},

{
  id: "bfm2",
  name: "BFM2",
  category: "News",
  country: "France",
  countryCode: "🇫🇷",
  logo: "BFM2",
  logoUrl: "",
  stream: "https://d1ib1gsg71oarf.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-scp7wda722jph/BFM2_FR.m3u8"
},
  
{
  id: "otv-lebanon",
  name: "OTV",
  category: "Entertainment",
  country: "Lebanon",
  countryCode: "🇱🇧",
  logo: "OTV",
  logoUrl: "",
  stream: "https://otv.hibridcdn.net/otv/tv_abr/playlist.m3u8"
},
{
  id: "cna-albania",
  name: "CNA",
  category: "News",
  country: "Albania",
  countryCode: "🇦🇱",
  logo: "CNA",
  logoUrl: "",
  stream: "https://live1.mediadesk.al/cnatvlive.m3u8"
},

{
  id: "canal-26-argentina",
  name: "Canal 26",
  category: "News",
  country: "Argentina",
  countryCode: "🇦🇷",
  logo: "C26",
  logoUrl: "",
  stream: "https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8"
},
{
  id: "net-tv-argentina",
  name: "Net TV",
  category: "Entertainment",
  country: "Argentina",
  countryCode: "🇦🇷",
  logo: "NET",
  logoUrl: "",
  stream: "https://unlimited1-us.dps.live/nettv/nettv.smil/playlist.m3u8"
}
];



