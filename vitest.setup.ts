import '@testing-library/jest-dom/vitest'
import failOnConsole from 'vitest-fail-on-console'
import { vi } from 'vitest'

failOnConsole()

beforeEach(() => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
})

afterEach(() => {
  const modalRoot = document.getElementById('modal-root')
  if (modalRoot) {
    document.body.removeChild(modalRoot)
  }
})

/* eslint-disable no-var */
declare global {
  var jest: typeof vi
}
/* eslint-enable no-var */
// https://github.com/testing-library/react-testing-library/issues/1197
global.jest = vi
