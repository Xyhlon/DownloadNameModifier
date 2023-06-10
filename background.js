chrome.runtime.onInstalled.addListener(function() {
  // Initialization code here (if required)
});

chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest) {
  chrome.storage.sync.get(['prependString', 'addTimestamp'], function(result) {
    var newFilename = downloadItem.filename;

    if (result.prependString) {
      newFilename = result.prependString + "_" + newFilename;
    }

    if (result.addTimestamp) {
      newFilename = addTimestampToFilename(newFilename);
    }

    suggest({ filename: newFilename });
  });
  return true;
});

function addTimestampToFilename(filename) {
  var timestamp = new Date().toISOString().replace(/[-:.]/g, '').split("T")[0];
  var parts = filename.split('.');
  var extension = parts.pop();
  return timestamp + '_' + parts.join('.') + '.' + extension;
}
