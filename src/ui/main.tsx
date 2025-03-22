/* v8 ignore next 16 */
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "inversify-react"
import App from './App.tsx'

import container from "./container/container.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider container={container}>
      <App/>
    </Provider>
  </StrictMode>,
)
