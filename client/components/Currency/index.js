import { isEmptyAmount, isEmptyString } from '../../utils'
import CurrencySelector from '../CurrencySelector'
import React from 'react'
import styles from './styles.css'

const join = (...args) => args.join(` `)

class Currency extends React.Component {
  constructor (props) {
    super(props)
    this.getAdjustedAmount = this.getAdjustedAmount.bind(this)
    this.getSign = this.getSign.bind(this)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
  }

  render () {
    const {
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
                {this.getSign()}
              </span>
              <input
                ref={ref => { this.inputRef = ref }}
                className={join(
                  styles.amount,
                  styles.bigText
                )}
                value={this.getAdjustedAmount()}
                onChange={this.handleInputValueChange}
                readOnly={isShowingConversionResult}
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

  componentDidMount () {
    const { isShowingConversionResult } = this.props
    if (!isShowingConversionResult) {
      this.inputRef.focus()
    }
  }

  handleInputValueChange (e) {
    const {
      setAmountToConvert,
      isShowingConversionResult
    } = this.props

    if (
      !isShowingConversionResult &&
      e.target
    ) {
      const amount = e.target.value
      setAmountToConvert(isEmptyString(amount)
        ? null
        : e.target.value
      )
    }
  }

  getSign () {
    const { amount, isShowingConversionResult } = this.props
    return isEmptyAmount(amount)
      ? ``
      : isShowingConversionResult
        ? `+`
        : `-`
  }

  getAdjustedAmount () {
    const { amount, isShowingConversionResult } = this.props
    return isEmptyAmount(amount)
      ? ``
      : isShowingConversionResult
        ? parseFloat(amount).toFixed(2)
        : amount
  }
}

export default Currency
