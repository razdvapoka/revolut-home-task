import * as converterActions from '../../reducers/converter/actions'
import React from 'react'
import styles from './styles.css'
import Currency from '../Currency'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  amountToConvertSelector,
  conversionRateSelector,
  currenciesSelector,
  fromCurrencyBalanceSelector,
  fromCurrencyIndexSelector,
  fromCurrencySelector,
  toCurrencyBalanceSelector,
  toCurrencyIndexSelector,
  toCurrencySelector
} from '../../selectors'
import { isEmptyAmount, trimToPrecision } from '../../utils'

class Converter extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const {
      amountToConvert,
      currencies,
      fromBalance,
      fromCurrency,
      fromCurrencyIndex,
      rate,
      setAmountToConvert,
      setResultingAmount,
      setFromCurrencyIndex,
      setToCurrencyIndex,
      toBalance,
      toCurrency,
      toCurrencyIndex
    } = this.props

    return (
      <form
        className={styles.converter}
        onSubmit={this.handleSubmit}
      >
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
          amount={trimToPrecision(amountToConvert, 2)}
          balance={fromBalance}
          currencies={currencies}
          index={fromCurrencyIndex}
          name={fromCurrency}
          onChange={setAmountToConvert}
          selectCurrency={setFromCurrencyIndex}
        />
        <Currency
          amount={
            isEmptyAmount(amountToConvert)
              ? ``
              : trimToPrecision(`${amountToConvert * rate}`, 2)
          }
          balance={toBalance}
          currencies={currencies}
          fromName={fromCurrency}
          index={toCurrencyIndex}
          isShowingConversionResult
          name={toCurrency}
          rate={1 / rate}
          selectCurrency={setToCurrencyIndex}
          onChange={setResultingAmount}
        />
      </form>
    )
  }

  handleSubmit (e) {
    const { convert } = this.props
    e.preventDefault()
    convert()
  }
}

const mapStateToProps = state => ({
  amountToConvert: amountToConvertSelector(state),
  currencies: currenciesSelector(state),
  fromBalance: fromCurrencyBalanceSelector(state),
  fromCurrency: fromCurrencySelector(state),
  fromCurrencyIndex: fromCurrencyIndexSelector(state),
  rate: conversionRateSelector(state),
  toBalance: toCurrencyBalanceSelector(state),
  toCurrency: toCurrencySelector(state),
  toCurrencyIndex: toCurrencyIndexSelector(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(converterActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter)
