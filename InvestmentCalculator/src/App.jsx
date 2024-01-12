import Header from "./components/Header"
import UserInput from "./components/UserInput";
import Result from "./components/Result";
import { calculateInvestmentResults } from "./util/investment"
import { useState } from 'react'

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 100,
    annualInvestment: 12,
    expectedReturn: 3.5,
    duration: 10
  })

  function handleChange(inputId, newValue) {
    setUserInput(userInput => ({
      ...userInput,
      [inputId]: +newValue
    }))
  }

  let result = calculateInvestmentResults(userInput);

  const inputIsValid = userInput.duration >= 1

  return (
    <>
      <Header />
      <UserInput userInput={userInput} handleChange={handleChange} />
      {!inputIsValid && <p className="center">Please Enter Duration higher than 0</p>}
      {inputIsValid && <Result result={result} />}
    </>
  )
}

export default App;
