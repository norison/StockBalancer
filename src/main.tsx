/* v8 ignore next 10 */
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
