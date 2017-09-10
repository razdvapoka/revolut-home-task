import { isEmptyAmount, trimToPrecision } from '../../utils'
import CurrencySelector from '../CurrencySelector'
import React from 'react'
import styles from './styles.css'

const join = (...args) => args.join(` `)

class Currency extends React.Component {
  constructor (props) {
    super(props)
    this.getSignSymbol = this.getSignSymbol.bind(this)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
  }

  render () {
    const {
      amount,
      balance,
      currencies,
      fromName,
      index,
      isShowingConversionResult,
      name,
      rate,
      selectCurrency
    } = this.props

    return (
      <div className={styles.currency}>
        <div className={styles.content}>
          <div className={styles.column}>
            <span className={styles.bigText}>
              {name}
            </span>
            <span className={join(styles.balance, styles.subText)}>
              {`you have ${Math.floor(parseFloat(balance))} ${name}`}
            </span>
          </div>
          <div className={styles.column}>
            <div className={styles.amountWrapper}>
              <span className={join(styles.sign, styles.bigText)}>
                {this.getSignSymbol()}
              </span>
              <input
                ref={ref => { this.inputRef = ref }}
                className={join(
                  styles.amount,
                  styles.bigText
                )}
                value={amount}
                onChange={this.handleInputValueChange}
              />
            </div>
            {isShowingConversionResult && (
              <span className={join(styles.rate, styles.subText)}>
                {`1 ${name} = ${parseFloat(rate).toFixed(2)} ${fromName}`}
              </span>
            )}
          </div>
        </div>
        <CurrencySelector
          currencies={currencies}
          selectedIndex={index}
          selectCurrency={selectCurrency}
        />
      </div>
    )
  }

  handleInputValueChange (e) {
    const { onChange } = this.props
    if (e.target) {
      const amount = trimToPrecision(e.target.value, 2)
      onChange(amount)
    }
  }

  getSignSymbol () {
    const { amount, isShowingConversionResult } = this.props
    return isEmptyAmount(amount)
      ? ``
      : isShowingConversionResult
        ? `+`
        : `-`
  }
}

export default Currency
