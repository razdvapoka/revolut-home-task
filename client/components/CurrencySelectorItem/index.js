import React from 'react'
import styles from './styles.css'

class CurrencySelectorItem extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    const { isSelected } = this.props
    return (
      <div
        className={
          isSelected
            ? styles.currencySelectorItemSelected
            : styles.currencySelectorItem
        }
        onClick={this.handleClick}
      />
    )
  }

  handleClick () {
    const { index, isSelected, selectCurrency } = this.props
    if (!isSelected) {
      selectCurrency(index)
    }
  }
}

export default CurrencySelectorItem
