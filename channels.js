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
   logoUrl: "https://i.imgur.com/LPQfdz2.png",
    stream: "https://yayin1.canlitv.fun/live/kibrisadatv.stream/playlist.m3u8"
  },

  {
    id: "armenia-1",
    name: "Armenia 1",
    category: "Entertainment",
    country: "Armenia",
    countryCode: "🇦🇲",
    logo: "A1",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Armenian_Public_TV_logo_(2021).svg",
    stream: "https://amtv.tulixcdn.com/amtv2/am2abr/index.m3u8"
  },

  {
    id: "red-plus",
    name: "Red+",
    category: "News",
    country: "Colombia",
    countryCode: "🇨🇴",
    logo: "RED+",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_Red_%2B_TV_2026.svg",
    stream: "https://inforedvos.lcdn.claro.net.co/Content/HLS_HLS_DIR/Live/channel(REDMASHDWEB)/master.m3u8"
  },

  {
    id: "canal-24-horas",
    name: "Canal 24 Horas",
    category: "News",
    country: "Spain",
    countryCode: "🇪🇸",
    logo: "24H",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/24h_2026.svg",
    stream: "https://ztnr.rtve.es/ztnr/1694255.m3u8"
  },

  {
    id: "nhk-world-japan",
    name: "NHK World-Japan",
    category: "News",
    country: "Japan",
    countryCode: "🇯🇵",
    logo: "NHK",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/NHK_World.svg",
    stream: "https://masterpl.hls.nhkworld.jp/hls/w/live/smarttv.m3u8"
  },

  {
    id: "arirang-tv",
    name: "Arirang TV",
    category: "Entertainment",
    country: "South Korea",
    countryCode: "🇰🇷",
    logo: "AR",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Arirang_logo.png",
    stream: "https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8"
  },

  {
    id: "bbs-tv",
    name: "BBS TV",
    category: "News",
    country: "Uganda",
    countryCode: "🇺🇬",
    logo: "BBS",
    logoUrl: "https://seeklogo.com/images/B/bbs-terefayina-logo-7C8C1D0E1E-seeklogo.com.png",
    stream: "https://bbstv.ug/hls/ch01/index.m3u8"
  },

  {
    id: "gb-news",
    name: "GB News",
    category: "News",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "GB",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/GB-News-Logo.png",
    stream: "https://hlspackager.akamaized.net/live/DB/GB_NEWS/HLS/GB_NEWS.m3u8"
  },

  {
    id: "bloomberg-tv",
    name: "Bloomberg TV",
    category: "Business",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "B",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bloomberg_Television_logo.svg",
    stream: "https://bloomberg.com/media-manifest/streams/asia.m3u8"
  },

  {
    id: "janta-tv",
    name: "Janta TV",
    category: "News",
    country: "India",
    countryCode: "🇮🇳",
    logo: "JT",
    logoUrl: "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/Janta%20TV.png",
    stream: "https://live.jswk.online/IK_RTPM/live/index.m3u8"
  },

  {
    id: "mrtv-news",
    name: "MRTV News",
    category: "News",
    country: "Myanmar",
    countryCode: "🇲🇲",
    logo: "MN",
   logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Mrtvnews.png",
    stream: "https://mrtvott.com/cache/MRTV-NEWS-HD/master.m3u8"
  },

  {
    id: "abc-news",
    name: "ABC News",
    category: "News",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "ABC",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Abc-news-logo.png",
    stream: "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8"
  },

  {
    id: "dw-english",
    name: "DW English",
    category: "News",
    country: "Germany",
    countryCode: "🇩🇪",
    logo: "DW",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsche_Welle_Logo.svg",
    stream: "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
  },

  {
    id: "al-jazeera-english",
    name: "Al Jazeera English",
    category: "News",
    country: "Qatar",
    countryCode: "🇶🇦",
    logo: "AJ",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Aljazeera_eng.svg",
    stream: "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8"
  },

  {
    id: "otv-ghana",
    name: "OTV",
    category: "Entertainment",
    country: "Ghana",
    countryCode: "🇬🇭",
    logo: "OTV",
   logoUrl: "https://i.imgur.com/7XKQW5Y.png",
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
    id: "9xm",
    name: "9XM",
    category: "Entertainment",
    country: "India",
    countryCode: "🇮🇳",
    logo: "9XM",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/9XMHindiMusicTelevisionChannelLogo.jpg",
    stream: "https://9xjio.wiseplayout.com/9XM/master.m3u8"
  },

  {
    id: "3abn-kids-network",
    name: "3ABN Kids Network",
    category: "Entertainment",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "3K",
    logoUrl: "https://www.tvlogo.org/united-states/3abn-kids-network-us.png",
    stream: "https://3abn.bozztv.com/3abn2/Kids_live/smil:Kids_live.smil/playlist.m3u8"
  },

  {
    id: "afarin-baxcha",
    name: "Afarin Baxcha",
    category: "Entertainment",
    country: "Iran",
    countryCode: "🇮🇷",
    logo: "AB",
  logoUrl: "https://i.postimg.cc/4xRkBDRx/Afarin-Baxcha-200.png",
    stream: "https://5dcabf026b188.streamlock.net/afarinTV/livestream/playlist.m3u8"
  },

  {
    id: "ebs-hd",
    name: "EBS HD",
    category: "Entertainment",
    country: "Ethiopia",
    countryCode: "🇪🇹",
    logo: "EBS",
  logoUrl: "/assets/logos/ebs-tv.png",
    stream: "https://rpn.bozztv.com/ebstv/ebstv/index.m3u8"
  },

  {
    id: "aruba-tv",
    name: "Aruba.TV",
    category: "Entertainment",
    country: "Aruba",
    countryCode: "🇦🇼",
    logo: "ATV",
    logoUrl: "https://i.imgur.com/9fWY09U.png",
    stream: "https://cdn01.setar.aw/Canal49/canal49/playlist.m3u8"
  },

  {
    id: "tv-exitos",
    name: "TV Éxitos",
    category: "Entertainment",
    country: "Dominican Republic",
    countryCode: "🇩🇴",
    logo: "TVE",
logoUrl: "https://i.imgur.com/ahz7X7u.png",
    stream: "https://streaming.grupomediosdelnorte.com:19360/tvexitos/tvexitos.m3u8"
  },

  {
    id: "trace-urban-australia",
    name: "Trace Urban",
    category: "Entertainment",
    country: "Australia",
    countryCode: "🇦🇺",
    logo: "TU",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Trace_Urban_logo_2010.svg",
    stream: "https://lightning-traceurban-samsungau.amagi.tv/playlist.m3u8"
  },

  {
    id: "rtv-zenica",
    name: "RTV Zenica",
    category: "News",
    country: "Bosnia and Herzegovina",
    countryCode: "🇧🇦",
    logo: "RTV",
    logoUrl: "https://i.imgur.com/TKUaflB.png",
    stream: "https://stream.rtvze.ba/live/123/123.m3u8"
  },

  {
    id: "canal-3-la-pampa",
    name: "Canal 3 La Pampa",
    category: "News",
    country: "Argentina",
    countryCode: "🇦🇷",
    logo: "C3",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_Canal_3_La_Pampa.png",
    stream: "https://stream.arcast.com.ar/c3lapampa/ngrp:c3lapampa_all/playlist.m3u8"
  },

  {
    id: "konya-olay-tv",
    name: "Konya Olay TV",
    category: "News",
    country: "Türkiye",
    countryCode: "🇹🇷",
    logo: "KOT",
    logoUrl: "https://www.konyaolaytv.com/upload/tema/20230307__5154687762.jpg",
    stream: "https://live.artidijitalmedya.com/artidijital_konyaolaytv/konyaolaytv/playlist.m3u8"
  },

  {
    id: "sportsgrid",
    name: "SportsGrid",
    category: "Sports",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "SG",
    logoUrl: "https://i.imgur.com/ulGKX30.png",
    stream: "https://sportsgrid-plex.amagi.tv/playlist.m3u8"
  },

  {
    id: "canal-sur-andalucia",
    name: "Canal Sur Andalucía",
    category: "News",
    country: "Spain",
    countryCode: "🇪🇸",
    logo: "CSA",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Canal_Sur_Andaluc%C3%ADa.png",
    stream: "https://dfk2a268yviz9.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-ddiii1m6jt6of/CanalSurAndaluciaES.m3u8"
  },

  {
    id: "al-mayadeen",
    name: "Al Mayadeen",
    category: "News",
    country: "Lebanon",
    countryCode: "🇱🇧",
    logo: "AM",
    logoUrl: "https://i.imgur.com/GtQOKeW.png",
    stream: "https://mdnlv.cdn.octivid.com/almdn/smil:mpegts.stream.smil/playlist.m3u8"
  },

  {
    id: "oromar-tv",
    name: "Oromar TV",
    category: "News",
    country: "Ecuador",
    countryCode: "🇪🇨",
    logo: "OTV",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Oromar_logo.png",
    stream: "https://stream.oromar.tv/hls/oromartv_hi/index.m3u8"
  },

  {
    id: "fifa-plus",
    name: "FIFA+",
    category: "Sports",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "F+",
    logoUrl: "https://cdn.simpleicons.org/fifa",
    stream: "https://a62dad94.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWV1X0ZJRkFQbHVzRW5nbGlzaF9ITFM/playlist.m3u8"
  },

  {
    id: "qvc-uk",
    name: "QVC UK",
    category: "Shopping",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "QVC",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Qvc_logo.svg",
    stream: "https://qvcuk-live.akamaized.net/hls/live/2097112/qvc/master.m3u8"
  },

  {
    id: "sky-news-weather",
    name: "Sky News Weather",
    category: "News",
    country: "United Kingdom",
    countryCode: "🇬🇧",
    logo: "SNW",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sky_News_2026.svg",
    stream: "https://distro001-gb-hls1-prd.delivery.skycdp.com/easel_cdn/ngrp:weather_loop.stream_all/playlist.m3u8"
  },

  {
    id: "california-music-channel",
    name: "California Music Channel",
    category: "Entertainment",
    country: "United States",
    countryCode: "🇺🇸",
    logo: "CMC",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/California_Music_Channel_Logo_(cropped).png",
    stream: "https://cmc-cmctv-cineverse.amagi.tv/playlist.m3u8"
  },

  {
    id: "raj-tv",
    name: "Raj TV",
    category: "Entertainment",
    country: "India",
    countryCode: "🇮🇳",
    logo: "RTV",
    logoUrl: "https://i.imgur.com/4oF38ei.png",
    stream: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/2839e3d1e0f84a2e821c1708d5fdfdf0/index.m3u8"
  },

  {
    id: "tvr-cultural",
    name: "TVR Cultural",
    category: "Entertainment",
    country: "Romania",
    countryCode: "🇷🇴",
    logo: "TVR",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/TVR_Cultural_Logo_2022.svg",
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
    logoUrl: "https://www.shopch.jp/com/images/common/logo_2021.png",
    stream: "https://stream3.shopch.jp/HLS/master.m3u8"
  },

  {
    id: "bukedde-tv-1",
    name: "Bukedde TV 1",
    category: "Entertainment",
    country: "Uganda",
    countryCode: "🇺🇬",
    logo: "BTV",
    logoUrl: "https://i.imgur.com/HFq5QlJ.png",
    stream: "https://stream.hydeinnovations.com/bukedde1flussonic/index.m3u8"
  },

  {
    id: "tv-west-uganda",
    name: "TV West",
    category: "Entertainment",
    country: "Uganda",
    countryCode: "🇺🇬",
    logo: "TVW",
    logoUrl: "https://i.imgur.com/EiJzkIz.png",
    stream: "https://stream.hydeinnovations.com/tvwest-flussonic/index.m3u8"
  },

  {
    id: "watan-tv",
    name: "Watan TV",
    category: "News",
    country: "Egypt",
    countryCode: "🇪🇬",
    logo: "WATAN",
    logoUrl: "https://i.imgur.com/pZyKaUH.png",
    stream: "https://rp.tactivemedia.com/watantv_source/live/playlist.m3u8"
  },

  {
    id: "television-canaria",
    name: "Televisión Canaria",
    category: "News",
    country: "Spain",
    countryCode: "🇪🇸",
    logo: "TV CAN",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_de_Televisi%C3%B3n_Canaria.svg",
    stream: "https://d1oyt3v08gcy18.cloudfront.net/index-events.m3u8"
  },

  {
    id: "rtk-3",
    name: "RTK 3",
    category: "News",
    country: "Kosovo",
    countryCode: "🇽🇰",
    logo: "RTK 3",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/RTK3_logo_5ac42bcfd1a4d.png",
    stream: "https://gjirafa-video-live.gjirafa.net/gjvideo-livestream/rtk3/index.m3u8"
  },

  {
    id: "tv-arta",
    name: "TV Arta",
    category: "Entertainment",
    country: "Kosovo",
    countryCode: "🇽🇰",
    logo: "ARTA",
    logoUrl: "https://i.imgur.com/MAhJkK9.png",
    stream: "https://gjirafa-video-live.gjirafa.net/gjvideo-live/mps-vgx-u9p-qv1/index.m3u8"
  },

  {
    id: "bfm2",
    name: "BFM2",
    category: "News",
    country: "France",
    countryCode: "🇫🇷",
    logo: "BFM2",
    logoUrl: "https://fr.themedialeader.com/wp-content/uploads/2024/08/BFM2.jpg",
    stream: "https://d1ib1gsg71oarf.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-scp7wda722jph/BFM2_FR.m3u8"
  },

  {
    id: "otv-lebanon",
    name: "OTV",
    category: "Entertainment",
    country: "Lebanon",
    countryCode: "🇱🇧",
    logo: "OTV",
   logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_wordmark_OTV_(Lebanon)_2025.svg",
    stream: "https://otv.hibridcdn.net/otv/tv_abr/playlist.m3u8"
  },

  {
    id: "cna-albania",
    name: "CNA",
    category: "News",
    country: "Albania",
    countryCode: "🇦🇱",
    logo: "CNA",
    logoUrl: "https://codeit.al/wp-content/uploads/2020/08/cna.png",
    stream: "https://live1.mediadesk.al/cnatvlive.m3u8"
  },

  {
    id: "canal-26-argentina",
    name: "Canal 26",
    category: "News",
    country: "Argentina",
    countryCode: "🇦🇷",
    logo: "C26",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/LogoCanal26.png",
    stream: "https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8"
  },

  {
    id: "horse-and-country-tv",
    name: "Horse & Country TV",
    category: "Sports",
    country: "Australia",
    countryCode: "🇦🇺",
    logo: "H&C",
   logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/86/Horseandcountry.PNG",
    stream: "https://hnc-free-viewlift.amagi.tv/HNC_AUSTRALIA.m3u8"
  },

  {
    id: "real-madrid-tv",
    name: "Real Madrid TV",
    category: "Sports",
    country: "Spain",
    countryCode: "🇪🇸",
    logo: "RM",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Realmadrid_Television_Logo.svg",
    stream: "https://rmtv.akamaized.net/hls/live/2043153/rmtv-es-web/master.m3u8"
  },

  {
    id: "voice-of-lebanon",
    name: "Voice of Lebanon",
    category: "News",
    country: "Lebanon",
    countryCode: "🇱🇧",
    logo: "VOL",
    logoUrl: "https://i.imgur.com/f8WcqRY.png",
    stream: "https://svs.itworkscdn.net/vdltvlive/vdltv.smil/playlist.m3u8"
  },

  {
    id: "radio-karolina-tv",
    name: "Radio Karolina TV",
    category: "Entertainment",
    country: "Serbia",
    countryCode: "🇷🇸",
    logo: "RK",
    logoUrl: "https://i.imgur.com/g2HpLX1.png",
    stream: "https://peer2.tdiradio.com/static/streaming-playlists/hls/4207de1d-52e8-4591-ad9e-218069b864d1/0.m3u8"
  },

  {
    id: "cbs-news-24-7",
    name: "CBS News 24/7",
    category: "News",
    country: "United States",
    countryCode: "US",
    logo: "CBS",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CBS_News_247_logo.svg",
    stream: "https://cbsn-us-vtt.cbsnstream.cbsnews.com/out/v1/ef868690d34144509eda696884bf1619/master.m3u8"
  },

  {
    id: "france-24",
    name: "France 24",
    category: "News",
    country: "France",
    countryCode: "FR",
    logo: "F24",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/France_24_logo_(2013).svg",
    stream: "https://live.france24.com/hls/live/2037222/F24_AR_HI_HLS/master_5000.m3u8"
  },

  {
    id: "al-jazeera-mubasher",
    name: "Al Jazeera Mubasher",
    category: "News",
    country: "Qatar",
    countryCode: "QA",
    logo: "AJM",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/Al_Jazeera_Mubasher_logo.png",
    stream: "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8"
  },

  {
    id: "voa-tv-persian",
    name: "VOA TV Persian",
    category: "News",
    country: "United States",
    countryCode: "US",
    logo: "VOA",
   logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Voice_of_America_logo.svg",
    stream: "https://voa-ingest.akamaized.net/hls/live/2033876/tvmc07/playlist.m3u8"
  },
  {
  id: "20-minutes-tv",
  name: "20 Minutes TV",
  category: "News",
  country: "France",
  countryCode: "🇫🇷",
  logo: "20M",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/20_Minutes_TV_IDF_logo_%282023%29.png/960px-20_Minutes_TV_IDF_logo_%282023%29.png",
  stream: "https://live-20minutestv.digiteka.com/1961167769/index.m3u8"
},
{
  id: "cbc-egypt",
  name: "CBC",
  category: "Entertainment",
  country: "Egypt",
  countryCode: "🇪🇬",
  logo: "CBC",
  logoUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CBC_Logo.png",
  stream: "https://flu.systemnet.tv/CBC/index.m3u8"
},
{
  id: "ebs-plus-1",
  name: "EBS+ 1",
  category: "Education",
  country: "South Korea",
  countryCode: "🇰🇷",
  logo: "EBS+1",
  logoUrl: "https://i.imgur.com/aCeuhon.png",
  stream: "https://ebsonair.ebs.co.kr/plus1familypc/familypc1m/playlist.m3u8"
},
  {
  id: "tele-elx",
  name: "Tele Elx",
  category: "News",
  country: "Spain",
  countryCode: "🇪🇸",
  logo: "TELX",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Logo_completo_TeleElx.png",
  stream: "https://tvdirecto.teleelx.es/stream/teleelx.m3u8"
},
  {
  id: "joax-dtv",
  name: "JOAX-DTV",
  category: "Entertainment",
  country: "Japan",
  countryCode: "🇯🇵",
  logo: "NTV",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nippon_TV_logo_2014.svg/2560px-Nippon_TV_logo_2014.svg.png",
  stream: "https://ntv5.mov3.co/hls/ntv.m3u8"
},
{
  id: "tbs-seoul",
  name: "TBS Seoul",
  category: "News",
  country: "South Korea",
  countryCode: "🇰🇷",
  logo: "TBS",
  logoUrl: "https://tbs.seoul.kr/images/common/logo.png",
  stream: "https://cdntv.tbs.seoul.kr/tbs/tbs_tv_web.smil/playlist.m3u8"
},
{
  id: "acw-ug-tv",
  name: "ACW UG TV",
  category: "Entertainment",
  country: "Uganda",
  countryCode: "🇺🇬",
  logo: "ACW",
  logoUrl: "https://i.imgur.com/8pzEmC.jpeg",
  stream: "https://live.acwugtv.com/hls/stream.m3u8"
},
{
  id: "lana-tv",
  name: "Lana TV",
  category: "Entertainment",
  country: "Lebanon",
  countryCode: "🇱🇧",
  logo: "LANA",
  logoUrl: "https://www.lyngsat.com/logo/tv/ll/lana-tv-lb.png",
  stream: "https://cdn.streamlane.tv/hls/ltv/master.m3u8"
},
{
  id: "mtv-lebanon",
  name: "MTV Lebanon",
  category: "Entertainment",
  country: "Lebanon",
  countryCode: "🇱🇧",
  logo: "MTV",
  logoUrl: "https://i.imgur.com/6R1jFJO.jpg",
  stream: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mtv-lebanon/b8ebb2a5affb812f1541712adde10e26/index.m3u8"
}
];
