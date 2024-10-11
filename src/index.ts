import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './Index'

const root = createRoot(document.getElementById('target'))

root.render(createElement(Index))
