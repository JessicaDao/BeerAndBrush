module.exports = function(sequelize, DataTypes){
    var Review = sequelize.define('Review', {
    class:{
        type:DataTypes.STRING,
        allowNull:false
    },
    reviewer:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.DATE,
        allowNull:false
    }
});
    Review.associate = function(models){
        Review.belongsTo(models.User);

    };
    return Review;
}

