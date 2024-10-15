
var emscripten_sourcemap_xmlHttp = undefined;
function emscripten_sourceMapLoaded() {
  if (emscripten_sourcemap_xmlHttp.readyState === 4) {
    if (emscripten_sourcemap_xmlHttp.status === 200 || emscripten_sourcemap_xmlHttp.status === 0) {
      emscripten_source_map = new window.sourceMap.SourceMapConsumer(emscripten_sourcemap_xmlHttp.responseText);
      console.log('Source map data loaded.');
    } else {
      console.warn('Source map data loading failed with status code ' + emscripten_sourcemap_xmlHttp.status + '.');
    }
    emscripten_sourcemap_xmlHttp = undefined;
    removeRunDependency('sourcemap');
  }
}
function emscripten_loadSourceMap() {
  var url = window.location.href.replace(/\.[^.]+$/, '.wasm.map');
  console.log('Loading source map data from ' + url + '..');
  addRunDependency('sourcemap');
  emscripten_sourcemap_xmlHttp = new XMLHttpRequest();
  emscripten_sourcemap_xmlHttp.onreadystatechange = emscripten_sourceMapLoaded;
  emscripten_sourcemap_xmlHttp.open("GET", url, true);
  emscripten_sourcemap_xmlHttp.responseType = "text";
  emscripten_sourcemap_xmlHttp.send(null);
}

var Module;
if (Module['preRun'] instanceof Array) {
  Module['preRun'].push(emscripten_loadSourceMap);
} else {
  Module['preRun'] = [emscripten_loadSourceMap];
}
