const html_controllers = require('./html-controllers')

module.exports = app => {
    // app.use('', require('./views/landingPage-controller'))
    html_controllers(app)
    // api_controllers(app)
}