import CurrencySelectorItem from '../CurrencySelectorItem'
import React from 'react'
import styles from './styles.css'

export default ({
  currencies,
  selectCurrency,
  selectedIndex
}) => (
  <div className={styles.currencySelector}>
    {currencies.map((_, itemIndex) => (
      <CurrencySelectorItem
        key={itemIndex}
        index={itemIndex}
        isSelected={itemIndex === selectedIndex}
        selectCurrency={selectCurrency}
      />
    ))}
  </div>
)
