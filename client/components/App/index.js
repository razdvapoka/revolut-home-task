import React from 'react'
import styles from './styles.css'

export default ({ children }) => (
  <div className={styles.app}>
    {children}
  </div>
)
