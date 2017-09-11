import reducer, { initialState } from './index'
import { expect } from 'chai'
import {
  setFromCurrencyIndex,
  setToCurrencyIndex,
  setAmountToConvert
} from './actions'

describe(`converter reducer`, () => {
  it('should set "from" currency index', () => {
    const newFromCurrencyIndex = 2
    const newState = reducer(initialState, setFromCurrencyIndex(newFromCurrencyIndex))
    expect(newState).to.equal(initialState.set(`fromCurrencyIndex`, newFromCurrencyIndex))
  })

  it('should set "to" currency index', () => {
    const newToCurrencyIndex = 2
    const newState = reducer(initialState, setToCurrencyIndex(newToCurrencyIndex))
    expect(newState).to.equal(initialState.set(`toCurrencyIndex`, newToCurrencyIndex))
  })

  it('should set amount to convert', () => {
    const amountToConvert = 20.33
    const newState = reducer(initialState, setAmountToConvert(amountToConvert))
    expect(newState).to.equal(initialState.set(`amountToConvert`, amountToConvert))
  })

  it('shouldn\'t set amount to convert if given value is not a number', () => {
    const amountToConvert = `abc`
    const newState = reducer(initialState, setAmountToConvert(amountToConvert))
    expect(newState).to.equal(initialState)
  })

  it('shouldn\'t set amount to convert if given value is a negative number', () => {
    const amountToConvert = -100.22
    const newState = reducer(initialState, setAmountToConvert(amountToConvert))
    expect(newState).to.equal(initialState)
  })
})
