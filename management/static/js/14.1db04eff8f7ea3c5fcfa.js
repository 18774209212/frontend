webpackJsonp([14],{"VC+f":function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},avHd:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var t,i,n=o("3cXf"),r=o.n(n),s=o("rVsN"),a=o.n(s),l=o("hRKE"),c=o.n(l);t="undefined"!=typeof window?window:this,i=function(t,o){!function(t,o){function i(){var e=m.elements;return"string"==typeof e?e.split(" "):e}function n(e){var t=v[e[f]];return t||(t={},g++,e[f]=g,v[g]=t),t}function r(e,t,i){return t||(t=o),d?t.createElement(e):(i||(i=n(t)),!(r=i.cache[e]?i.cache[e].cloneNode():p.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e)).canHaveChildren||u.test(e)||r.tagUrn?r:i.frag.appendChild(r));var r}function s(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(o){return m.shivMethods?r(o,e,t):t.createElem(o)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(m,t.frag)}function a(e){e||(e=o);var t=n(e);return!m.shivCSS||l||t.hasCSS||(t.hasCSS=!!function(e,t){var o=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return o.innerHTML="x<style>"+t+"</style>",i.insertBefore(o.lastChild,i.firstChild)}(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||s(e,t),e}var l,d,h=t.html5||{},u=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f="_html5shiv",g=0,v={};!function(){try{var e=o.createElement("a");e.innerHTML="<xyz></xyz>",l="hidden"in e,d=1==e.childNodes.length||function(){o.createElement("a");var e=o.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){l=!0,d=!0}}();var m={elements:h.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:"3.7.3",shivCSS:!1!==h.shivCSS,supportsUnknownElements:d,shivMethods:!1!==h.shivMethods,type:"default",shivDocument:a,createElement:r,createDocumentFragment:function(e,t){if(e||(e=o),d)return e.createDocumentFragment();for(var r=(t=t||n(e)).frag.cloneNode(),s=0,a=i(),l=a.length;l>s;s++)r.createElement(a[s]);return r},addElements:function(e,t){var o=m.elements;"string"!=typeof o&&(o=o.join(" ")),"string"!=typeof e&&(e=e.join(" ")),m.elements=o+" "+e,a(t)}};t.html5=m,a(o),"object"===c()(e)&&e.exports&&(e.exports=m)}(void 0!==t?t:this,document),
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
"document"in self&&("classList"in document.createElement("_")?function(){var e=document.createElement("_");if(e.classList.add("c1","c2"),!e.classList.contains("c2")){var t=function(e){var t=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(e){var o,i=arguments.length;for(o=0;o<i;o++)e=arguments[o],t.call(this,e)}};t("add"),t("remove")}if(e.classList.toggle("c3",!1),e.classList.contains("c3")){var o=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e,t){return 1 in arguments&&!this.contains(e)==!t?t:o.call(this,e)}}e=null}():function(e){if("Element"in e){var t="classList",o="prototype",i=e.Element[o],n=Object,r=String[o].trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array[o].indexOf||function(e){for(var t=0,o=this.length;t<o;t++)if(t in this&&this[t]===e)return t;return-1},a=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},l=function(e,t){if(""===t)throw new a("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(e,t)},c=function(e){for(var t=r.call(e.getAttribute("class")||""),o=t?t.split(/\s+/):[],i=0,n=o.length;i<n;i++)this.push(o[i]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},d=c[o]=[],h=function(){return new c(this)};if(a[o]=Error[o],d.item=function(e){return this[e]||null},d.contains=function(e){return-1!==l(this,e+="")},d.add=function(){var e,t=arguments,o=0,i=t.length,n=!1;do{e=t[o]+"",-1===l(this,e)&&(this.push(e),n=!0)}while(++o<i);n&&this._updateClassName()},d.remove=function(){var e,t,o=arguments,i=0,n=o.length,r=!1;do{for(e=o[i]+"",t=l(this,e);-1!==t;)this.splice(t,1),r=!0,t=l(this,e)}while(++i<n);r&&this._updateClassName()},d.toggle=function(e,t){e+="";var o=this.contains(e),i=o?!0!==t&&"remove":!1!==t&&"add";return i&&this[i](e),!0===t||!1===t?t:!o},d.toString=function(){return this.join(" ")},n.defineProperty){var u={get:h,enumerable:!0,configurable:!0};try{n.defineProperty(i,t,u)}catch(e){-2146823252===e.number&&(u.enumerable=!1,n.defineProperty(i,t,u))}}else n[o].__defineGetter__&&i.__defineGetter__(t,h)}}(self)),Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var o in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+o+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[o]:("00"+t[o]).substr((""+t[o]).length)));return e};var i="https://open.ys7.com",n="https://log.ys7.com/statistics.do",s=i+"/sdk/js/2.0/js/ckplayer/ckplayer.js",l=i+"/sdk/js/2.0/js/flv.min.js",d="https:"===t.location.protocol,h=!!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i),u=document.createElement("video"),p=!!u.canPlayType&&!!t.addEventListener,f=p&&u.canPlayType("application/vnd.apple.mpegURL");function g(e){var o={Ver:"v.2.4.1",PlatAddr:t.location.protocol+"//"+t.location.host,ExterVer:"Ez.2.4.1",CltType:102,StartTime:(new Date).Format("yyyy-MM-dd hh:mm:ss.S"),OS:navigator.platform};for(var i in e)o[i]=e[i];var r=[];for(var s in o)r.push(s+"="+o[s]);var a="?"+r.join("&");(new Image).src=n+a}g({systemName:"open_netstream_localinfo"});var v=/^rtmp/;function m(e,t){var o=document.createElement("script");o.setAttribute("src",e),o.onload=t,document.getElementsByTagName("head")[0].appendChild(o)}function y(e,t,o,i){var n=e,r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){var e=JSON.parse(r.responseText);i(e)}},r.open(t,n,!0);var s=new FormData;for(var a in o)s.append(a,o[a]);r.send(s)}function E(e,t){var o=new RegExp("(\\?|#|&)"+e+"=(.*?)(#|&|$)"),i=(t||location.href).match(o);return decodeURIComponent(i?i[2]:"")}function w(e){return!!e&&("object"===(void 0===e?"undefined":c()(e))||"function"==typeof e)&&"function"==typeof e.then}var S=function(e){if(!p)throw new Error("不支持ie8等低版本浏览器");if(this.opt={},this.opt.sources=[],this.handlers={},"object"===(void 0===e?"undefined":c()(e))&&e.decoderPath){if("string"!=typeof e.decoderPath||void 0===e.decoderPath)throw new Error("EZUIDecoder requires the path of decoder");if("string"!=typeof e.id||void 0===e.id)throw new Error("EZUIDecoder requires parameter id");if("string"!=typeof e.url||void 0===e.url)throw new Error("EZUIDecoder requires parameter url");this.opt.sources.push(e.url),this.opt.currentSource=this.opt.sources[0],e.env,this.jSPlugin={};var o=this,i=this.getRealUrl(e);w(i)&&i.then(function(){var t=o.initDecoder(e);w(t)&&!1!==e.autoplay&&t.then(function(){o.play({handleError:e.handleError})})}).catch(function(){var t=o.initDecoder(e);w(t)&&!1!==e.autoplay&&t.then(function(){})})}else{var n="";if("string"==typeof e?n=e:"object"===(void 0===e?"undefined":c()(e))&&(n=e.id),this.videoId=n,this.video=document.getElementById(n),!this.video)throw new Error("EZUIPlayer requires parameter videoId");var r=this.video.getElementsByTagName("source");r=Array.prototype.slice.call(r,0),this.video.src&&(h&&v.test(this.video.src)?(this.video.removeAttribute("src"),this.video.load()):this.opt.sources.push(this.video.src));var s=r.length;if(s>0)for(var a=0;a<s;a++)h&&v.test(r[a].src)?this.video.removeChild(r[a]):this.opt.sources.push(r[a].src);if(this.opt.sources.length<1)throw new Error("no source found in video tag.");this.opt.cur=0,this.opt.poster=this.video.poster;var l=(f=this.video,t.getComputedStyle?t.getComputedStyle(f,null):f.currentStyle),d=this.video.width,u=this.video.height;d?(this.opt.width=d,this.opt.height=u||"auto",this.log("video width:"+this.opt.width+" height:"+this.opt.height)):(this.opt.width=l.width,this.opt.height=l.height,this.log("videoStyle.width:"+l.width+" wideoStyle.height:"+l.height)),this.opt.parentId=n,this.opt.autoplay=!!this.video.autoplay,this.log("autoplay:"+this.video.autoplay),this.opt.currentSource=this.opt.sources[this.opt.cur],this.getRealUrl(e)}var f;this.handlers={},this.initTime=(new Date).getTime(),this.on("play",function(){g({systemName:"open_netstream_play_main",playurl:this.opt.currentSource,Time:(new Date).Format("yyyy-MM-dd hh:mm:ss.S"),Enc:0,PlTp:1,Via:2,ErrCd:0,Cost:(new Date).getTime()-this.initTime})}),this.retry=2,this.on("error",function(){g({systemName:"open_netstream_play_main",playurl:this.opt.currentSource,cost:-1,ErrCd:-1})})};S.prototype.on=function(e,t){"string"==typeof e&&"function"==typeof t&&(void 0===this.handlers[e]&&(this.handlers[e]=[]),this.handlers[e].push(t))},S.prototype.emit=function(){if(this.handlers[arguments[0]]instanceof Array)for(var e=this.handlers[arguments[0]],t=e.length,o=0;o<t;o++)e[o].apply(this,Array.prototype.slice.call(arguments,1))},S.prototype.getRealUrl=function(e){var o=this,i="https://open.ys7.com";if(e&&e.env&&(i=e.env.domain),e&&e.decoderPath){var n=[],s=function(n){return new a.a(function(r,s){return function(n,r,s){var a="";if(/^ezopen:\/\//.test(s)){var l=i+"/jssdk/ezopen/getStreamToken?accessToken="+e.accessToken+"&num=10&type="+(-1!==e.url.indexOf("live")?"live":"playback"),c=function(e){if(0!==e.retcode)throw n("get realURL error"),new Error("获取播放token失败");a=a+e.data.params+"&ssn="+e.data.tokens[0],n(a)},h=i+"/api/lapp/live/url/ezopen",u="false";u=e&&e.env&&e.env.domain?-1!==e.env.domain.indexOf("https")?"false":"true":-1!==t.location.href.indexOf("https")?"false":"true",y(h,"POST",{ezopen:s,userAgent:t.navigator.userAgent,isFlv:!1,addressTypes:null,isHttp:u,accessToken:e.accessToken},function(e){if(200==e.code||0==e.retcode){var t=E("checkCode",e.data);if(t&&(o.opt.validateCode=t),a+=e.data,-1!==e.data.indexOf("playback")){if(E("begin",e.data))a=a.replace("&begin="+E("begin",e.data),"&begin="+d(E("begin",e.data),"000000"));else{var i=new Date;a=a+"&begin="+i.Format("yyyyMMdd")+"T000000Z"}E("end",e.data)?a=a.replace("&end="+E("end",e.data),"&end="+d(E("end",e.data),"235959")):(i=new Date,a=a+"&end="+i.Format("yyyyMMdd")+"T235959Z"),E("stream",e.data)||(a=a.replace("stream","&stream"))}y(l,"GET","",c)}else n("get realURL error")})}else n(s)}(r,0,n)})};return e.url.split(",").map(function(e){n.push(s(e))}),a.a.all(n).then(function(e){o.opt.sources=e,o.opt.currentSource=e[0]}).catch(function(){})}if(this.opt.currentSource)if(/^ezopen:\/\//.test(this.opt.currentSource)){if(!/^ezopen:\/\//.test(this.opt.currentSource))throw new Error("EZOPEN地址必须要以ezopen://开头");if(-1===this.opt.currentSource.indexOf(".com/"))throw new Error("EZOPEN地址格式不正确");if(!/[a-z\d]{32}(\.hd)?\.live/.test(this.opt.currentSource))throw new Error("EZOPEN地址格式uuid格式不正确");if(/(.*.hls.*|.*.m3u8.*|.*.wss.*|.*.flv.*|.*.rtmp.*){2,}/.test(this.opt.currentSource))throw new Error("EZOPEN地址多于两个播放协议");if(-1!==this.opt.currentSource.search(/(.hls|.m3u8|.wss|.flv|.rtmp)/)&&!/.live(.hls|.m3u8|.wss|.flv|.rtmp)/.test(this.opt.currentSource))throw new Error("请指定正确的播放协议");if(-1===this.opt.currentSource.search(/(.hls|.m3u8|.wss|.flv|.rtmp)/)&&!/[a-z\d]{32}(\.hd)?\.live$/.test(this.opt.currentSource))throw new Error("EZOPEN地址结尾不正确");var c=this;m(l,function(){var e={ezopen:c.opt.currentSource,userAgent:t.navigator.userAgent,isFlv:!(!flvjs||!flvjs.isSupported())&&flvjs.isSupported(),addressTypes:"HLS,RTMP,WS,FLV",isHttp:!(t.location.protocol.indexOf("s")>0)};g({ezopen:c.opt.currentSource,userAgent:t.navigator.userAgent,isFlv:!(!flvjs||!flvjs.isSupported())&&flvjs.isSupported(),addressTypes:"HLS,RTMP,WS,FLV",isHttp:!(t.location.protocol.indexOf("s")>0),systemName:"EZOPEN"}),c.log("---------------------------------------"),c.log("入参(ezopen)是：   "+e.ezopen),c.log("---------------------------------------"),c.log("入参(userAgent)是：   "+e.userAgent),c.log("---------------------------------------"),c.log("入参(isFlv)是：   "+e.isFlv),c.log("---------------------------------------"),c.log("入参(addressTypes)是：   "+e.addressTypes),c.log("---------------------------------------"),c.log("入参(isHttp)是：   "+e.isHttp),c.log("---------------------------------------");y(i+"/api/lapp/live/url/ezopen","POST",e,function(e){if(200!=e.code)throw console.log("平台获取播放地址错误"),c.log("data：   "+r()(e)),new Error(e.msg);c.log("播放地址是：   "+e.data),c.video.src=e.data,c.video.load(),c.tryPlay(e.data)})})}else this.tryPlay(this.opt.currentSource);else this.log("未找到合适的播放URL");function d(e,t){if(/^[0-9]{8}T[0-9]{6}Z$/.test(e))return e;if(/[0-9]{8,14}/.test(e)){var o=6-(14-e.length),i=t.length,n=e+t.substring(o,i);return n.slice(0,8)+"T"+n.slice(8)+"Z"}throw new Error("回放时间格式有误，请确认")}},S.prototype.tryPlay=function(e){if(this.log("开始尝试播放，播放配置参数为："),this.log(e),e&&"object"===(void 0===e?"undefined":c()(e))&&e.decoderPath);else{this.opt.currentSource=e;var t=this;if(/\.m3u8/.test(e))if(h||f)this.log("使用原生video"),this.video.style.heght=this.opt.height=9*Number(this.opt.width.replace(/px$/g,""))/16+"px",this.initVideoEvent();else{var o=-1!==e.indexOf("https");d&&!o?m(s,function(){t.initCKPlayer()}):m("https://open.ys7.com/sdk/js/2.0/js/hls.min.js",function(){Hls.isSupported()?(t.log("使用hls.js"),t.initHLS(e)):(t.log("2 使用flash"),m(s,function(){t.initCKPlayer()}))})}else/^rtmp:/.test(e)?h?(this.opt.cur++,this.tryPlay(e)):m(s,function(){t.initCKPlayer(e)}):/^wss:|^ws:/.test(e)?(i=navigator.userAgent).indexOf("compatible")>-1&&i.indexOf("MSIE")>-1?alert("WS协议不支持Ie11以下的浏览器！请使用IE11，或者更高版本的浏览器"):m("https://open.ys7.com/sdk/js/2.0/js/jsmpeg.min.js",function(){t.initJSmpeg(e)}):/\.flv/.test(this.opt.currentSource)&&m(l,function(){t.log("使用flv.js播放"),t.initflv()})}var i},S.prototype.initHLS=function(e){var t=this,o=new Hls({defaultAudioCodec:"mp4a.40.2"});o.loadSource(e),o.attachMedia(this.video),o.on(Hls.Events.MANIFEST_PARSED,function(){t.opt.autoplay&&t.video.play(),t.initVideoEvent()}),o.on(Hls.Events.ERROR,function(e,t){if(t.fatal)switch(t.type){case Hls.ErrorTypes.NETWORK_ERROR:console.log("fatal network error encountered, try to recover"),o.startLoad();break;case Hls.ErrorTypes.MEDIA_ERROR:console.log("fatal media error encountered, try to recover"),o.recoverMediaError();break;default:o.destroy()}}),this.hls=o},S.prototype.log=function(e){this.emit("log",e)},S.prototype.initCKPlayer=function(){this.log("ckplayer初始化");var e=this,o={play:function(){e.emit("play")},pause:function(){e.emit("pause")},error:function(){e.emit("error")}};t.ckplayer_status=function(){e.log(arguments),o[arguments[0]]&&o[arguments[0]]()},this.videoFlash=document.createElement("DIV"),this.video.parentNode.replaceChild(this.videoFlash,this.video),this.video=this.videoFlash,this.videoFlash.id=this.opt.parentId;var i=null;i=/^rtmp/.test(this.opt.currentSource)?{f:this.opt.currentSource,c:0,p:this.opt.autoplay?1:0,i:this.opt.poster,lv:1,loaded:"loadHandler"}:/\.m3u8/.test(this.opt.currentSource)?{s:4,f:"https://open.ys7.com/sdk/js/2.0/js/ckplayer/m3u8.swf",a:this.opt.currentSource,c:0,lv:1,p:this.opt.autoplay?1:0,i:this.opt.poster,loaded:"loadHandler"}:{f:this.opt.currentSource,c:0,p:1,loaded:"loadHandler"};this.flashId=this.opt.parentId+"flashId",t.CKobject.embedSWF("https://open.ys7.com/sdk/js/2.0/js/ckplayer/ckplayer.swf",this.opt.parentId,this.flashId,this.opt.width,this.opt.height,i,{bgcolor:"#FFF",allowFullScreen:!0,allowScriptAccess:"always",wmode:"transparent"})},S.prototype.initVideoEvent=function(){var e,t,o,i,n=this,r={loadstart:function(e){n.log("loadstart...当浏览器开始查找音频/视频时..."),n.emit("loadstart",e)},durationchange:function(e){n.log("durationchange...当音频/视频的时长已更改时..."),n.emit("durationchange",e)},loadedmetadata:function(e){n.log("loadedmetadata...当浏览器已加载音频/视频的元数据时..."),n.emit("loadedmetadata",e)},loadeddata:function(e){n.log("loadeddata...当浏览器已加载音频/视频的当前帧时..."),n.emit("loadeddata",e)},progress:function(e){n.log("progress...当浏览器正在下载音频/视频时..."),n.emit("progress",e)},canplay:function(e){n.log("canplay...当浏览器可以播放音频/视频时..."),n.emit("canplay",e)},canplaythrough:function(e){n.log("canplaythrough...当浏览器可在不因缓冲而停顿的情况下进行播放时..."),n.emit("canplaythrough",e)},abort:function(e){n.log("abort...当音频/视频的加载已放弃时..."),n.emit("abort",e)},emptied:function(e){n.log("emptied...当目前的播放列表为空时..."),n.emit("emptied",e)},ended:function(e){n.log("ended...当目前的播放列表已结束时..."),n.emit("ended",e)},pause:function(e){n.log("pause...当音频/视频已暂停时..."),n.emit("pause",e)},play:function(e){n.log("play...当音频/视频已开始或不再暂停时..."),n.emit("play",e)},playing:function(e){n.log("playing...当音频/视频在已因缓冲而暂停或停止后已就绪时..."),n.emit("playing",e)},ratechange:function(e){n.log("ratechange...当音频/视频的播放速度已更改时..."),n.emit("ratechange",e)},seeked:function(e){n.log("seeked...当用户已移动/跳跃到音频/视频中的新位置时..."),n.emit("seeked",e)},seeking:function(e){n.log("seeking...当用户开始移动/跳跃到音频/视频中的新位置时..."),n.emit("seeking",e)},stalled:function(e){n.log("stalled...当浏览器尝试获取媒体数据，但数据不可用时..."),n.emit("stalled",e)},suspend:function(e){n.log("suspend...当浏览器刻意不获取媒体数据时..."),n.emit("suspend",e),n.opt.autoplay&&n.video.play()},timeupdate:function(e){n.emit("timeupdate",e)},volumechange:function(e){n.log("volumechange...当音量已更改时..."),n.emit("volumechange",e)},waiting:function(e){n.log("waiting...当视频由于需要缓冲下一帧而停止..."),n.emit("waiting",e)},error:function(e){n.log("error...当在音频/视频加载期间发生错误时..."),n.emit("error",e)}};for(var s in r)this.video.addEventListener(s,r[s],!1);e=this.video,t=!1,o=!1,i=0,e.addEventListener("loadeddata",function(){t=!0},!1),e.addEventListener("stalled",function(){i++,o||i>=2&&!t&&(e.load(),e.play(),t=!1,o=!1,i=0)},!1),e.addEventListener("playing",function(){o=!0})},S.prototype.initJSmpeg=function(e){var t;this.canvasEle=document.createElement("canvas"),this.canvasEle.style.width=this.opt.width,this.canvasEle.style.height=this.opt.height,this.video.parentNode.replaceChild(this.canvasEle,this.video),this.canvasEle.id=this.opt.parentId,t&&t.destroy&&t.destroy(),t=new JSMpeg.Player(e,{canvas:this.canvasEle}),this.JSmpeg=t},S.prototype.initflv=function(){if(!flvjs.isSupported())throw this.log("浏览器不支持flv播放"),new Error("浏览器不支持flv播放");var e=this.video;e.getAttribute("controls")||e.setAttribute("controls",!0);var t=flvjs.createPlayer({type:"flv",url:this.opt.currentSource,isLive:!0},{enableStashBuffer:!0,stashInitialSize:128,enableWorker:!0});t.attachMediaElement(e),t.load(),t.play(),this.flv=t},S.prototype.play=function(e){if(this.log("开始播放"+this.opt.currentSource),t.CKobject)this.opt.autoplay=!0,this.initCKPlayer();else if(this.video)this.hls?(this.opt.autoplay=!0,this.hls.startLoad(),this.video.play()):this.JSmpeg?this.JSmpeg.play():(this.opt.autoplay=!0,this.video.play());else if(this.jSPlugin){var o=function(e){return i.jSPlugin.JS_OpenSound(0),{websocketConnectUrl:e.split("?")[0].replace("/live","").replace("/playback",""),websocketStreamingParam:(-1===e.indexOf("/live")?"/playback?":"/live?")+e.split("?")[1]}},i=this;e&&void 0!==e.index?e.index.forEach(function(t){i.jSPlugin.JS_Play(o(i.opt.sources[t]).websocketConnectUrl,{playURL:o(i.opt.sources[t]).websocketStreamingParam},t).then(function(){console.log("realplay success"),e&&e.handleSuccess&&e.handleSuccess()},function(t){if(console.log("realplay failed",t.oError),e&&e.handleError){var o=t.oError;e.handleError(o)}})}):i.opt.sources.forEach(function(t,n){i.jSPlugin.JS_Play(o(t).websocketConnectUrl,{playURL:o(t).websocketStreamingParam},n).then(function(){console.log("realplay success"),e&&e.handleSuccess&&(e.handleSuccess(),i.jSPlugin.JS_OpenSound(0))},function(t){if(console.log("realplay failed",t.oError),e&&e.handleError){var o=JSON.parse(i.errorCode).find(function(e){return e.detailCode.substr(-4)==t.oError.errorCode});e.handleError({retcode:t.oError.errorCode,msg:o?o.description:"其他错误"})}})})}},S.prototype.initDecoder=function(e){this.opt.id=e.id,this.log("初始化解码器---开始");var o=this;return new a.a(function(i){function n(e){if(200==e.code){if(!t.localStorage)return!1;var i=t.localStorage;i.errorCode=r()(e.data),o.errorCode=i.errorCode}}if(m(e.decoderPath+"/js/jsPlugin-1.2.0_test.js",function(){o.log("下载解码器完成，开始初始化"),o.jSPlugin=new JSPlugin({szId:e.id,iType:1,iWidth:e.width||600,iHeight:e.height||400,iMaxSplit:4,iCurrentSplit:e.splitBasis||1,szBasePath:e.decoderPath+"/js/"}),o.log("初始化解码器----完成"),o.log("开始设置秘钥");var t=o.opt.validateCode;t&&o.jSPlugin.JS_SetSecretKey(0,t),i("200 OK")}),t.localStorage){var s=t.localStorage;s.errorCode?o.errorCode=s.errorCode:y(e.decoderPath+"/js/errorCode.json","get",{language:1,time:(new Date).getTime(),appKey:"26810f3acd794862b608b6cfbc32a6b8"},n)}else y(e.decoderPath+"/js/errorCode.json","get",{language:1,time:(new Date).getTime(),appKey:"26810f3acd794862b608b6cfbc32a6b8"},n)})},S.prototype.stop=function(e){if(this.log("停止播放"+this.opt.currentSource),this.opt.autoplay=!1,t.CKobject)this.video.src="";else if(this.video)this.hls?(this.video.pause(),this.video.src="",this.hls.stopLoad()):this.flv?(this.flv.pause(),this.flv.unload(),this.flv.detachMediaElement(),this.flv.destroy(),this.flv=null):this.JSmpeg&&this.JSmpeg.stop();else if(this.jSPlugin){var o=function(e){for(var t=document.getElementById(i.opt.id).childNodes[0].childNodes[e],o=t.childNodes,n=o.length-1;n>=0;n--)t.removeChild(o[n])},i=this;if(void 0===e)for(var n=this.opt.sources.length,r=0;r<n;r++)this.jSPlugin.JS_Stop(r).then(function(){i.log("停止播放成功"+i.opt.currentSource),console.log("stop success")},function(){i.log("停止播放失败"+i.opt.currentSource),console.log("stop failed")}),o(r);else this.jSPlugin.JS_Stop(e).then(function(){i.log("停止播放成功"+i.opt.currentSource),console.log("stop success")},function(){i.log("停止播放失败"+i.opt.currentSource),console.log("stop failed")}),o(e)}},S.prototype.pause=function(){this.opt.autoplay=!1,t.CKobject?CKobject.getObjectById(this.flashId).videoPause():this.video?this.JSmpeg?this.JSmpeg.pause():this.video.pause():this.jSPlugin&&this.jSPlugin.JS_Pause(0).then(function(){},function(){})},S.prototype.load=function(){t.CKobject||this.video&&this.video.load()};var b=function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,t.AudioContext=t.AudioContext||t.webkitAudioContext},k=function(e){if(e&&"object"!==(void 0===e?"undefined":c()(e)))throw new Error("EZUITalk requires parameter it doesn't right");var o,i=e.id,n=e.token,s=e.uuid;if("string"!=typeof i||void 0===i)throw new Error("EZUITalk requires parameter audioId");if(this.audio=document.getElementById(i),!this.audio)throw new Error("EZUITalk requires parameter audioElement");if(!n)throw new Error("EZUITalk requires parameter accessToken");if(!s)throw new Error("EZUITalk requires parameter uuid");if(b(),!navigator.getUserMedia)throw new Error("当前浏览器不支持录音功能");if(!{trident:(o=t.navigator.userAgent).indexOf("Trident")>-1,presto:o.indexOf("Presto")>-1,webKit:o.indexOf("AppleWebKit")>-1,gecko:o.indexOf("Gecko")>-1&&-1===o.indexOf("KHTML"),mobile:!!o.match(/AppleWebKit.*Mobile.*/),ios:!!o.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:o.indexOf("Android")>-1||o.indexOf("Adr")>-1,iPhone:o.indexOf("iPhone")>-1,iPad:o.indexOf("iPad")>-1,webApp:-1==o.indexOf("Safari"),weixin:o.indexOf("MicroMessenger")>-1,qq:" qq"==o.match(/\sQQ/i),ie:o.indexOf("Trident")>-1||o.indexOf("MSIE")>-1||o.indexOf("compatible")>-1}.mobile)throw new Error("对讲功能仅在手机中支持进行对讲");this.handlers={};var a=this;this.BUFFER=[],this.encoder=void 0,this.isEnded=!0,this.LENGTH=20,this.audio.addEventListener("ended",function(){a.isEnded=!0}),this.audioPlay=function(){if(this.isEnded){this.isEnded=!1,this.BUFFER.length>this.LENGTH&&(this.BUFFER=this.BUFFER.slice(0,this.LENGTH)),this.encoder=new WavAudioEncoder(16e3,1);for(var e=this.BUFFER.shift();e;)this.encoder.encode(e),e=this.BUFFER.shift();this.audio.src=URL.createObjectURL(this.encoder.finish())}},this.start=function(){this.wsUrl="wss://test2.ys7.com:20007/opentalk/"+s,this.socket=new WebSocket(this.wsUrl),this.talk()},this.talk=function(){m("https://open.ys7.com/sdk/js/2.0/js/wav-audio-encoder.js",function(){a.socket.onopen=function(){a.log("websocket已连接");var e={accessToken:n,uuid:s},t=r()(e);a.socket.send(t),a.log("websocket 发送文本数据"),a.startRecord()},a.socket.onclose=function(){a.log("websocket已关闭")},a.socket.onerror=function(e){a.log("websocket出错->"+r()(e))},a.socket.onmessage=function(e){a.log("websocket 接收数据"),a.BUFFER.push(e.data),a.audioPlay()},a.audio.setAttribute("autoplay",!0),a.audio.play()})},this.startRecord=function(){navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){var t=new AudioContext,o=t.createMediaStreamSource(e),i=t.createScriptProcessor(16384,1,1);a.log("当前浏览器采样率为： "+t.sampleRate),i.onaudioprocess=function(e){var t=e.inputBuffer.getChannelData(0);n.postMessage({cmd:"encode",buf:t})};var n=new Worker("../js/worker.js");n.onmessage=function(e){switch(e.data.cmd){case"pcm":a.socket.send(e.data.buf),console.log(e.data.buf),a.log("websocket 发送数据");break;default:a.log("未知信息："+e.data)}},i&&o&&(o.connect(i),i.connect(t.destination)),a.log("开始对讲"),a.stop=function(){i&&o&&(o.disconnect(),i.disconnect()),a.socket.close(),a.log("结束对讲")}}).catch(function(e){var t;switch(e.code||e.name){case"PermissionDeniedError":case"PERMISSION_DENIED":case"NotAllowedError":t="用户拒绝访问麦克风";break;case"NOT_SUPPORTED_ERROR":case"NotSupportedError":t="浏览器不支持麦克风";break;case"MANDATORY_UNSATISFIED_ERROR":case"MandatoryUnsatisfiedError":t="找不到麦克风设备";break;default:t="无法打开麦克风，异常信息:"+(e.code||e.name)}a.log(t),alert(t)})}};k.prototype.on=function(e,t){"string"==typeof e&&"function"==typeof t&&(void 0===this.handlers[e]&&(this.handlers[e]=[]),this.handlers[e].push(t))},k.prototype.emit=function(){if(this.handlers[arguments[0]]instanceof Array)for(var e=this.handlers[arguments[0]],t=e.length,o=0;o<t;o++)e[o].apply(this,Array.prototype.slice.call(arguments,1))},k.prototype.log=function(e){this.emit("log",e)};var P={EZUIPlayer:S,EZUITalk:k};return o||(t.EZUIKit=P,t.EZUIPlayer=S),P},"object"===c()(e)&&"object"===c()(e.exports)?e.exports=t.document?i(t,!0):function(e){if(!e.document)throw new Error("EZUIPlayer requires a window with a document");return i(e)}:i(t)}.call(t,o("VC+f")(e))},ko4I:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("4YfN"),n=o.n(i),r=o("2bvH");o("avHd");var s={name:"MonitorView",components:{},data:function(){return{videos:[],w:600,h:400,isMonitor:!0,monitor:null,player:null,src:null}},computed:n()({},Object(r.c)({user:function(e){return e.account.user}})),created:function(){},mounted:function(){var e=this,t=this.user.companyId;this.$get("company/monitor",{companyId:t}).then(function(t){e.videos=t.data,e.videos&&e.play(e.videos[0])})},beforeDestroy:function(){console.log("destroy");try{this.stopMonitor(),this.stopPlayer()}catch(e){}},methods:{stopPlayer:function(){this.player&&(this.player.stop(),this.player=null,this.src=null)},stopMonitor:function(){this.monitor&&(this.monitor.stop(),this.monitor=null)},play:function(e){var t=this;this.stopMonitor(),this.stopPlayer(),e.token?(this.isMonitor=!0,setTimeout(function(){t.monitor=new EZUIKit.EZUIPlayer({id:"playWind",autoplay:!0,url:e.url,accessToken:e.token,decoderPath:"../",width:t.w,height:t.h})},500)):(this.isMonitor=!1,this.src=e.url,setTimeout(function(){t.player=new EZUIKit.EZUIPlayer("myPlayer")},500))}}},a={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"multi-page not-menu-page user-profile"},[o("div",{staticClass:"video"},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.isMonitor,expression:"isMonitor"}],style:{width:e.w+"px",height:e.h+"px",display:"inline-block"},attrs:{id:"playWind"}}),e._v(" "),o("video",{directives:[{name:"show",rawName:"v-show",value:!e.isMonitor,expression:"!isMonitor"}],style:{width:e.w+"px",height:e.h+"px",display:"inline-block"},attrs:{id:"myPlayer",src:e.src,controls:"",playsInline:"","webkit-playsinline":"",autoplay:""}})]),e._v(" "),o("div",{staticClass:"nav"},e._l(e.videos,function(t,i){return o("a-button",{key:i,attrs:{plain:""},on:{click:function(o){e.play(t)}}},[e._v(e._s(t.title))])}))])},staticRenderFns:[]};var l=o("C7Lr")(s,a,!1,function(e){o("yQ8g")},null,null);t.default=l.exports},yQ8g:function(e,t){}});
//# sourceMappingURL=14.1db04eff8f7ea3c5fcfa.js.map