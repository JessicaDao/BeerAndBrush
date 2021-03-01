module.exports = function(sequelize, DataTypes){
    var Events = sequelize.define('Events', {
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    level:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    duration:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    recurring:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    reviews:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});
    Events.associate = function(models){
        Events.belongsTo(models.User);

    };
    return Events;
}

