import { createSelector } from 'reselect'

const currenciesSelector = state =>
  state.converter.get(`currencies`)

const fromCurrencyIndexSelector = state =>
  state.converter.get(`fromCurrencyIndex`)

const toCurrencyIndexSelector = state =>
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

export const balanceCurrencySelector = createSelector(
  currenciesSelector,
  balanceSelector,
  (currencies, balance) => currencies.get(balance.get(`currencyIndex`))
)

export const rateSelector = createSelector(
  fromCurrencySelector,
  toCurrencySelector,
  ratesSelector,
  (fromCurrency, toCurrency, rates) => rates.getIn([ fromCurrency, toCurrency ])
)

const balanceToFromRateSelector = createSelector(
  fromCurrencySelector,
  balanceCurrencySelector,
  ratesSelector,
  (fromCurrency, balanceCurrency, rates) =>
    balanceCurrency === fromCurrency
      ? 1
      : rates.getIn([ balanceCurrency, fromCurrency ])
)

const balanceToToRateSelector = createSelector(
  toCurrencySelector,
  balanceCurrencySelector,
  ratesSelector,
  (toCurrency, balanceCurrency, rates) =>
    balanceCurrency === toCurrency
      ? 1
      : rates.getIn([ balanceCurrency, toCurrency ])
)

export const convertedBalanceSelector = createSelector(
  balanceToFromRateSelector,
  balanceToToRateSelector,
  balanceSelector,
  (fromRate, toRate, balance) => {
    const balanceAmount = balance.get(`amount`)
    return ({
      fromBalance: balanceAmount * fromRate,
      toBalance: balanceAmount * toRate
    })
  }
)
