module.exports = function(sequelize,  DataTypes) {

    const User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.TEXT
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('active', 'incactive'),
            defaultValue: 'active'
        }
    });
 
    return User;
}




