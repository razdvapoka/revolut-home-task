import reducer, { initialState } from './index'
import { expect } from 'chai'
import {
  fetchRatesSuccess,
  setFromCurrencyIndex,
  setToCurrencyIndex,
  setAmountToConvert
} from './actions'
import { fromJS } from 'immutable'

describe(`converter reducer`, () => {
  it('should save fetched rates', () => {
    const base1 = `RUB`
    const rates1 = { a: 1 }
    const base2 = `USD`
    const rates2 = { b: 2 }
    const base3 = `EUR`
    const rates3 = { c: 2 }

    const payload = [ {
      base: base1,
      rates: rates1
    }, {
      base: base2,
      rates: rates2
    }, {
      base: base3,
      rates: rates3
    } ]

    const newState = reducer(initialState, fetchRatesSuccess(payload))
    expect(newState).to.equal(initialState.set(`rates`, fromJS({
      [base1]: rates1,
      [base2]: rates2,
      [base3]: rates3
    })))
  })

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
