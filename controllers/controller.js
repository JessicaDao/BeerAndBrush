module.exports = app => {
    app.use('api/user', require('./userController'))
    app.use('api/project', require('./project-controller'))
}