/**
 * @jest-environment jsdom
 */

import { getItem, setItem, source, _getStorage, _setupStorage } from '../hamstorage'

test('returns localStorage by default', () => {
  expect(source).toBe('localStorage')
})

describe('setItem()', () => {
  test('sets item in localStorage as a stringified/serialized value', () => {
    const value = { my: 'object' }
    const expectedValue = JSON.stringify(value)
    setItem('myKey', value)

    expect(localStorage.getItem('myKey')).toBe(expectedValue)
  })
})

describe('getItem()', () => {
  test('returns deserialize value from localStorage', () => {
    const testObj = { test: 'obj' }
    localStorage.setItem('myKey', JSON.stringify(testObj))

    expect(getItem('myKey')).toEqual(testObj)
  })
})

describe('_setupStorage()', () => {
  test('reinitializes with same underlying store when using localStorage', () => {
    const initialStore = _getStorage()
    _setupStorage()
    const finalStore = _getStorage()

    expect(finalStore).toBe(initialStore)
  })
})
