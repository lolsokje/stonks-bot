import {DataTypes, Model} from "sequelize";
import database from "../utils/database";

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    discord_id: {
        type: DataTypes.STRING,
        unique: true,
    }
}, {sequelize: database, modelName: 'user'});

export default User;
