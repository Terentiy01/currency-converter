import React, { useEffect, useRef, useState } from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const ratesRef = useRef({})

  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_CURRENCY_API,
        'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
      },
    }

    fetch(
      'https://currency-converter5.p.rapidapi.com/currency/convert',
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        ratesRef.current = json.rates
        onChangeToPrice(1)
      })
      .catch((err) => console.error(err))
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]?.rate
    const result = price * ratesRef.current[toCurrency]?.rate
    setToPrice(result.toFixed(1))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency]?.rate /
        ratesRef.current[toCurrency]?.rate) *
      value
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])
  useEffect(() => {
    onChangeFromPrice(toPrice)
  }, [toCurrency])

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
