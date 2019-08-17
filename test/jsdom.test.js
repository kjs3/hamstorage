/**
 * @jest-environment jsdom
 */

import hamStorage from '../hamstorage'

test('returns localStorage by default', () => {
  expect(hamStorage.source).toBe('localStorage')
})

describe('setItem()', () => {
  test('sets item in localStorage as a stringified/serialized value', () => {
    const value = { my: 'object' }
    const expectedValue = JSON.stringify(value)
    hamStorage.setItem('myKey', value)

    expect(localStorage.getItem('myKey')).toBe(expectedValue)
  })
})

describe('getItem()', () => {
  test('returns deserialize value from localStorage', () => {
    const testObj = { test: 'obj' }
    localStorage.setItem('myKey', JSON.stringify(testObj))

    expect(hamStorage.getItem('myKey')).toEqual(testObj)
  })
})
