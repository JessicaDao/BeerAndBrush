module.exports = app => {
    app.use('api/user', require('./user-controller'))
    app.use('api/project', require('./project-controller'))
}