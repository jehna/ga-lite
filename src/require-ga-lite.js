/**
 * If you change this file, make sure to run `npm run require-script` and
 * copy-paste the output to README.md and index.html
 */
(function (window, document, galiteName, scriptString, src, scriptTag, firstScriptTag) {
  window[galiteName] = window[galiteName] || function () {
    (window[galiteName].q = window[galiteName].q || []).push(arguments)
  }
  scriptTag = document.createElement(scriptString)
  firstScriptTag = document.getElementsByTagName(scriptString)[0]
  scriptTag.async = true
  scriptTag.src = src
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
})(window, document, 'galite', 'script', 'https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js')
