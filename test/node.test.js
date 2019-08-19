/**
 * @jest-environment node
 */

import { getItem, setItem, source, _getStorage, _setupStorage } from '../hamstorage'

test('returns alternative storage by default', () => {
  expect(source).toBe('alternative')
})

describe('setItem()', () => {
  test('sets item as a stringified/serialized value', () => {
    const value = { my: 'object' }
    const expectedValue = JSON.stringify(value)
    setItem('myKey', value)

    expect(_getStorage().obj['myKey']).toEqual(expectedValue)
  })
})

describe('getItem()', () => {
  test('returns deserialized value from store', () => {
    const testObj = { test: 'obj' }
    _getStorage().obj['myKey'] = JSON.stringify(testObj)

    expect(getItem('myKey')).toEqual(testObj)
  })
})

describe('_setupStorage()', () => {
  test('initializes new store when using alternativeStorage', () => {
    const initialStore = _getStorage()
    _setupStorage()
    const finalStore = _getStorage()

    expect(finalStore).not.toBe(initialStore)
  })
})
