document.addEventListener('DOMContentLoaded', function() {
  var prependString = document.getElementById('prependString');
  var addTimestamp = document.getElementById('addTimestamp');

  prependString.addEventListener('input', saveOptions);
  addTimestamp.addEventListener('change', saveOptions);

  loadOptions();
});

function saveOptions() {
  var prependString = document.getElementById('prependString').value;
  var addTimestamp = document.getElementById('addTimestamp').checked;

  chrome.storage.sync.set({
    prependString: prependString,
    addTimestamp: addTimestamp
  });
}

function loadOptions() {
  chrome.storage.sync.get(['prependString', 'addTimestamp'], function(result) {
    document.getElementById('prependString').value = result.prependString || '';
    document.getElementById('addTimestamp').checked = result.addTimestamp || false;
  });
}
