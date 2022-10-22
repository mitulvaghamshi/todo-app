import React from 'react'
import ReactDOM from 'react-dom/client'
import App1 from './todo-app-1'
import App2 from './todo-app-2'
import './styles/index.css'

const app1 = ReactDOM.createRoot(document.getElementById('app1'))
const app2 = ReactDOM.createRoot(document.getElementById('app2'))

app1.render(<React.StrictMode><App1 /></React.StrictMode>)
app2.render(<React.StrictMode><App2 /></React.StrictMode>)
