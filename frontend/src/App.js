import { useEffect, useState, useContext } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { PAYMENT_STEP } from "./services/constants"

// Context
import { LoaderContext } from "./contexts/LoaderContext"

// Components
import NavBar from "./components/NavBar"
import LinearLoader from "./components/LinearLoader"

// Payment Steps
import Details from "./components/paymentSteps/Details"
import Amount from "./components/paymentSteps/Amount"
import Method from "./components/paymentSteps/Method"
import Card from "./components/paymentSteps/Card"
import Confirmation from "./components/paymentSteps/Confirmation"
import Loading from "./components/paymentSteps/Loading"
import Success from "./components/paymentSteps/Success"
import Paid from "./components/paymentSteps/Paid"
import Pending from "./components/paymentSteps/Pending"

function App() {
  // To use the global loader
  const { isLoading, setIsLoading } = useContext(LoaderContext)

  useEffect(() => {
    // API calls would change pageLoading state
    setIsLoading({
      state: true,
      hideApp: true
    })
    setTimeout(() => {
      setIsLoading({ state: false, hideApp: false })
    }, 1070)
  }, [setIsLoading])

  return (
    <div className="app">
      {isLoading.state && <LinearLoader />}
      {isLoading.state ? (
        <>{!isLoading.hideApp && <PageScreens />}</>
      ) : (
        <PageScreens />
      )}
    </div>
  )
}

// Page Screens

function PageScreens() {
  let location = useLocation()
  let navigate = useNavigate()
  const [screen, setScreen] = useState(PAYMENT_STEP.DETAILS)

  useEffect(() => {
    if (location.pathname === "/loading") {
      setScreen(PAYMENT_STEP.LOADING)
    }
  }, [location])
  const setUpLoading = (s) => {
    setScreen(s)
    navigate("/loading")
    setTimeout(() => {
      setScreen(PAYMENT_STEP.SUCCESS)
      navigate("/success")
    }, 900)
  }

  const updateScreen = (value) => {
    let id = "55729910"
    switch (value) {
      case PAYMENT_STEP.DETAILS:
        navigate(`/${id}`)
        break
      case PAYMENT_STEP.AMOUNT:
        navigate("/amount")
        break
      case PAYMENT_STEP.METHOD:
        navigate("/method")
        break
      case PAYMENT_STEP.CARD:
        navigate("/card")
        break
      case PAYMENT_STEP.CONFIRMATION:
        navigate("/confirmation")
        break
      case PAYMENT_STEP.LOADING:
        navigate("/loading")
        break
      case PAYMENT_STEP.SUCCESS:
        navigate("/success")
        break

      default:
        navigate(`/${id}`)
        break
    }
    setScreen(value)
  }
  return (
    <>
      {screen !== PAYMENT_STEP.LOADING && (
        <NavBar handleClick={updateScreen} screen={screen} />
      )}
      <Routes>
        <Route path="/:id" element={<Details handleClick={updateScreen} />} />
        <Route path="/amount" element={<Amount handleClick={updateScreen} />} />
        <Route path="/method" element={<Method handleClick={updateScreen} />} />
        <Route path="/card" element={<Card handleClick={updateScreen} />} />
        <Route
          path="/confirmation"
          element={
            <Confirmation
              name="Ahmed John"
              accountNumber="9023475834"
              bank="GT Bank"
              handleClick={setUpLoading}
            />
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="/success"
          element={<Success handleClick={updateScreen} />}
        />
        <Route path="/pending" element={<Pending />} />
        <Route path="/paid" element={<Paid />} />
        <Route
          path="*"
          element={
            <main style={{ paddingTop: "5rem" }}>
              <p className="text-center">No ID provided</p>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App
