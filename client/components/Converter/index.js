import * as converterActions from '../../reducers/converter/actions'
import React from 'react'
import styles from './styles.css'
import Currency from '../Currency'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  amountToConvertSelector,
  fromCurrencySelector,
  toCurrencySelector,
  rateSelector,
  convertedBalanceSelector
} from '../../selectors'
import { isEmptyAmount } from '../../utils'

const Converter = ({
  fromCurrency,
  toCurrency,
  rate,
  amountToConvert,
  setAmountToConvert,
  fromBalance,
  toBalance
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
      name={fromCurrency}
      amount={amountToConvert}
      setAmountToConvert={setAmountToConvert}
      balance={fromBalance}
    />
    <Currency
      name={toCurrency}
      fromName={fromCurrency}
      amount={isEmptyAmount(amountToConvert) ? null : amountToConvert * rate}
      rate={1 / rate}
      isShowingConversionResult
      balance={toBalance}
    />
  </form>
)

const mapStateToProps = state => ({
  fromCurrency: fromCurrencySelector(state),
  toCurrency: toCurrencySelector(state),
  rate: rateSelector(state),
  amountToConvert: amountToConvertSelector(state),
  fromBalance: convertedBalanceSelector(state).fromBalance,
  toBalance: convertedBalanceSelector(state).toBalance
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(converterActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter)
