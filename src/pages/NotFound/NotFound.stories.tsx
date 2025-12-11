import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

const meta: Meta<typeof NotFound> = {
  title: 'Pages/NotFound',
  component: NotFound,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Página de error 404 que se muestra cuando el usuario intenta acceder a una ruta inexistente.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NotFound>

export const Default: Story = {
  name: 'Error 404',
}
