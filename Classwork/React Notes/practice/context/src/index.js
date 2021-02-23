import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import ThemeContext from "./themeContext"

ReactDOM.render(
    <ThemeContext.Provider>
        <App />
    </ThemeContext.Provider>, 
    document.getElementById("root")
)
