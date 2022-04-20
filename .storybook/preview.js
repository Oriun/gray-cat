export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Main',
        [
          'Inuts', ['Slider'],
          'Tabs', ['Detached', ['DetachedTab 01', 'DetachedTab 02', 'DetachedTab 03']],
        ]
      ]
    }
  }

}