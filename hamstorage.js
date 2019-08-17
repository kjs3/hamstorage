// Lame trick to trim some bytes
const s = JSON.stringify
const p = JSON.parse

const canUseLS = _localStorageAvailable()
const storage = _setupStorage()

function _setupStorage() {
  return canUseLS ? window.localStorage : new _alternativeStorage()
}

function _alternativeStorage() {
  const storageObj = {}
  this.obj = storageObj

  this.getItem = function(key) {
    const hasValue = typeof storageObj[key] !== 'undefined'

    return hasValue ? storageObj[key] : null
  }

  this.setItem = function(key, value) {
    storageObj[key] = value
  }

  this.removeItem = function(key) {
    storageObj[key] = undefined
  }
}

// Availability check adapted from MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function _localStorageAvailable() {
  let storage
  typeof DOMException !== 'undefined'

  try {
    storage = window['localStorage']
    const x = 'foo'
    storage.setItem(x, x)
    storage.removeItem(x)

    return true
  } catch(e) {
    return typeof DOMException !== 'undefined' &&
      e instanceof DOMException && (

      // Checking for full localStorage (quota exceeded).
      // Testing code AND name field, because code might not be present.

      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
  }
}

function get(key) {
  try {
    return p(storage.getItem(key))
  } catch (e) {
    // If there's an Error reading/parsing the value set it to null.
    // This clears out unstringified objects stored as '[object Object]'
    storage.setItem(key, null)

    return null
  }
}

function set(key, value) {
  storage.setItem(key, s(value))
}

function rm(key) {
  storage.removeItem(key)
}

module.exports = {
  getItem: get,
  setItem: set,
  removeItem: rm,
  source: canUseLS ? 'localStorage' : 'alternative',
  _storage: storage, // exported for testing
}
