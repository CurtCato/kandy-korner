import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import KandyKorner from './component/KandyKorner'

import './index.css'

ReactDOM.render(
    <Router>
        <KandyKorner />
    </Router>
    , document.getElementById('root'))