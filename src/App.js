import React, { useEffect, useState } from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const [rates, setRates] = useState({})

  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: { apikey: 'jKzbk07S4YZ1Rm3i5YQ1evWGmim7ggqV' },
    }

    fetch(
      'https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=USD&amount=10',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setRates(result))
      .catch((error) => console.warn(error))
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setToPrice(result)
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setFromPrice(result)
    setToPrice(value)
  }

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )
}

export default App

// jKzbk07S4YZ1Rm3i5YQ1evWGmim7ggqV
