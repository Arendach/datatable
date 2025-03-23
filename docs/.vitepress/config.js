export default {
  title: 'AresDataTable',
  description: 'Documentation npm package ares-datatable',
  base: '/datatable/',
  themeConfig: {
    nav: [],
    sidebar: [
      {text: 'Introduction', link: '/'},
      {text: 'Installation', link: '/installation'},
      {text: 'Features', link: '/features'},
      {
        text: 'Basic', items: [
          {text: 'Columns', link: '/base/columns'},
          {text: 'Pagination', link: '/base/pagination'},
          {text: 'Filtering', link: '/base/filtering'},
        ]
      },
      {
        text: 'Server mode',
        items: [
          {text: 'Usage server mode', link: '/server-mode/index'},
          {text: 'Laravel integration', link: '/server-mode/laravel-integration'},
          {text: 'Custom fetch data', link: '/server-mode/custom-fetch-data'},
        ]
      },
      {
        text: 'Additional',
        items: [
          {text: 'Usage slots', link: '/additional/slots'},
          {text: 'Expanded rows', link: '/additional/expanded'},
        ]
      },
    ],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/Arendach/datatable'}
    ]
  },
}
