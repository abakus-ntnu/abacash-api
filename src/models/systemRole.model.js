export default function(sequelize, DataTypes) {
    const SystemRole = sequelize.define('systemRole', {
        systemId: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex'
        },
        userId: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex'
        },
        role: DataTypes.STRING
    });

    return SystemRole;
}
