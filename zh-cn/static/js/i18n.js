
  let _language = 'zh-cn/';
  let pop_ind = 0;
  const pathName = window.location.pathname;

  if (pathName.indexOf("zh-cn") >= 0){
    // console.log('带zh-cn后缀');
    _language = 'zh-cn/';
  } else if (pathName.indexOf("zh-hk") >= 0){
    // console.log('带zh-hk后缀');
    _language = 'zh-hk/';
  } else if (window.location.pathname.indexOf("en-us") >= 0){
    // console.log('带en-us后缀');
    _language = 'en-us/';
    pop_ind = 2;
  } else{
    // console.log('不带lang后缀');
    handleNoLangPath();
  }
  console.log('handle no lang', _language);
  localStorage.setItem("browserSign", _language);
  function handleNoLangPath() {
    const browserSign =  localStorage.getItem("browserSign");
    if(browserSign){
      _language = browserSign;
      if (_language.split('/')[0] == 'zh-hk') {
        pop_ind = 1;
      } else if (_language.indexOf("zh") >= 0 || _language.indexOf("ZH") >= 0) {
        pop_ind = 0;
      } else {
        pop_ind = 2;
      }
    } else {
      /* 获取浏览器语言 */
      // console.log('浏览器语言: '+navigator.language)
      const lang_nav = navigator.language;
      if (lang_nav == 'zh-HK') {
        _language = 'zh-hk/';
        pop_ind = 1;
      } else if (lang_nav.indexOf("zh") >= 0 || lang_nav.indexOf("ZH") >= 0) {
        _language = 'zh-cn/';
        pop_ind = 0;
      } else {
        _language = 'en-us/';
        pop_ind = 2;
      }
    }
  }
  if (pathName.indexOf(_language.split('/')[0]) < 0) {
    window.location.pathname = window.location.pathname.replace(/^\/(zh\-(cn|hk)|en\-us|jp)?/, '/' + _language);
  }

  $('.lang_area a').removeClass('current');
  $('.wrap').addClass(_language.split('/')[0]);
  $('.lang_area a[lang="' + _language.split('/')[0] + '"]').addClass('current');

  /* 中文/繁体/英文路由状态控制 */
  var host = window.location.host;
  var url = window.location.href;
  $('.lang_area a,.menu_list .menu_item.menu_item_lan a,.lang-ul li a').on('click', function () {
    var targetLocale = $(this).attr('lang');

    if ($(this).attr('lang') != _language.split('/')[0]) {
      localStorage.setItem("browserSign", targetLocale+'/');
      window.location.pathname = window.location.pathname.replace(/^\/(zh\-(cn|hk)|en\-us|jp)?/, '/' + targetLocale);
    }
  })

  $('.cookie-pop .pop').removeClass('active');
  $('.cookie-pop .pop').eq(pop_ind).addClass('active');