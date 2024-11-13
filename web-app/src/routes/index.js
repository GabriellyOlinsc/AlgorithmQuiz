import { Fragment } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const RoutesApp = () => {
    return (
        <BrowserRouter>
        <Fragment>
            <Routes>
                <Route path="/"></Route>
            </Routes>
        </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp