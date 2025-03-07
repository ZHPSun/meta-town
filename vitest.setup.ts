import '@testing-library/jest-dom/vitest'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole()

const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal-root')
document.body.appendChild(modalRoot)
