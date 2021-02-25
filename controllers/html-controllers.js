const landingPage = require('./views/landingPage-controller.js')
const events = require('./views/events-controller.js')
const gallery = require('./views/gallery-controller.js')
const home = require('./views/home-controller.js')
const siteInfo = require('./views/siteInfo-controller.js')
const studentPage = require('./views/studentPage-controller.js')

module.exports = app => {
    app.use('', landingPage)
    app.use('', events)
    app.use('', gallery)
    app.use('', home)
    app.use('', siteInfo)
    app.use('', studentPage)
}