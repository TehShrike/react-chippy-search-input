import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './index.tsx'

const root = createRoot(document.getElementById('target'))

root.render(createElement(Index))
