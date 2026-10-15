import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  kurdishXoshWeb: string;
  xoshChatApp: string;
  kdidRooms: string;
  productionGuide: string;
  safety: string;
  settings: string;
  github: string;
  download: string;
  profile: string;

  // Status
  statusDisconnected: string;
  statusConnecting: string;
  statusConnected: string;
  statusError: string;
  zeroBotsNotice: string;
  zeroBotsBadge: string;

  // Web Portal
  webHeroTitle: string;
  webHeroSubtitle: string;
  webExplanationTitle: string;
  webExplanationText: string;
  whatIsXoshChatTitle: string;
  whatIsXoshChatDesc: string;
  featureBubbleTitle: string;
  featureBubbleDesc: string;
  featureKdidTitle: string;
  featureKdidDesc: string;
  featureSafetyTitle: string;
  featureSafetyDesc: string;
  webExploreRoomsCta: string;
  openMobileAppCta: string;

  // Server System Specs (10,000 servers, 52 players max)
  serverCapacitySpec: string;
  serverFullError: string;
  allServersFullError: string;
  findAvailableServerBtn: string;
  autoAssignServerDesc: string;
  serverFullBadge: string;
  serverOpenBadge: string;
  serverFormatExplainer: string;

  // App & Floating Bubble
  floatingBubbleTitle: string;
  minimizeBubble: string;
  expandBubble: string;
  currentRoomLabel: string;
  appIdLabel: string;
  changeProfile: string;
  robloxUsernameLabel: string;
  enterRobloxUsernamePlaceholder: string;
  lookupRobloxProfileBtn: string;
  lookingUpRoblox: string;
  robloxAccountVerified: string;
  robloxAccountNotFound: string;
  noBotsDisclaimer: string;
  ownershipVerificationTitle: string;
  ownershipVerificationDesc: string;
  copyVerificationCode: string;
  codeCopied: string;
  saveProfile: string;
  typeMessagePlaceholder: string;
  sendBtn: string;
  quickPhrasesTitle: string;
  overlayNotSupportedNotice: string;
  overlaySupportedNotice: string;
  toggleOverlayMode: string;
  noMessagesInRoom: string;

  // KDID Rooms
  kdidRoomsTitle: string;
  kdidRoomsSubtitle: string;
  enterKdidCodeLabel: string;
  joinRoomBtn: string;
  createRoomBtn: string;
  activeRoomsList: string;
  robloxExperienceNotice: string;
  robloxServerNameLabel: string;
  activePlayersLabel: string;

  // Moderation & Safety Modal
  moderationTitle: string;
  moderationSubtitle: string;
  reportUserBtn: string;
  blockUserBtn: string;
  unblockBtn: string;
  noBlockedUsers: string;
  blockedUsersTitle: string;
  reportModalTitle: string;
  reportReasonLabel: string;
  reportReasonHarassment: string;
  reportReasonSpam: string;
  reportReasonInappropriate: string;
  reportReasonScam: string;
  submitReportBtn: string;
  cancelBtn: string;
  reportSubmittedSuccess: string;
  rateLimitWarning: string;
  filteredNotice: string;
  robloxFilterNotice: string;

  // Welcome & Permissions Modal
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeExplainer: string;
  permissionNotificationTitle: string;
  permissionNotificationDesc: string;
  permissionOverlayTitle: string;
  permissionOverlayDesc: string;
  permissionRobloxTitle: string;
  permissionRobloxDesc: string;
  continueBtn: string;

  // Download Modal
  downloadModalTitle: string;
  downloadModalDesc: string;
  pwaOptionTitle: string;
  pwaOptionDesc: string;
  windowsOptionTitle: string;
  windowsOptionDesc: string;
  androidOptionTitle: string;
  androidOptionDesc: string;
  githubRepoTitle: string;
  githubRepoDesc: string;

  // Production Guide
  prodGuideTitle: string;
  prodGuideSubtitle: string;
  githubPagesStepTitle: string;
  androidPermsStepTitle: string;
  robloxComplianceStepTitle: string;
  closeBtn: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  ckb: {
    appName: 'کوردیش خۆش و خۆش چات',
    appSubtitle: 'ماڵپەڕی فەرمی و هاوەڵی زیرەکی پەیوەندیکردن',
    kurdishXoshWeb: 'ماڵپەڕی کوردیش خۆش',
    xoshChatApp: 'ئەپڵیکەیشنی خۆش چات',
    kdidRooms: 'سێرڤەرەکانی KDID',
    productionGuide: 'ڕێبەری بڵاوکردنەوە لە GitHub',
    safety: 'پارێزراوی و یاساکان',
    settings: 'ڕێکخستنەکان',
    github: 'کۆد لە GitHub',
    download: 'داگرتنی خۆش چات',
    profile: 'هەژماری ڕۆبڵۆکس و ناسنامە',

    statusDisconnected: 'پەیوەست نەکراوە',
    statusConnecting: 'لە پەیوەندیکردندایە...',
    statusConnected: 'پەیوەندی بەسترا',
    statusError: 'هەڵە لە پەیوەستبوون',
    zeroBotsNotice: 'تەواو بەبێ بۆت: تەنها یاریزانانی ڕاستەقینەی ناو ئەپ پەیام دەنێرن',
    zeroBotsBadge: 'بێ بۆت و ساختەکاری',

    webHeroTitle: 'کوردیش خۆش وێب و خۆش چات',
    webHeroSubtitle: 'ماڵپەڕی فەرمی سێرڤەرەکانی کوردیش خۆش (تا ١٠،٠٠٠ سێرڤەر، هەر سێرڤەرێک ٥٢ یاریزان) و چاتی بڵقی بە کوردی، عەرەبی و ئینگلیزی.',
    webExplanationTitle: 'سیستەمی سێرڤەرەکانی KDID چییە؟',
    webExplanationText: 'کوردیش خۆش تا ١٠،٠٠٠ سێرڤەری چالاک لەخۆدەگرێت بە شێوازی KDID-0001 تا KDID-10000. هەر سێرڤەرێک تا ٥٢ یاریزانی ڕاستەقینە لەخۆدەگرێت (نموونە KDID-1824 بە توانستی ٣٧/٥٢). لە کاتی پڕبوونی سێرڤەردا، سیستمەکە بە شێوەیەکی خودکار سێرڤەرێکی بەردەستت بۆ دەدۆزێتەوە.',
    whatIsXoshChatTitle: 'چۆن کار دەکات؟',
    whatIsXoshChatDesc: 'هەر سێرڤەرێک ناسنامەیەکی تایبەتی هەیە (KDID-XXXX). کاتێک دەچیتە ناو هەمان سێرڤەر لەگەڵ هاوڕێکانت، هەموو پەیامەکان بە ڕاستەوخۆ دەبینیت بە وێنەی فەرمی ڕۆبڵۆکس.',
    featureBubbleTitle: 'بڵقی چاتی سەر شاشە (Floating Bubble)',
    featureBubbleDesc: 'چاتی سووک و خێرا کە توانستی سێرڤەرەکە (X/52) پیشان دەدات لە کاتی یاریکردندا.',
    featureKdidTitle: 'سیستەمی ١٠،٠٠٠ سێرڤەری KDID',
    featureKdidDesc: 'بەستنەوەی ڕاستەوخۆ بە کۆدە پێناسییەکان لە KDID-0001 تا KDID-10000 بە قەبارەی تەواوی ٥٢ یاریزان.',
    featureSafetyTitle: 'تەواو پابەند بە یاساکانی ڕۆبڵۆکس',
    featureSafetyDesc: 'جێبەجێکردنی سنووری سێرڤەر و فلتەری دەق لەسەر باکئیند بۆ دڵنیابوون لە پارێزراوی.',
    webExploreRoomsCta: 'گەڕان لە سێرڤەرەکان',
    openMobileAppCta: 'تاقیکردنەوەی ئەپی خۆش چات',

    serverCapacitySpec: 'سیستەمی سێرڤەر: تا ١٠،٠٠٠ سێرڤەر · ٥٢ یاریزان لە هەر سێرڤەرێکدا',
    serverFullError: 'ئەم سێرڤەرە پڕ بووە (٥٢/٥٢ یاریزان). تکایە بچۆ ناو سێرڤەرێکی تر.',
    allServersFullError: 'هەموو ١٠،٠٠٠ سێرڤەرەکەی کوردیش خۆش ئێستا پڕن (٥٢/٥٢). تکایە کەمێک چاوەڕوان بە تا شوێن بەتاڵ دەبێت.',
    findAvailableServerBtn: 'دۆزینەوەی سێرڤەری بەردەست',
    autoAssignServerDesc: 'دروستکردنی خودکاری سێرڤەری نوێ بە کۆدی بەردەست (KDID-0001 تا KDID-10000)',
    serverFullBadge: 'پڕە (٥٢/٥٢)',
    serverOpenBadge: 'بەردەستە',
    serverFormatExplainer: 'کۆدی سێرڤەرەکان بە پێوانەی KDID-0001 تا KDID-10000 دیاری دەکرێن. KDID-1824 نموونەیەکە.',

    floatingBubbleTitle: 'خۆش چات — بڵقی سەر شاشە',
    minimizeBubble: 'بچووککردنەوەی بڵق',
    expandBubble: 'کردنەوەی چات',
    currentRoomLabel: 'کۆدی سێرڤەر (Server ID):',
    appIdLabel: 'ناسنامەی یەکتا (App ID):',
    changeProfile: 'هەژماری ڕۆبڵۆکس',
    robloxUsernameLabel: 'ناوی بەکارهێنەری ڕۆبڵۆکس (Roblox Username):',
    enterRobloxUsernamePlaceholder: 'ناوی هەژماری ڕۆبڵۆکسەکەت بنووسە...',
    lookupRobloxProfileBtn: 'پشکنین و هێنانی وێنەی ڕۆبڵۆکس',
    lookingUpRoblox: 'لە پشکنین و هێناندایە...',
    robloxAccountVerified: 'هەژماری فەرمی ڕۆبڵۆکس دۆزرایەوە و وێنەکە بارکرا',
    robloxAccountNotFound: 'هەژماری ڕۆبڵۆکس بەم ناوە نەدۆزرایەوە. تکایە پیتەکان بە تەواوی بنووسە.',
    noBotsDisclaimer: 'ئەم ئەپە بە تەواوی خاڵییە لە بۆت و پەیامی ئۆتۆماتیکی. تەنها یاریزانانی ڕاستەقینە لێرە دەپەیڤن.',
    ownershipVerificationTitle: 'پشتڕاستکردنەوەی خاوەندارێتی هەژمار لە یارییەکە',
    ownershipVerificationDesc: 'بۆ دڵنیابوون لەوەی ئەم هەژمارە موڵکی خۆتە، ئەم کۆدە لە ناو یاریی کوردیش خۆش بنووسە:',
    copyVerificationCode: 'کۆپیکردنی کۆد',
    codeCopied: 'کۆدەکە کۆپی کرا!',
    saveProfile: 'پاشەکەوتکردنی هەژمار و پڕۆفایل',
    typeMessagePlaceholder: 'پەیامەکەت بنووسە بە کوردی، عەرەبی یان English...',
    sendBtn: 'ناردن',
    quickPhrasesTitle: 'پەیامی خێرا:',
    overlayNotSupportedNotice: 'ئەگەر ئامێرەکەت ڕێگری لە دەرکەوتنی بڵقی سەر شاشە دەکات، ئەپەکە ڕاستەوخۆ دەچێتە سەر چاتی ئاسایی ناوخۆیی.',
    overlaySupportedNotice: 'بڵقی چاتی سەر شاشە چالاکە بە وێنەی فەرمی ڕۆبڵۆکسەکەت.',
    toggleOverlayMode: 'شێوازی بڵقی سەر شاشە (Overlay Mode)',
    noMessagesInRoom: 'هیچ پەیامێک لەم سێرڤەرەدا نییە. وەک یەکەم یاریزانی ڕاستەقینە سڵاو بکە!',

    kdidRoomsTitle: 'سێرڤەرەکانی کوردیش خۆش (KDID)',
    kdidRoomsSubtitle: 'کۆدی سێرڤەرەکەت لە ناو یاریی کوردیش خۆش ببینە و لێرە تێیبنووسە (توانستی هەر سێرڤەرێک ٥٢ یاریزانە).',
    enterKdidCodeLabel: 'کۆدی سێرڤەری KDID (نموونە: KDID-0001 یان KDID-1824):',
    joinRoomBtn: 'چوونە سێرڤەر',
    createRoomBtn: 'دروستکردنی سێرڤەری نوێ (تا ١٠،٠٠٠)',
    activeRoomsList: 'سێرڤەرە چالاکەکانی کوردیش خۆش',
    robloxExperienceNotice: 'کۆدی سێرڤەری KDID ڕاستەوخۆ لەسەر شاشەی یاریی کوردیش خۆش نیشان دەدرێت بۆ ناسینەوەی سێرڤەرەکە.',
    robloxServerNameLabel: 'ناوی سێرڤەر',
    activePlayersLabel: 'یاریزانە ڕاستەقینە بەشداربووەکان',

    moderationTitle: 'ناوەندی پارێزراوی و مۆدێرەیشن',
    moderationSubtitle: 'یاساکانی کۆمەڵگە، دژە-ساختەکاری و سنووری سێرڤەرەکان',
    reportUserBtn: 'سکاڵا',
    blockUserBtn: 'بلۆککردن',
    unblockBtn: 'لابردنی بلۆک',
    noBlockedUsers: 'هیچ یاریزانێک بلۆک نەکراوە.',
    blockedUsersTitle: 'لیستی یاریزانە بلۆککراوەکان',
    reportModalTitle: 'ناردنی سکاڵا لەسەر بەکارهێنەر',
    reportReasonLabel: 'هۆکاری سکاڵاکە هەڵبژێرە:',
    reportReasonHarassment: 'بێزارکردن یان جنێودان',
    reportReasonSpam: 'سپام و دووبارەکردنەوەی پەیام',
    reportReasonInappropriate: 'قسەی نەشیاو یان نەگونجاو بۆ منداڵان',
    reportReasonScam: 'فێڵکردن، ڕۆبۆکس یان ساختەکاری',
    submitReportBtn: 'ناردنی سکاڵا',
    cancelBtn: 'پەشیمانبوونەوە',
    reportSubmittedSuccess: 'سکاڵاکەت بە سەرکەوتوویی تۆمارکرا. سوپاس بۆ پاراستنی ژینگەی یارییەکە.',
    rateLimitWarning: 'تکایە ١.٥ چرکە بووەستە پێش ناردنی پەیامی دووەم.',
    filteredNotice: 'پەیام فلتەرکرا بەپێی پێوەرەکانی پارێزراوی.',
    robloxFilterNotice: 'هەموو پەیامەکان بە پێوەری پارێزراوی تێدەپەڕن بۆ گونجاندن لەگەڵ ڕێنماییەکانی سەلامەتی یاریزانانی ڕۆبڵۆکس.',

    welcomeTitle: 'بەخێربێن بۆ Xosh Chat',
    welcomeSubtitle: 'ئەپی هاوەڵی فەرمی یاریی ڕۆبڵۆکسی کوردیش خۆش',
    welcomeExplainer: 'بەخێربێن بۆ سیستەمی سێرڤەرەکانی کوردیش خۆش (تا ١٠،٠٠٠ سێرڤەر، هەر سێرڤەرێک ٥٢ یاریزان). بەبێ بۆت یان پەیامی ساختە.',
    permissionNotificationTitle: 'ئاگادارکردنەوەکان (Notifications)',
    permissionNotificationDesc: 'بۆ ئاگادارکردنەوەت کاتێک هاوڕێکانت داوەتت دەکەن یان پەیام دەنێرن لە سێرڤەردا.',
    permissionOverlayTitle: 'دۆخی پەنجەرەی سەر شاشە (Overlay Mode)',
    permissionOverlayDesc: 'ڕێگەدان بە دەرکەوتنی بڵقی چات بە شێوەیەکی کەم لە کاتی بەکارهێنانی ئامێرەکەت (ئارەزوومەندانەیە).',
    permissionRobloxTitle: 'هاوئاهەنگی سێشن بە کۆدی کاتی',
    permissionRobloxDesc: 'پەیوەستبوون تەنها لە ڕێگەی کۆدی کاتی دەبێت بەبێ داواکردنی وشەی نهێنی یان هەژماری کەسی.',
    continueBtn: 'بەردەوامبوون بۆ ناو ئەپەکە',

    downloadModalTitle: 'داگرتن و دامەزراندنی خۆش چات',
    downloadModalDesc: 'خۆش چات پڕۆژەیەکی سەرچاوەکراوەیە (Open Source) کە دەتوانیت لەسەر ئەندرۆید و ویندۆز بەکاریبهێنیت.',
    pwaOptionTitle: 'وەک ئەپڵیکەیشن (PWA) دایمەزرێنە',
    pwaOptionDesc: 'دەتوانیت ڕاستەوخۆ لە وێبگەڕەکەتەوە (Chrome/Edge) دایمەزرێنیت بۆ سەر شاشەی مۆبایل یان کۆمپیوتەر.',
    windowsOptionTitle: 'وەشانی Windows (Desktop)',
    windowsOptionDesc: 'دەتوانیت کۆدەکەی لە ڕێگەی Electron یان Tauri بیبەستیتەوە بەپێی ڕێنماییەکانی ناو فایلی README.',
    androidOptionTitle: 'وەشانی Android APK',
    androidOptionDesc: 'دەتوانیت بە فەرمانی Capacitor ڕاستەوخۆ فایلی APK دروستبکەیت بۆ بەکارهێنان لەسەر مۆبایل.',
    githubRepoTitle: 'کۆدەکانی پڕۆژە لە GitHub',
    githubRepoDesc: 'سەرچاوەی تەواوی پڕۆژەکە ببینە لەگەڵ بەڵگەنامەکانی چۆنیەتی دروستکردن و کارپێکردن.',

    prodGuideTitle: 'ڕێبەری بڵاوکردنەوە لە GitHub Pages و Android',
    prodGuideSubtitle: 'هەنگاو بە هەنگاو بۆ بڵاوکردنەوەی ماڵپەڕەکە و بەستنەوەی ئەندرۆید و ڕۆبڵۆکس بۆ بەرهەمهێنان',
    githubPagesStepTitle: '١. بڵاوکردنەوەی وێبسایت لەسەر GitHub Pages',
    androidPermsStepTitle: '٢. مۆڵەتەکانی ئەندرۆید بۆ بڵقی سەر شاشە (Floating Overlay)',
    robloxComplianceStepTitle: '٣. بەستنەوەی فەرمی بە ڕۆبڵۆکس (Roblox Open Cloud)',
    closeBtn: 'داخستن',
  },

  en: {
    appName: 'Kurdish Xosh Web and Xosh Chat',
    appSubtitle: 'Official Website & Smart Communication Companion',
    kurdishXoshWeb: 'Kurdish Xosh Web',
    xoshChatApp: 'Xosh Chat App',
    kdidRooms: 'KDID Servers',
    productionGuide: 'GitHub & Release Guide',
    safety: 'Safety & Compliance',
    settings: 'Settings',
    github: 'Source on GitHub',
    download: 'Download Xosh Chat',
    profile: 'Roblox Account & ID',

    statusDisconnected: 'Disconnected',
    statusConnecting: 'Connecting...',
    statusConnected: 'Connected',
    statusError: 'Connection Error',
    zeroBotsNotice: 'Zero Bots Enforced: Only real verified players participate',
    zeroBotsBadge: 'Zero Bots Guaranteed',

    webHeroTitle: 'Kurdish Xosh Web & Xosh Chat',
    webHeroSubtitle: 'Official portal for Kurdish Xosh (supporting up to 10,000 servers, 52 players each) with real Roblox avatars and floating bubble chat.',
    webExplanationTitle: 'How the KDID Server System Works',
    webExplanationText: 'Kurdish Xosh supports a maximum of 10,000 total servers numbered KDID-0001 through KDID-10000. Each server has a hard capacity limit of 52 players (e.g. KDID-1824 (37/52)). When a server reaches 52 players, the backend blocks overcrowding and automatically directs players to an open available server.',
    whatIsXoshChatTitle: 'Server Architecture',
    whatIsXoshChatDesc: 'Every server has a unique sequential ID. Joining the same server code unites you with real players currently playing in that Kurdish Xosh instance.',
    featureBubbleTitle: 'Floating Chat Bubble',
    featureBubbleDesc: 'Overlay bubble displaying your server ID and capacity status (X/52) without leaving the Roblox game.',
    featureKdidTitle: '10,000 Server Network',
    featureKdidDesc: 'Sequential unique IDs from KDID-0001 to KDID-10000 with real-time player occupancy tracking.',
    featureSafetyTitle: 'Backend Capacity & Safety',
    featureSafetyDesc: 'Strict backend enforcement of 52 players per server and 10,000 server limit with TextChatService filtering.',
    webExploreRoomsCta: 'Explore Servers',
    openMobileAppCta: 'Launch Xosh Chat App',

    serverCapacitySpec: 'Server System: Up to 10,000 servers · 52 players max each',
    serverFullError: 'This server is full (52/52 players). Please select or join another available server.',
    allServersFullError: 'All 10,000 Kurdish Xosh servers are currently full (52/52 players each). Please wait for a player to leave.',
    findAvailableServerBtn: 'Quick Join Available Server',
    autoAssignServerDesc: 'Automatically assigns the next available sequential server ID (KDID-0001 to KDID-10000)',
    serverFullBadge: 'FULL (52/52)',
    serverOpenBadge: 'OPEN',
    serverFormatExplainer: 'Server IDs follow the format KDID-0001 through KDID-10000. KDID-1824 is one example.',

    floatingBubbleTitle: 'Xosh Chat — Floating Bubble',
    minimizeBubble: 'Minimize Bubble',
    expandBubble: 'Expand Bubble',
    currentRoomLabel: 'Server ID:',
    appIdLabel: 'Unique App ID:',
    changeProfile: 'Roblox Account Profile',
    robloxUsernameLabel: 'Roblox Username:',
    enterRobloxUsernamePlaceholder: 'e.g. Builderman, YourRobloxUser...',
    lookupRobloxProfileBtn: 'Lookup & Fetch Avatar',
    lookingUpRoblox: 'Contacting Roblox API...',
    robloxAccountVerified: 'Roblox account verified & headshot avatar loaded',
    robloxAccountNotFound: 'Roblox user not found. Please verify exact username spelling.',
    noBotsDisclaimer: 'This application is strictly human-only. Zero bots or simulated replies exist in any room.',
    ownershipVerificationTitle: 'In-Game Ownership Verification',
    ownershipVerificationDesc: 'To confirm you own this Roblox account in Kurdish Xosh, enter this verification code in the in-game prompt:',
    copyVerificationCode: 'Copy Verification Code',
    codeCopied: 'Code copied!',
    saveProfile: 'Save & Confirm Profile',
    typeMessagePlaceholder: 'Type a message in Kurdish, Arabic, or English...',
    sendBtn: 'Send',
    quickPhrasesTitle: 'Quick greetings:',
    overlayNotSupportedNotice: 'If system overlay permission is unavailable or restricted on this device, the app falls back seamlessly to the integrated in-app chat interface.',
    overlaySupportedNotice: 'Floating overlay is active with your verified Roblox avatar.',
    toggleOverlayMode: 'Floating Overlay Mode',
    noMessagesInRoom: 'No messages yet in this server. Be the first real player to say hello!',

    kdidRoomsTitle: 'KDID Server Rooms',
    kdidRoomsSubtitle: 'Locate the KDID code displayed inside Kurdish Xosh and enter it here (Max 52 players per server, 10,000 servers total).',
    enterKdidCodeLabel: 'Enter Server ID (e.g. KDID-0001 or KDID-1824):',
    joinRoomBtn: 'Join Server',
    createRoomBtn: 'Create New Server (Max 10,000)',
    activeRoomsList: 'Active Kurdish Xosh Servers',
    robloxExperienceNotice: 'The KDID server ID is displayed in your game HUD inside Kurdish Xosh (e.g. KDID-1824 (37/52)).',
    robloxServerNameLabel: 'Server Location',
    activePlayersLabel: 'Real Players Connected',

    moderationTitle: 'Safety & Moderation Center',
    moderationSubtitle: 'Community standards, anti-spam, and capacity limits',
    reportUserBtn: 'Report',
    blockUserBtn: 'Block',
    unblockBtn: 'Unblock',
    noBlockedUsers: 'No players currently blocked.',
    blockedUsersTitle: 'Blocked Players',
    reportModalTitle: 'Report Player Violation',
    reportReasonLabel: 'Select report reason:',
    reportReasonHarassment: 'Harassment or abusive language',
    reportReasonSpam: 'Spamming and repeated flooding',
    reportReasonInappropriate: 'Inappropriate or harmful content for youth',
    reportReasonScam: 'Scams, fake Robux links, or phishing',
    submitReportBtn: 'Submit Report',
    cancelBtn: 'Cancel',
    reportSubmittedSuccess: 'Report submitted successfully. Thank you for protecting the Kurdish Xosh community.',
    rateLimitWarning: 'Please wait 1.5s before sending another message.',
    filteredNotice: 'Message filtered by moderation policy.',
    robloxFilterNotice: 'All in-game and companion communication is subjected to strict Roblox moderation guidelines.',

    welcomeTitle: 'Welcome to Xosh Chat',
    welcomeSubtitle: 'Official Companion App for the Roblox Game Kurdish Xosh',
    welcomeExplainer: 'Xosh Chat supports up to 10,000 servers with 52 players each. Zero bots, fake users, or simulated chat participants.',
    permissionNotificationTitle: 'Notifications',
    permissionNotificationDesc: 'Used to alert you when real friends invite you to game servers or send direct pings.',
    permissionOverlayTitle: 'Optional Floating Overlay Mode',
    permissionOverlayDesc: 'Enables a lightweight chat bubble over supported desktop/Android windows. You can toggle this on or off anytime.',
    permissionRobloxTitle: 'Temporary Code Session Linking',
    permissionRobloxDesc: 'Sessions pair exclusively with short-lived, single-use codes without passwords or sensitive personal data.',
    continueBtn: 'Continue to Application',

    downloadModalTitle: 'Download & Build Xosh Chat',
    downloadModalDesc: 'Xosh Chat is structured for open-source development and multi-platform packaging for Windows and Android.',
    pwaOptionTitle: 'Install as Progressive Web App (PWA)',
    pwaOptionDesc: 'Install directly through your browser (Chrome or Edge) on Windows, Android, or tablet with full offline caching.',
    windowsOptionTitle: 'Windows Desktop Release (Electron/Tauri)',
    windowsOptionDesc: 'Package using standard desktop toolchains as detailed in the project repository README.',
    androidOptionTitle: 'Android APK (Capacitor)',
    androidOptionDesc: 'Compile a standalone native Android package using Capacitor commands in the documentation.',
    githubRepoTitle: 'GitHub Repository Structure',
    githubRepoDesc: 'Explore the complete source code, security configuration, and contribution guidelines.',

    prodGuideTitle: 'GitHub Pages & Production Release Guide',
    prodGuideSubtitle: 'Beginner-friendly step-by-step instructions to publish the website and build Android packages safely',
    githubPagesStepTitle: '1. Publishing the Website on GitHub Pages',
    androidPermsStepTitle: '2. Required Android Permissions for Floating Bubble Overlays',
    robloxComplianceStepTitle: '3. Production Roblox Open Cloud Integration',
    closeBtn: 'Close',
  },

  ar: {
    appName: 'كوردیش خوش ويب وخوش شات',
    appSubtitle: 'الموقع الرسمي والمرافق الذكي للتواصل',
    kurdishXoshWeb: 'موقع كوردیش خوش',
    xoshChatApp: 'تطبيق خوش شات',
    kdidRooms: 'خوادم KDID',
    productionGuide: 'دليل النشر في GitHub',
    safety: 'الأمان والتوافق',
    settings: 'الإعدادات',
    github: 'المستودع في GitHub',
    download: 'تحميل خوش شات',
    profile: 'حساب روبلوكس والمعرّف',

    statusDisconnected: 'غير متصل',
    statusConnecting: 'جارٍ الاتصال...',
    statusConnected: 'تم الاتصال',
    statusError: 'خطأ في الاتصال',
    zeroBotsNotice: 'خالٍ تماماً من البوتات: مخصص للاعبين الحقيقيين فقط',
    zeroBotsBadge: 'بدون بوتات',

    webHeroTitle: 'كوردیش خوش ويب وخوش شات',
    webHeroSubtitle: 'البوابة الرسمية لخوادم كوردیش خوش (حتى 10,000 خادم، 52 لاعباً كحد أقصى لكل خادم) ومحادثة الفقاعات العائمة.',
    webExplanationTitle: 'نظام خوادم KDID وسعة 52 لاعباً',
    webExplanationText: 'يدعم كوردیش خوش حتى 10,000 خادم فريد بالتنسيق من KDID-0001 إلى KDID-10000. كل خادم يتسع لـ 52 لاعباً كحد أقصى (مثل KDID-1824 (37/52)). عند اكتمال سعة الخادم، يمنع النظام الاكتظاظ ويوجهك تلقائياً إلى خادم متاح.',
    whatIsXoshChatTitle: 'بنية الخوادم',
    whatIsXoshChatDesc: 'كل خادم يحمل معرّفاً تسلسلياً فريداً. الانضمام إلى نفس الرمز يجمعك مع اللاعبين المتصلين حالياً في اللعبة.',
    featureBubbleTitle: 'فقاعة الدردشة العائمة',
    featureBubbleDesc: 'تصميم فقاعي يعرض معرّف الخادم وسعة اللاعبين الحالية (X/52) دون مغادرة اللعبة.',
    featureKdidTitle: 'شبكة 10,000 خادم',
    featureKdidDesc: 'معرّفات تسلسلية من KDID-0001 إلى KDID-10000 مع تتبع دقيق لسعة الخوادم.',
    featureSafetyTitle: 'حدود سعة الخادم والأمان',
    featureSafetyDesc: 'تطبيق صارم لسعة 52 لاعباً لكل خادم وسقف 10,000 خادم إجمالي مع نظام تصفية TextChatService.',
    webExploreRoomsCta: 'استعراض الخوادم',
    openMobileAppCta: 'فتح تطبيق خوش شات',

    serverCapacitySpec: 'نظام الخوادم: حتى 10,000 خادم · 52 لاعباً كحد أقصى لكل خادم',
    serverFullError: 'هذا الخادم ممتلئ بالكامل (52/52 لاعباً). يرجى الانضمام إلى خادم آخر متاح.',
    allServersFullError: 'جميع خوادم كوردیش خوش البالغ عددها 10,000 ممتلئة حالياً (52/52). يرجى الانتظار حتى يغادر أحد اللاعبين.',
    findAvailableServerBtn: 'الانضمام إلى خادم متاح',
    autoAssignServerDesc: 'إنشاء خادم جديد تلقائياً بالمعرّف المتاح التالي (KDID-0001 إلى KDID-10000)',
    serverFullBadge: 'ممتلئ (52/52)',
    serverOpenBadge: 'متاح',
    serverFormatExplainer: 'تتبع معرّفات الخوادم الصيغة KDID-0001 إلى KDID-10000. ويعد KDID-1824 مجرد مثال.',

    floatingBubbleTitle: 'خوش شات — الفقاعة العائمة',
    minimizeBubble: 'تصغير الفقاعة',
    expandBubble: 'فتح الدردشة',
    currentRoomLabel: 'معرّف الخادم (Server ID):',
    appIdLabel: 'معرّف التطبيق الفريد (App ID):',
    changeProfile: 'حساب روبلوكس والملف الشخصي',
    robloxUsernameLabel: 'اسم مستخدم روبلوكس (Roblox Username):',
    enterRobloxUsernamePlaceholder: 'اكتب اسم حسابك في روبلوكس...',
    lookupRobloxProfileBtn: 'البحث وجلب صورة الحساب',
    lookingUpRoblox: 'جارٍ الاتصال بـ Roblox API...',
    robloxAccountVerified: 'تم العثور على الحساب وجلب الصورة الرسمية من روبلوكس',
    robloxAccountNotFound: 'لم يتم العثور على حساب روبلوكس بهذا الاسم. يرجى التأكد من التهجئة.',
    noBotsDisclaimer: 'هذا التطبيق خالٍ تماماً من البوتات أو الرسائل الوهمية. التواصل هنا للاعبين الحقيقيين فقط.',
    ownershipVerificationTitle: 'تأكيد ملكية الحساب داخل اللعبة',
    ownershipVerificationDesc: 'لتأكيد ملكيتك لهذا الحساب داخل كوردیش خوش، أدخل هذا الرمز داخل اللعبة:',
    copyVerificationCode: 'نسخ رمز التأكيد',
    codeCopied: 'تم نسخ الرمز!',
    saveProfile: 'حفظ وتأكيد الملف الشخصي',
    typeMessagePlaceholder: 'اكتب رسالتك بالكردية، العربية أو الإنجليزية...',
    sendBtn: 'إرسال',
    quickPhrasesTitle: 'عبارات سريعة:',
    overlayNotSupportedNotice: 'إذا كانت أذونات النوافذ العائمة غير متوفرة على هذا الجهاز، ينتقل التطبيق تلقائياً إلى واجهة الدردشة الداخلية المدمجة.',
    overlaySupportedNotice: 'النافذة العائمة مفعلة بصورتك الرسمية في روبلوكس.',
    toggleOverlayMode: 'وضع النافذة العائمة (Overlay)',
    noMessagesInRoom: 'لا توجد رسائل في هذا الخادم بعد. كن أول لاعب حقيقي يرسل رسالة!',

    kdidRoomsTitle: 'خوادم كوردیش خوش (KDID)',
    kdidRoomsSubtitle: 'تحقق من رمز KDID الظاهر داخل لعبة كوردیش خوش (الحد الأقصى 52 لاعباً لكل خادم، و 10,000 خادم كحد أقصى إجمالي).',
    enterKdidCodeLabel: 'معرّف الخادم KDID (مثال: KDID-0001 أو KDID-1824):',
    joinRoomBtn: 'الانضمام إلى الخادم',
    createRoomBtn: 'إنشاء خادم جديد (حتى 10,000)',
    activeRoomsList: 'خوادم كوردیش خوش النشطة',
    robloxExperienceNotice: 'يظهر معرّف الخادم وسعة اللاعبين مباشرة داخل اللعبة مثل KDID-1824 (37/52).',
    robloxServerNameLabel: 'موقع الخادم',
    activePlayersLabel: 'اللاعبون الحقيقيون المتصلون',

    moderationTitle: 'مركز الأمان والإشراف',
    moderationSubtitle: 'معايير المجتمع ومكافحة الرسائل المزعجة وسعة الخوادم',
    reportUserBtn: 'إبلاغ',
    blockUserBtn: 'حظر',
    unblockBtn: 'إلغاء الحظر',
    noBlockedUsers: 'لا يوجد لاعبون محظورون حالياً.',
    blockedUsersTitle: 'اللاعبون المحظورون',
    reportModalTitle: 'تقديم بلاغ عن انتهاك',
    reportReasonLabel: 'سبب البلاغ:',
    reportReasonHarassment: 'مضايقة أو إساءة لفظية',
    reportReasonSpam: 'رسائل متكررة وإزعاج (Spam)',
    reportReasonInappropriate: 'محتوى غير لائق أو ضار بالأطفال',
    reportReasonScam: 'احتيال أو روابط روبوكس وهمية',
    submitReportBtn: 'إرسال البلاغ',
    cancelBtn: 'إلغاء',
    reportSubmittedSuccess: 'تم إرسال البلاغ بنجاح. شكراً لمساهمتك في حماية المجتمع.',
    rateLimitWarning: 'يرجى الانتظار 1.5 ثانية قبل إرسال رسالة أخرى.',
    filteredNotice: 'تمت تصفية الرسالة وفق سياسات الأمان.',
    robloxFilterNotice: 'تخضع جميع المحادثات لضوابط الفلترة الصارمة لروبلوكس لضمان بيئة لعب آمنة.',

    welcomeTitle: 'مرحباً بك في خوش شات',
    welcomeSubtitle: 'التطبيق المرافق الرسمي للعبة روبلوكس كوردیش خوش',
    welcomeExplainer: 'يدعم كوردیش خوش حتى 10,000 خادم يتسع كل منها لـ 52 لاعباً. بدون أي بوتات أو مستخدمين مزيفين.',
    permissionNotificationTitle: 'الإشعارات (Notifications)',
    permissionNotificationDesc: 'تُستخدم لتنبيهك عند دعوة الأصدقاء لك في الخوادم أو إرسال تنبيهات اللعبة.',
    permissionOverlayTitle: 'وضع النافذة العائمة (Overlay Mode)',
    permissionOverlayDesc: 'يتيح إظهار فقاعة دردشة خفيفة أثناء استخدام النظام (اختياري بالكامل).',
    permissionRobloxTitle: 'ربط الجلسة برمز مؤقت',
    permissionRobloxDesc: 'يتم الربط حصرياً عبر رمز مؤقت دون طلب كلمات سر أو معلومات حسابك الشخصي.',
    continueBtn: 'المتابعة إلى التطبيق',

    downloadModalTitle: 'تحميل وبناء خوش شات',
    downloadModalDesc: 'تم بناء خوش شات ليكون قابلاً للتوزيع المفتوح على ويندوز وأندرويد.',
    pwaOptionTitle: 'التثبيت كتطبيق ويب تقدمي (PWA)',
    pwaOptionDesc: 'تثبيت فوري ومباشر عبر المتصفح (Chrome/Edge) مع دعم العمل دون اتصال.',
    windowsOptionTitle: 'نسخة ويندوز للحاسوب (Electron/Tauri)',
    windowsOptionDesc: 'يمكن تجميع الحزمة باستخدام الأدوات الموضحة في مستودع GitHub.',
    androidOptionTitle: 'تطبيق أندرويد APK (Capacitor)',
    androidOptionDesc: 'توليد ملف APK رسمي لأجهزة أندرويد عبر تعليمات Capacitor.',
    githubRepoTitle: 'مستودع المشروع على GitHub',
    githubRepoDesc: 'تصفح الكود المصدري بالكامل، وإرشادات الأمان والمساهمة.',

    prodGuideTitle: 'دليل النشر على GitHub Pages وأندرويد',
    prodGuideSubtitle: 'تعليمات واضحة للمبتدئين لنشر الموقع وبناء حزم أندرويد وربط روبلوكس بأمان',
    githubPagesStepTitle: '1. نشر الموقع على GitHub Pages مجاناً',
    androidPermsStepTitle: '2. أذونات أندرويد المطلوبة للفقاعة العائمة (Overlay)',
    robloxComplianceStepTitle: '3. تكامل روبلوكس الرسمي عبر Open Cloud',
    closeBtn: 'إغلاق',
  },
};
