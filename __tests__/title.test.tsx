import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Title from '../components/display/Title'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Title />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})