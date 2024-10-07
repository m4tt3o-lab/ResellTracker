import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Sneaker = sequelize.define('Sneaker', {
    modello: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataAcquisto: {
        type: DataTypes.DATE,
        allowNull: false
    },
    prezzoAcquisto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dataVendita: {
        type: DataTypes.DATE,
        allowNull: true
    },
    prezzoVendita: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'sneakers',
    timestamps: false,
});

// Profitto/perdita
Sneaker.prototype.getProfittoPerdita = function() {
    if (this.prezzoVendita !== null) {
        return this.prezzoVendita - this.prezzoAcquisto;
    }
    return null; // Se non è stata ancora venduta, non c'è profitto/perdita
};

export default Sneaker;
