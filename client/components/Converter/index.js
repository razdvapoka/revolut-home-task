import * as converterActions from '../../reducers/converter/actions'
import React from 'react'
import styles from './styles.css'
import Currency from '../Currency'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  amountToConvertSelector,
  convertedBalanceSelector,
  currenciesSelector,
  fromCurrencySelector,
  fromCurrencyIndexSelector,
  rateSelector,
  toCurrencySelector,
  toCurrencyIndexSelector
} from '../../selectors'
import { isEmptyAmount } from '../../utils'

const Converter = ({
  amountToConvert,
  currencies,
  fromBalance,
  fromCurrency,
  fromCurrencyIndex,
  rate,
  setAmountToConvert,
  setFromCurrencyIndex,
  setToCurrencyIndex,
  toBalance,
  toCurrency,
  toCurrencyIndex
}) => (
  <form className={styles.converter}>
    <div className={styles.header}>
      <button className={styles.buttonDisabled} disabled>
        Cancel
      </button>
      <div className={styles.rate}>
        {`1 ${fromCurrency} = ${rate} ${toCurrency}`}
      </div>
      <button
        className={styles.button}
      >
        Exchange
      </button>
    </div>
    <Currency
      amount={amountToConvert}
      balance={fromBalance}
      currencies={currencies}
      index={fromCurrencyIndex}
      name={fromCurrency}
      setAmountToConvert={setAmountToConvert}
      selectCurrency={setFromCurrencyIndex}
    />
    <Currency
      amount={isEmptyAmount(amountToConvert) ? null : amountToConvert * rate}
      balance={toBalance}
      currencies={currencies}
      fromName={fromCurrency}
      index={toCurrencyIndex}
      isShowingConversionResult
      name={toCurrency}
      rate={1 / rate}
      selectCurrency={setToCurrencyIndex}
    />
  </form>
)

const mapStateToProps = state => ({
  amountToConvert: amountToConvertSelector(state),
  currencies: currenciesSelector(state),
  fromBalance: convertedBalanceSelector(state).fromBalance,
  fromCurrency: fromCurrencySelector(state),
  fromCurrencyIndex: fromCurrencyIndexSelector(state),
  rate: rateSelector(state),
  toBalance: convertedBalanceSelector(state).toBalance,
  toCurrency: toCurrencySelector(state),
  toCurrencyIndex: toCurrencyIndexSelector(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(converterActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter)
