function onChangeEmbeddedToWebUrl(inputElement) {
  const resultElement = document.getElementById('youtube_web_url');
  const buttonCopyToClip = document.getElementById('button_copy_to_clip');

  // owner of regular expression -> https://stackoverflow.com/a/9836367/8075004
  const result = new RegExp(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{0,11}).*/g).exec(inputElement.value);

  if (result && result.length > 2) {
    const videoId = result[2];
    resultElement.innerHTML = `https://www.youtube.com/watch?v=${videoId}`;
    buttonCopyToClip.removeAttribute('disabled');
  } else {
    resultElement.innerHTML = `Invalid url`;
    buttonCopyToClip.setAttribute('disabled', 'disabled');
  }

  // OR
  // try {
  //   const url = new URL(inputElement.value);
  //   let videoId;

  //   if (url.search) {
  //     const urlSearchParams = new URLSearchParams(url.search);
  //     videoId = urlSearchParams.get('v');
  //   } else {
  //     videoId = url.pathname.replace('/', '');
  //   }

  //   resultElement.innerHTML = `https://www.youtube.com/watch?v=${videoId}`;
  // } catch {
  //   resultElement.innerHTML = 'Invalid url';
  // }
}

function copyToClip() {
  // owner of solution: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  const sourceElement = document.getElementById('youtube_web_url');
  const input = document.createElement('input');

  input.setAttribute('style', 'display: hidden;');
  input.value = sourceElement.innerHTML;
  document.body.appendChild(input);

  input.select();
  input.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");

  document.body.removeChild(input);
}

var navBarInnerHtml = `<div class="container">
<div class="navbar-header">
  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
</div>
<div class="collapse navbar-collapse" id="myNavbar">
<a href="./index.html" title="Abdul Moiz's Github Repos">
  <svg height="30" class="octicon octicon-mark-github" fill="#24292E" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
  </a>
  <ul class="nav navbar-nav navbar-right" id="nav-bar-ul">
    <li class="a"><a title="Home Page" href="./index.html">Home</a></li>
  </ul>
</div>
</div>`;

function createNavBar() {
  // to put tab icon on every page
  // document.getElementsByTagName("head")[0].innerHTML += `<link rel="icon" href="final-logo.png">`;
  var parent = document.getElementsByTagName("body")[0];
  var firstElement = parent.firstElementChild;

  let newElement = document.createElement("nav");
  newElement.setAttribute("class", "navbar navbar-default");
  newElement.innerHTML = navBarInnerHtml;
  parent.insertBefore(newElement, firstElement);
}

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.reload();
    });
}


function addFooter() {
  var footerInnerHTML = `<footer class="social-footer"
  style="position: sticky; bottom: 0; width: 100%">
  <div class="social-footer-left">&copy; 2018, All Rights Reserved.</div>
  <div class="social-footer-icons">
    <ul class="menu simple">
      <a href="https://www.facebook.com/"
        ><i class="fa fa-facebook" aria-hidden="true"></i
      ></a>
      <a href="https://www.instagram.com/?hl=en"
        ><i class="fa fa-instagram" aria-hidden="true"></i
      ></a>
      <a href="https://www.pinterest.com/"
        ><i class="fa fa-pinterest-p" aria-hidden="true"></i
      ></a>
      <a href="https://twitter.com/?lang=en"
        ><i class="fa fa-twitter" aria-hidden="true"></i
      ></a>
    </ul>
  </div>
</footer>`;
  document.head.innerHTML += `<link
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
rel="stylesheet"
/>`;
  document.getElementsByTagName("body")[0].innerHTML += footerInnerHTML;
}

createNavBar();
// addFooter();
