import { ROLE_TYPES } from './../components/constants';
import _ from 'lodash';

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
        role: {
            type: DataTypes.ENUM,
            values: _.values(ROLE_TYPES),
            defaultValue: ROLE_TYPES.USER
        }
    });

    return SystemRole;
}
