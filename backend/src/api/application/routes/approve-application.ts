

module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/applications/:id/approve',
      handler: 'application.approve'
    }
  ]
}
