import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { Decorator } from '@storybook/react'
import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const withMuiTheme: Decorator = (Story) => {
  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(CssBaseline),
    React.createElement(Story)
  )
}

const preview: Preview = {
  decorators: [withMuiTheme],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    initialGlobals: {
    viewport: { value: 'desktop', isRotated: false },
  },
  },
};

export default preview;
