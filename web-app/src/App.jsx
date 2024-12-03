import { ThemeProvider } from "@emotion/react"
import RoutesApp from "./routes"
import theme from "./theme"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RoutesApp />
      </ThemeProvider>
    </>
  )
}

export default App