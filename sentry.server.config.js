// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    environment: process.env.NEXT_PUBLIC_NODE_ENV,
    // tunnel: '/tunnel',
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
    tracesSampler: (samplingContext) => {
        if (
            samplingContext.request.url === '/' ||
            samplingContext.request.url === '/api/auth/me' ||
            samplingContext.request.url === '/api/auth/token' ||
            samplingContext.request.url === '/api/users/me'
        ) {
            return 0;
        } else {
            return 1;
        }
    },
    ignoreErrors: [
        /\b(\w*is not defined\w*)\b/,
        'Failed to fetch',
        'NetworkError',
        'There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.',
        'Hydration failed because the initial UI does not match what was rendered on the server.',
        'There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.',
        'ReactOnRails is not defined',
        'React is not defined',
        'UserLeap is not defined',
        'gl is not defined',
        'swellAPI is not defined',
        'BrainSINS is not defined',
        '__recart is not defined',
        'pp_alreadyInitialized is not defined',
        'recart is not defined',
        'twemoji is not defined',
        'SwellConfig is not defined',
        'BrainSINSRecommender is not defined',
        'pp_images is not defined',
        'pp_descriptions is not defined',
        'pp_titles is not defined',
        'adthrive is not defined',
        'drupalSettings is not defined',
        'GitLab is not defined',
        'visaSrc is not defined',
        'visaImage is not defined',
        'instapageSp is not defined',
        'Zoey is not defined',
        '_instapageSnowplow is not defined',
        'stacklaWidgetJsonp is not defined',
        'adyen is not defined',
        'CoinHive is not defined',
        'zoey is not defined',
        'zoeyDev is not defined',
        'pendo is not defined',
        'wp_username is not defined',
        'Pagevamp is not defined',
        'CONTLO_ENV is not defined',
        'ryviu_global_settings is not defined',
        'StampedFn is not defined',
        'Mxm is not defined',
        'mivaJS is not defined',
        'disqus_url is not defined',
        'qstomizer_script is not defined',
        'karma is not defined',
        'flowplayer is not defined',
        'disqus_shortname is not defined',
        'Pepperjam is not defined',
        'phpbb is not defined',
        'fathom is not defined',
        'amoFormsWidget is not defined',
        'glfWidget is not defined',
        'booxi is not defined',
        'bizpanda is not defined',
        'amoSocialButton is not defined',
        'Turbolinks is not defined',
        '__pandalockers is not defined',
        'spryker is not defined',
        'Inferno is not defined',
        'glfBindButtons is not defined',
        'Tealium is not defined',
        'ZipifyPages is not defined',
        'jseMine is not defined',
        'testFreaks is not defined',
        'basket is not defined',
        'deepMiner is not defined',
        'sniperEnableSearch is not defined',
        'EzGaCfg is not defined',
        'Fingerprint2 is not defined',
        'Backbone is not defined',
        'KOHA is not defined',
        'ClickTale is not defined',
        'Solvvy is not defined',
        'SyntaxHighlighter is not defined',
        '__APOLLO_CLIENT__ is not defined',
        'mulberryShop is not defined',
        'KM_COOKIE_DOMAIN is not defined',
        'QUALAROO_DNT is not defined',
        'RightJS is not defined',
        'mulberry is not defined',
        'CocosEngine is not defined',
        'MailMunchWidgets is not defined',
        'Sweetalert2 is not defined',
        'unruly is not defined',
        'mailmunch is not defined',
        'OOo is not defined',
        'WEBXPAY is not defined',
        'ftos is not defined',
        'MgSensor is not defined',
        'acquireCobrowseRTC is not defined',
        'FtosChat is not defined',
        'xoops is not defined',
        'jibres is not defined',
        'IMWEB_TEMPLATE is not defined',
        'AddOmetriaBasket is not defined',
        'ometria is not defined',
        'Trix is not defined',
        'admitad is not defined',
        'chaty_settings is not defined',
        'threekitPlayer is not defined',
        'smartlook is not defined',
        'QSI is not defined',
        'threekitAR is not defined',
        'ADMITAD is not defined',
        'Kustomer is not defined',
        'jimdoDolphinData is not defined',
        'smartlook_key is not defined',
        'frizbit is not defined',
        'MochiKit is not defined',
        'visaApi is not defined',
        'SellsySnippet is not defined',
        'WebziCart is not defined',
        'Air360 is not defined',
        'AWIN is not defined',
        'callbellSettings is not defined',
        'Gerrit is not defined',
        '_bsaPRO is not defined',
        'ymConfig is not defined',
        'wgVersion is not defined',
        'PepperjamTracking is not defined',
        'ueeshop_config is not defined',
        'raygunEnabled is not defined',
        'wgTitle is not defined',
        'ciResponsive is not defined',
        'g5_js_ver is not defined',
        'usabilla_live is not defined',
        'LITHIUM is not defined',
        'Unbxd is not defined',
        '__LOADABLE_LOADED_CHUNKS__ is not defined',
        'Afterpay is not defined',
        'checkout is not defined',
        'adroll_pix_id is not defined',
        'AfterpayAttractWidget is not defined',
        'adroll_version is not defined',
        'afterpay_product is not defined',
        'AfterpayGenericErrorHtml is not defined',
        '__AdaEmbedConstructor is not defined',
        'adaEmbed is not defined',
        'AfterpayWidgetHtml is not defined',
        'Lootly is not defined',
        'SCEvents is not defined',
        'webpackChunkgatsby_starter_blog_tachyons is not defined',
        'lootlyWidgetInit is not defined',
        'AppsFlyerSdkObject is not defined',
        'catberry is not defined',
        'snoobi is not defined',
        'accessibilityWidget is not defined',
        '_sift is not defined',
        'protovis is not defined',
        'olarkUserData is not defined',
        'uSizyUniversal is not defined',
        'metisMenu is not defined',
        'olark is not defined',
        '__core is not defined',
        'Revieve is not defined',
        'safariVizury is not defined',
        'MetisMenu is not defined',
        '_pxAppId is not defined',
        'QuantaTagRUMSpeedIndex is not defined',
        'langify is not defined',
        'atomeWidget is not defined',
        'LimeSpot is not defined',
        'OmiseCard is not defined',
        'Omise is not defined',
        'sniper_search_key is not defined',
        'DIGISTORE_VENDORKEY is not defined',
        '_trboq is not defined',
        'TNStats_Tracker is not defined',
        'Highcharts is not defined',
        'PrivyWidget is not defined',
        'CFAppDomain is not defined',
        'privySettings is not defined',
        'LI is not defined',
        'tf is not defined',
        '__inspld is not defined',
        'fetchRootComponent is not defined',
        'zbxCallPostScripts is not defined',
        'JustunoApp is not defined',
        'inSidedData is not defined',
        'insided is not defined',
        'MemberStack is not defined',
        'EC_ROOT_DOMAIN is not defined',
        'Trengo is not defined',
        'ClarityIcons is not defined',
        'mathjs is not defined',
        'SmartBannerOY is not defined',
        '_googCallTrackingImpl is not defined',
        'EC_GLOBAL_DATETIME is not defined',
        'google_wcc_status is not defined',
        'Laravel is not defined',
        'app is not defined',
        'pligg_ is not defined',
        'stackSonar is not defined',
        'wpJsonpResengoReservationWidget is not defined',
        'luanaframework is not defined',
        'Prototype is not defined',
        'dayjs is not defined',
        'highstreetBanner is not defined',
        'speedKit is not defined',
        'ntvConfig is not defined',
        'MindboxEndpointSettings is not defined',
        'Process is not defined',
        'OB_releaseVer is not defined',
        'DDC is not defined',
        'gravitecWebpackJsonp is not defined',
        'Turbo is not defined',
        'webengage is not defined',
        'Drupal is not defined',
        'Gravitec is not defined',
        'VWO is not defined',
        'deployads is not defined',
        'BizTrackingA is not defined',
        'adabraPreview is not defined',
        'Bizible is not defined',
        '__vwo is not defined',
        'shaka is not defined',
        'sailthruNewsletterRegistration is not defined',
        'appnexusVideo is not defined',
        '_paybright_config is not defined',
        'ol is not defined',
        'fyre is not defined',
        'OpenLayers is not defined',
        'FTB_API is not defined',
        'dm_insight_id is not defined',
        'feefoTracker is not defined',
        'LF is not defined',
        'DPlayer is not defined',
        'rebuyConfig is not defined',
        'freshop is not defined',
        'zakraNavHelper is not defined',
        'MonsterInsights is not defined',
        '_W is not defined',
        'FyreLoader is not defined',
        'FTB_AddEvent is not defined',
        'htoolz is not defined',
        'AnswerDash is not defined',
        'obApi is not defined',
        'VuFind is not defined',
        'Sequra is not defined',
        '$nuxt is not defined',
        'OutbrainPermaLink is not defined',
        'pligg_ is not defined',
        'sfdrUniqid is not defined',
        'sekindoFlowingPlayerOn is not defined',
        '_acquire_init_config is not defined',
        'acquire is not defined',
        'arcWidgetJsonp is not defined',
        'naver is not defined',
        'Breinify is not defined',
        'ka is not defined',
        'BentoAnalytics is not defined',
        'Remarkable is not defined',
        'SevenroomsWidget is not defined',
        '_LTKSignup is not defined',
        '_LTKSubscriber is not defined',
        'lrSiteRenderingData is not defined',
        'adabra_version_panel is not defined',
        'style_cookie_settings is not defined',
        'aplazame is not defined',
        '__zoko_app_version is not defined',
        'ledeEngagement is not defined',
        'beYableDomain is not defined',
        'Callbell is not defined',
        'ledeChartbeatViews is not defined',
        'BEYABLE is not defined',
        'ledeEngagementReset is not defined',
        'beYableKey is not defined',
        'biJsUrl is not defined',
        'acquireConfigNodeServer is not defined',
        'reel is not defined',
        'NB is not defined',
        'lpTag is not defined',
        'Trustpilot is not defined',
        'shoptet is not defined',
        'init_isotope is not defined',
        'EB is not defined',
        '_W is not defined',
        'AddSearchUI is not defined',
        'Isotope is not defined',
        'BambuserLiveShopping is not defined',
        '_bambuser is not defined',
        'KEPTIFY_BASE_URL is not defined',
        '_keptify is not defined',
        '_yieldify is not defined',
        'zaraz is not defined',
        'DIGISTORE_LINK_ID_KEY is not defined',
        'Ushahidi is not defined',
        'nv is not defined',
        '__letroUgcGadget is not defined',
        'convertflow is not defined',
        'Ecwid is not defined',
        'BySide is not defined',
        'getTheSourceForDigistoreLinks is not defined',
        'bysideWebcare_banner is not defined',
        'okeReviewsWidgetOnInit is not defined',
        'okeWidgetControlInit is not defined',
        'deployads is not defined',
        'Process is not defined',
        '_trbo is not defined',
        'awt_analytics is not defined',
        'Objects are not valid as a React child (found: [object Error]). If you meant to render a collection of children, use an array instead.',
        'decibelInsight is not defined',
        'elqCookieValue is not defined',
        'squatchQuery is not defined',
        'optimoveSDKVersion is not defined',
        'LangShop is not defined',
        'Exhibit is not defined',
        'webix is not defined',
        '_wfx_add_logger is not defined',
        'lkqdErrorCount is not defined',
        'turf is not defined',
        'wfx_is_playing__ is not defined',
        'TamaraProductWidget is not defined',
        'lkqd_http_response is not defined',
        'AbsorbLMS is not defined',
        'lkqdSettings is not defined',
        '_wfx_settings is not defined',
        'Alpine is not defined',
        'lkqdCall is not defined',
        'iterableAnalytics is not defined',
        'chart is not defined',
        'Tealium is not defined',
        'enableUsableNetAssistive is not defined',
        'wixPerformanceMeasurements is not defined',
        'indiCountly is not defined',
        'vtex is not defined',
        'Gumstack is not defined',
        'Sentry is not defined',
        'NextFavourites is not defined',
        'websiteEnableSuggestFundiin is not defined',
        'Bizweb is not defined',
        'CKEDITOR is not defined',
        'Constants is not defined',
        'Gravatar is not defined',
        'PIXI is not defined',
        'ado is not defined',
        'Leanplum is not defined',
        'GEMSTORE is not defined',
        'cooladata is not defined',
        'Unexpected number',
        '__siftFlashCB is not defined',
        'Joomla is not defined',
        'phxsite is not defined',
        'PaypalOffersObject is not defined',
        'InteractApp is not defined',
        'InteractPromotionObject is not defined',
        'GEMVENDOR is not defined',
        'payPalCreditPopover is not defined',
        '_etracker is not defined',
        'KlaviyoSubscribe is not defined',
        'klaviyo is not defined',
        'SEGMANTA__USER_METADATA is not defined',
        'jseMine is not defined',
        'titan is not defined',
        'sellingoQuantityCalc is not defined',
        'websiteMaximumSuggestFundiinWithPrediction is not defined',
        'Typekit is not defined',
        'responsiveVoice is not defined',
        'Raphael is not defined',
        '_trbo is not defined',
        'wc_moneris_hosted_tokenization_params is not defined',
        'RISKX is not defined',
        'AddSearchClient is not defined',
        'LUX is not defined',
        'adsbyjuicy is not defined',
        'accesso is not defined',
        '_cartstack is not defined',
        'ng is not defined',
        'riskifiedBeaconLoad is not defined',
        'lozad is not defined',
        '_trboq is not defined',
        'aurycJsLibConfig is not defined',
        'Zonos is not defined',
        'paypalClientId is not defined',
        'yotpo is not defined',
        'Marionette is not defined',
        'paypalJs is not defined',
        'MetisMenu is not defined',
        'enablePaypal is not defined',
        'wc_ga_pro is not defined',
        '__paypal_global__ is not defined',
        'ekomiWidgetMain is not defined',
        'PAYPAL is not defined',
        'livewire is not defined',
        'AbsorbLMS is not defined',
        'checkout is not defined',
        'unruly is not defined',
        'MathJax is not defined',
        'goftino_1 is not defined',
        'SSsdk is not defined',
        'snapengage_mobile is not defined',
        'g6 is not defined',
        'lkqd_http_response is not defined',
        'lkqdErrorCount is not defined',
        'Stylitics is not defined',
        'Goftino is not defined',
        'SnapEngage is not defined',
        'salesFloorHost is not defined',
        'NMConfig is not defined',
        'TabbyPromo is not defined',
        'Tabby is not defined',
        'Sfjs is not defined',
        'j2storeURL is not defined',
        'SnapEngageChat is not defined',
        'QUANTA is not defined',
        'zonosCheckout is not defined',
        'Comandia is not defined',
        '__oneSignalSdkLoadCount is not defined',
        'POPMENU_CLIENT is not defined',
        'map is not defined',
        'Fusion is not defined',
        'jQueryQSMZ is not defined',
        'zid is not defined',
        'qstomizer_script is not defined',
        'QuantaTagRUMSpeedIndex is not defined',
        'Plyr is not defined',
        'loadScript_qsmz is not defined',
        'airrobe is not defined',
        'zidTracking is not defined',
        'ttd_dom_ready is not defined',
        'createPopper is not defined',
        'Popper is not defined',
        'Stackla is not defined',
        '_aimtellWebhook is not defined',
        'ADRUM is not defined',
        'ac_bgclick_URL is not defined',
        'adosResults is not defined',
        'dtrum is not defined',
        'ados is not defined',
        'ct_nOpp is not defined',
        'analytics is not defined',
        'moengage_object is not defined',
        'downloadMoengage is not defined',
        'MOENGAGE_API_KEY is not defined',
        'mm_user is not defined',
        'mm_current_user_id is not defined',
        'Moengage is not defined',
        'mm_config is not defined',
        'Ext is not defined',
        'mm_license is not defined',
        '_mbsy is not defined',
        'shptUrl is not defined',
        'okeWidgetControlInit is not defined',
        'tiledesk is not defined',
        'Rumble is not defined',
        'ct_ultimate_gdpr_cookie is not defined',
        'initialServerData is not defined',
        'MauticTrackingObject is not defined',
        'TweenLite is not defined',
        'Fresco is not defined',
        'tileDeskAsyncInit is not defined',
        'TweenMax is not defined',
        'gsapVersions is not defined',
        'Tiledesk is not defined',
        'tiledeskSettings is not defined',
        'QueueIt is not defined',
        'TTDUniversalPixelApi is not defined',
        'webpackJsonp is not defined',
        'webpackChunk is not defined',
        'automizelyConversions is not defined',
        'ChatraSetup is not defined',
        'promoIsOver is not defined',
        'promoStart is not defined',
        'ThinkificAnalytics is not defined',
        'promoApi is not defined',
        'shopfa is not defined',
        'gemius_hit is not defined',
        'klaroConfig is not defined',
        'Catch is not defined',
        'gemius_init is not defined',
        'Shine is not defined',
        'Tynt is not defined',
        'prestashop is not defined',
        'nudgify is not defined',
        'sekindoDisplayedPlacement is not defined',
        'ravenOptions is not defined',
        'PLUMBR is not defined',
        'init_kartra_tracking is not defined',
        'kartra_tracking_loaded is not defined',
        'pma_absolute_uri is not defined',
        'AMO_PIXEL_CLIENT is not defined',
        'piTracker is not defined',
        'ChorusCampaigns is not defined',
        'piHostname is not defined',
        'piAId is not defined',
        'ChorusAds is not defined',
        'smartsupp is not defined',
        '$smartsupp is not defined',
        'mParticle is not defined',
        'MM_showHideLayers is not defined',
        'MM_preloadImages is not defined',
        'trackSailthruUser is not defined',
        'chmlnData is not defined',
        'sailthruIdentify is not defined',
        'adascHelper is not defined',
        'go is not defined',
        'Sailthru is not defined',
        'SheMedia is not defined',
        'webVitals is not defined',
        'chmln is not defined',
        'TypechoComment is not defined',
        'SC is not defined',
        'WirecardPaymentPage is not defined',
        'SalesmanagoObject is not defined',
        'optimoveSDK is not defined',
        'SonarMeasures is not defined',
        'SonarRequest is not defined',
        'Intercom is not defined',
        'wsm_catalogTabby is not defined',
        'lootlyWidgetInit is not defined',
        '__hic is not defined',
        'FingerprintJS is not defined',
        'kueskypushhead is not defined',
        'Shuttle is not defined',
        'Square is not defined',
        'ipb_var is not defined',
        'frizbit is not defined',
        'JetshopData is not defined',
        'bookero_config is not defined',
        'initAdproTags is not defined',
        'AwesomeSezzle is not defined',
        'Rx is not defined',
        'padeditbar is not defined',
        'padimpexp is not defined',
        'loox_global_hash is not defined',
        'flow_cart_localize is not defined',
        'show_switch2gui is not defined',
        'flow is not defined',
        'SUB2 is not defined',
        '$chatwoot is not defined',
        'EPrints is not defined',
        'adthrive is not defined',
        'chatwootSDK is not defined',
        'ShellInABox is not defined',
        'EPJS_menu_template is not defined',
        'infolinks_wsid is not defined',
        'Polymer is not defined',
        'infolinks_pid is not defined',
        'adthriveVideosInjected is not defined',
        'mcwidget is not defined',
        'SFUI is not defined',
        'site24x7RumError is not defined',
        'asciidoc is not defined',
        '__insp is not defined',
        'adopt_website_code is not defined',
        'Air360 is not defined',
        'BWEUM is not defined',
        'caastInstance is not defined',
        'Prism is not defined',
        'metriloBotRegexp is not defined',
        'LiveSite is not defined',
        'metrilo is not defined',
        'ss_dom_var is not defined',
        'Vcita is not defined',
        'smartlook_key is not defined',
        'szmvars is not defined',
        'YETT_BLACKLIST is not defined',
        'iam_data is not defined',
        'jQuery is not defined',
        'ineum is not defined',
        'clicky is not defined',
        'TNStats_Tracker is not defined',
        'ko is not defined',
        'Trengo is not defined',
        'reevooUrl is not defined',
        'grapheneJS is not defined',
        'gemius_pending is not defined',
        'Bulma is not defined',
        'ReevooApi is not defined',
        'TruendoCookieControlCallback is not defined',
        'reevooAccessCode is not defined',
        'TNCMS is not defined',
        'toastr is not defined',
        'pbjs is not defined',
        'EmbedSocialIframeLightbox is not defined',
        'Kameleoon is not defined',
        'kameleoonEndLoadTime is not defined',
        'SHARETHIS is not defined',
        'Simvoly is not defined',
        'threekitPlayer is not defined',
        '__sharethis__docReady is not defined',
        'threekitAR is not defined',
        '__EXCO_INTEGRATION_TYPE is not defined',
        '_actGoal is not defined',
        'woocommerce_params is not defined',
        '__EXCO is not defined',
        'roundcube is not defined',
        'SystemID is not defined',
        'addSkimlinks is not defined',
        'lpTag is not defined',
        '__algolia is not defined',
        '__AdaEmbedConstructor is not defined',
        'bluecpy_id is not defined',
        'galleryAuthToken is not defined',
        '_LTKSubscriber is not defined',
        'atomeWidget is not defined',
        'acquireCobrowseRTC is not defined',
        'Gravitec is not defined',
        'algoliasearch is not defined',
        'ycookieApiUrl is not defined',
        'wiziblocks_list is not defined',
        'PREBID_TIMEOUT is not defined',
        'ALGOLIA_INSIGHTS_SRC is not defined',
    ],
});
