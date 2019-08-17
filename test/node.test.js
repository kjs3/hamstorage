/**
 * @jest-environment node
 */

import hamStorage, { _storage } from '../hamstorage'

test('returns alternative storage by default', () => {
  expect(hamStorage.source).toBe('alternative')
})

describe('setItem()', () => {
  test('sets item as a stringified/serialized value', () => {
    const value = { my: 'object' }
    const expectedValue = JSON.stringify(value)
    hamStorage.setItem('myKey', value)

    expect(_storage.obj['myKey']).toEqual(expectedValue)
  })
})

describe('getItem()', () => {
  test('returns deserialized value from store', () => {
    const testObj = { test: 'obj' }
    _storage.obj['myKey'] = JSON.stringify(testObj)

    expect(hamStorage.getItem('myKey')).toEqual(testObj)
  })
})
