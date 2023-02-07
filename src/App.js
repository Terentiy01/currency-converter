import React, { useEffect, useState } from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [rates, setRates] = useState({})

  useEffect(() => {
    var requestOptions = {
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
  }, [rates])

  console.log(rates)

  return (
    <div className="App">
      <Block
        value={0}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
      />
      <Block value={0} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  )
}

export default App

// jKzbk07S4YZ1Rm3i5YQ1evWGmim7ggqV
