import { createSelector } from 'reselect'

export const currenciesSelector = state =>
  state.converter.get(`currencies`)

export const fromCurrencyIndexSelector = state =>
  state.converter.get(`fromCurrencyIndex`)

export const toCurrencyIndexSelector = state =>
  state.converter.get(`toCurrencyIndex`)

const balanceSelector = state =>
  state.converter.get(`balance`)

const ratesSelector = state =>
  state.converter.get(`rates`)

export const amountToConvertSelector = state =>
  state.converter.get(`amountToConvert`)

export const fromCurrencySelector = createSelector(
  currenciesSelector,
  fromCurrencyIndexSelector,
  (currencies, fromCurrencyIndex) => currencies.get(fromCurrencyIndex)
)

export const toCurrencySelector = createSelector(
  currenciesSelector,
  toCurrencyIndexSelector,
  (currencies, toCurrencyIndex) => currencies.get(toCurrencyIndex)
)

export const conversionRateSelector = createSelector(
  fromCurrencySelector,
  toCurrencySelector,
  ratesSelector,
  (fromCurrency, toCurrency, rates) =>
    fromCurrency === toCurrency
      ? 1
      : rates.getIn([ fromCurrency, toCurrency ])
)

export const fromCurrencyBalanceSelector = createSelector(
  fromCurrencyIndexSelector,
  balanceSelector,
  (fromCurrencyIndex, balance) => {
    console.log(`fromCurrencyBalanceSelector`, fromCurrencyIndex, balance)
    return balance.get(`${fromCurrencyIndex}`, 0)
  }
)

export const toCurrencyBalanceSelector = createSelector(
  toCurrencyIndexSelector,
  balanceSelector,
  (toCurrencyIndex, balance) => balance.get(toCurrencyIndex, 0)
)
