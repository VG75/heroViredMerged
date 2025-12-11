import sequelize from '../config/database.js';
import User from './User.js';
import Application from './Application.js';
import Document from './Document.js';
import Ticket from './Ticket.js';
import Payment from './Payment.js';
import University from './University.js';
import Program from './Program.js';

// Associations
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Application.hasMany(Document, { foreignKey: 'applicationId' });
Document.belongsTo(Application, { foreignKey: 'applicationId' });

User.hasMany(Ticket, { foreignKey: 'userId', as: 'Tickets' });
Ticket.belongsTo(User, { foreignKey: 'userId', as: 'User' });

Application.hasMany(Ticket, { foreignKey: 'applicationId' });
Ticket.belongsTo(Application, { foreignKey: 'applicationId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

Application.hasMany(Payment, { foreignKey: 'applicationId' });
Payment.belongsTo(Application, { foreignKey: 'applicationId' });

Ticket.hasMany(Payment, { foreignKey: 'ticketId' });
Payment.belongsTo(Ticket, { foreignKey: 'ticketId' });

University.hasMany(Program, { foreignKey: 'universityId' });
Program.belongsTo(University, { foreignKey: 'universityId' });

export { sequelize, User, Application, Document, Ticket, Payment, University, Program };
