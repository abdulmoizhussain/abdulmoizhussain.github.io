(this["webpackJsonpabdulmoizhussain.github.io"]=this["webpackJsonpabdulmoizhussain.github.io"]||[]).push([[0],{38:function(e,t,n){e.exports=n(68)},43:function(e,t,n){},49:function(e,t,n){},61:function(e,t){},64:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(33),l=n.n(o),c=n(12),i=n(1),s="/",u="/rgb_to_hex",m="/render_markdown",d="/counter",v="COUNTER",p=n(8),h=n(9),b=n(11),f=n(10),g=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).inputCopyToClip=r.a.createRef(),e.state={displayCopyButton:!1,message:"",youtubeEmbeddedUrl:"",youtubeWebUrl:"",copyToClipInProgress:!1},e.onKeyUpEmbeddedToWebUrl=function(){var t=e.state.youtubeEmbeddedUrl,n=new RegExp(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{0,11}).*/g).exec(t);if(n&&n.length>2){var a=n[2],r="https://www.youtube.com/watch?v=".concat(a);e.setState({message:r,youtubeWebUrl:r,displayCopyButton:!0})}else e.setState({message:"Invalid youtube url",displayCopyButton:!1})},e.copyToClip=function(){var t=e.inputCopyToClip.current;t&&(t.value=e.state.youtubeWebUrl,e.setState({copyToClipInProgress:!0},(function(){t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),e.setState({copyToClipInProgress:!1})})))},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.displayCopyButton,a=t.message,o=t.youtubeEmbeddedUrl;return r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("label",{className:"col mb-0",htmlFor:"youtube_embedded_url"},"Convert embedded/shared youtube-url to web-url:")),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("input",{type:"text",placeholder:"https://youtu.be/eg_link",id:"youtube_embedded_url",value:o,size:25,className:"text-center",onChange:function(t){return e.setState({youtubeEmbeddedUrl:t.target.value},e.onKeyUpEmbeddedToWebUrl)}}))),r.a.createElement("div",{className:"row"},r.a.createElement("span",{className:"col"},a)),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-1"}),r.a.createElement("div",{className:"col-10"},r.a.createElement("button",{onClick:this.copyToClip,className:"btn btn-primary m-0 ".concat(n?"":"invisible")},"Copy Web URL")),r.a.createElement("div",{className:"col-1"})),r.a.createElement("input",{hidden:!this.state.copyToClipInProgress,ref:this.inputCopyToClip}))))}}]),n}(r.a.Component),E=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).textToCleanRef=r.a.createRef(),e.state={textToClean:""},e.makeItSearchable=function(){var t=e.state.textToClean.replace(/[^a-zA-Z0-9]+/g," ").trim(),n=document.createElement("textarea");n.value=t,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n)},e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e;null===(e=this.textToCleanRef.current)||void 0===e||e.focus()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("input",{ref:this.textToCleanRef,type:"text",placeholder:"Paste here the text to clean.",value:this.state.textToClean,className:"text-center",size:25,onChange:function(t){e.setState({textToClean:t.target.value})}}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("button",{onClick:this.makeItSearchable,className:"btn btn-primary btn-sm"},"Clean & Copy"))))}}]),n}(r.a.Component),y=(n(43),function(){return r.a.createElement("div",{className:"container-fluid font-lg text-white text-center bg-dark"},r.a.createElement("br",null),r.a.createElement("div",{className:"row p-0 m-0"},r.a.createElement("div",{className:"col p-0 m-0"},r.a.createElement("ul",{className:"list-unstyled"},r.a.createElement("li",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement(c.b,{className:"col app_link p-0",to:u},"RGB-Hex"))),r.a.createElement("li",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement(c.b,{className:"col app_link p-0",to:m},"Render Markdown"))),r.a.createElement("li",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement(c.b,{className:"col app_link p-0",to:d},"Counter"))),r.a.createElement("li",{className:"row mt-3"},r.a.createElement(E,null)),r.a.createElement("li",{className:"row mt-3"},r.a.createElement(g,null))))))});n(49);function w(){var e="",t="invalid RGB value: "+(e=(e=document.getElementById("rgb").value.trim()).replace(/\s+/g," "));if(!e.length||e.length<5)return k(t);var n=e.split(e.indexOf(",")>-1?",":" "),a=n[0],r=n[1],o=n[2],l=n.length>3?n[3]:"1";t="#",t+=C(a),t+=C(r),t+=C(o),k(t+=function(e){var t=parseFloat(e);return void 0===t||null===t||isNaN(t)||t>1||t<0?"ff":(t=Math.round(100*t)/100,N(t=Math.round(255*t)))}(l))}function C(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=parseInt(e,10);return isNaN(t)?"00":N(t)}function N(e){var t=e.toString(16).toUpperCase();return 1===t.length?"0"+t:t}function k(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";document.getElementById("hexSTR").innerHTML=e,document.getElementById("rgbBox").setAttribute("style","background-color: "+e)}function x(){var e="",t="Invalid Hex Value: "+(e=(e=document.getElementById("hex").value.trim()).replace(/ /g,""));if(!e.length||e.length<6)return R(t);e.indexOf("#")>-1&&(e=e.substr(1));var n=(e=e.substr(0,6)).substr(0,2),a=e.substr(2,2),r=e.substr(4,2);e="rgb(",e+=S(n)+", ",e+=S(a)+", ",R(e+=S(r)+")")}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"0";return parseInt(e,16)}function R(e){document.getElementById("rgbSTR").innerHTML=e}var T=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"parent-box"},r.a.createElement("div",{id:"rgbBox"},"\xa0"),r.a.createElement("div",{className:"box"},r.a.createElement("label",{htmlFor:"rgb"},"RGB(\xa0",r.a.createElement("input",{type:"text",id:"rgb",placeholder:"255 255 255 | 255, 255, 255",onChange:w.bind(this),size:25}),"\xa0)"),"\xa0\xa0\xa0",r.a.createElement("span",{id:"hexSTR"}))),r.a.createElement("div",{className:"parent-box"},r.a.createElement("div",{id:"hexBox"},"\xa0"),r.a.createElement("div",{className:"box"},r.a.createElement("label",{htmlFor:"hex"},"#\xa0",r.a.createElement("input",{type:"text",id:"hex",placeholder:"0099ff",onChange:x.bind(this)})),"\xa0\xa0\xa0",r.a.createElement("span",{id:"rgbSTR"}))))}}]),n}(r.a.Component),D=n(35),U=(n(64),function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={markdown:"",whileDrag:!1},e.onDropEvent=function(t){t.preventDefault();var n=new FileReader;n.addEventListener("load",(function(t){var n,a=null===t||void 0===t||null===(n=t.target)||void 0===n?void 0:n.result;e.setState({markdown:a})})),n.readAsText(t.dataTransfer.files[0])},e.onDragEvent=function(t){t.preventDefault(),e.setState({whileDrag:!0})},e.onDragLeave=function(t){t.preventDefault(),e.setState({whileDrag:!1})},e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"dropContainer",onDragOver:this.onDragEvent,onDragEnter:this.onDragEvent,onDragLeave:this.onDragLeave,onDrop:this.onDropEvent,className:this.state.whileDrag?"on_drag":""},r.a.createElement("input",{type:"file"}),r.a.createElement("h4",null,"Drop markdown file here")),r.a.createElement(D.a,{markdown:this.state.markdown}))}}]),n}(r.a.Component)),O=(n(65),n(37)),W="ArrowUp",j="ArrowRight",B="ArrowDown",I="ArrowLeft",L=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).counterTextElement=r.a.createRef(),e.swipeRequiredDistance=60,e.state={counter:0},e.makeCounterTextUnSelectable=function(){var t=e.counterTextElement.current;t&&(t.addEventListener("selectstart",(function(){return!1})),t.addEventListener("mousedown",(function(){return!1})),t.style.setProperty("MozUserSelect","none"),t.style.setProperty("userSelect","none"))},e.onBeforeUnload=function(){e.saveCurrentCounter()},e.saveCurrentCounter=function(){localStorage.setItem(v,e.state.counter.toString())},e.onKeyUpListener=function(t){var n=t.key;n===W||n===j?e.incrementCounter():n!==I&&n!==B||e.decrementCounter()},e.onDecrement=function(t){var n=[Math.abs(t.deltaX),Math.abs(t.deltaY)],a=n[1];(n[0]>e.swipeRequiredDistance||a>e.swipeRequiredDistance)&&e.decrementCounter()},e.decrementCounter=function(){e.setState({counter:e.state.counter-1})},e.onIncrement=function(t){var n=[Math.abs(t.deltaX),Math.abs(t.deltaY)],a=n[1];(n[0]>e.swipeRequiredDistance||a>e.swipeRequiredDistance)&&e.incrementCounter()},e.incrementCounter=function(){e.setState({counter:e.state.counter+1})},e.onResetCounter=function(){window.confirm("Are you sure you want to reset counter to zero?")&&e.setState({counter:0})},e}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.setState({counter:Number(localStorage.getItem(v))}),window.addEventListener("beforeunload",this.onBeforeUnload),window.addEventListener("keyup",this.onKeyUpListener),this.makeCounterTextUnSelectable()}},{key:"componentWillUnmount",value:function(){this.saveCurrentCounter(),window.removeEventListener("beforeunload",this.onBeforeUnload),window.removeEventListener("keyup",this.onKeyUpListener)}},{key:"render",value:function(){return r.a.createElement("div",{className:"p-2"},r.a.createElement(O.a,{style:{height:.88*document.body.clientHeight},className:"bg-swipe-container p-0 m-0 text-center border border-secondary",onSwipedUp:this.onIncrement,onSwipedRight:this.onIncrement,onSwipedDown:this.onDecrement,onSwipedLeft:this.onDecrement},r.a.createElement("button",{className:"btn btn-danger btn-sm mt-2",onClick:this.onResetCounter},"Reset"),r.a.createElement("button",{className:"btn btn-primary btn-sm mt-2 ml-2",onClick:this.saveCurrentCounter},"Save"),r.a.createElement("h1",{className:"mt-40 un-selectable-text"},this.state.counter)))}}]),n}(r.a.Component),A=function(){return r.a.createElement("svg",{height:30,width:32,"aria-hidden":"true",className:"octicon octicon-mark-github",fill:"#24292E",viewBox:"0 0 16 16",version:"1.1"},r.a.createElement("path",{fillRule:"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"}))},M=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function _(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}function z(){console.log("forceUpdateServiceWorker"),console.log(navigator.serviceWorker.ready),navigator.serviceWorker.ready.then(console.log),(console.log("getServiceWorkerRegistration"),"serviceWorker"in navigator?(console.log("serviceWorker' in navigator"),navigator.serviceWorker.ready):new Promise((function(e,t){e()}))).then((function(e){console.log("getServiceWorkerRegistration"),null===e||void 0===e||e.unregister().then((function(){window.location.reload()}))}))}var P=function(){return r.a.createElement("nav",{className:"navbar"},r.a.createElement("a",{href:"https://github.com/abdulmoizhussain",title:"Abdul Moiz's Github Repositories"},r.a.createElement(A,null)),r.a.createElement("div",{className:"ml-auto"},r.a.createElement("button",{className:"btn btn-sm btn-light mr-2",onClick:z},"ForceUpdateSite"),r.a.createElement(c.b,{to:s,title:"Home Page"},r.a.createElement("b",null,"Home"))))},F=function(){return r.a.createElement(c.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(P,null),r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:s},r.a.createElement(y,null)),r.a.createElement(i.b,{path:u},r.a.createElement(T,null)),r.a.createElement(i.b,{path:m},r.a.createElement(U,null)),r.a.createElement(i.b,{path:d},r.a.createElement(L,null)),r.a.createElement(i.a,{from:"*",to:s}))))};n(66),n(67);l.a.render(r.a.createElement(F,null),document.getElementById("root")),function(e){if(console.log("production"),"serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");M?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):_(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):_(t,e)}))}}({onUpdate:function(e){},onSuccess:function(e){}})}},[[38,1,2]]]);
//# sourceMappingURL=main.9d1a14e1.chunk.js.map