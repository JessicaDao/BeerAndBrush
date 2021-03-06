module.exports = function(sequelize, DataTypes){
    var Class = sequelize.define('Class', {
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
        location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    recurring:{
        type:DataTypes.BOOLEAN,
        default: false
    }
    // price:{
    //     type:DataTypes.DECIMAL,
    //     allowNull:false
    // },
    // reviews:{
    //     type:DataTypes.TEXT,
    //     allowNull:false
    // } [-> review-model, but should we do a count for # of reviews? & star rating?]
    }
);
    Class.associate = function(models){
        Class.belongsTo(models.User);
        Class.belongsToMany(models.Student, { through: "StudentClasses" });
    };
    return Class;
}

