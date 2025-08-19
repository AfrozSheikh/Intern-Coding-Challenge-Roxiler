import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import config from '../config/config.js';
import { ROLES } from '../models/User.js';

const run = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });

    const adminEmail = config.seedAdmin.email;
    let admin = await db.User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      admin = await db.User.create({
        name: config.seedAdmin.name,
        email: adminEmail,
        address: config.seedAdmin.address,
        passwordHash: await bcrypt.hash(config.seedAdmin.password, 10),
        role: ROLES.ADMIN
      });
      console.log('Admin created:', adminEmail);
    } else {
      console.log('Admin exists:', adminEmail);
    }

    const ownerEmail = 'owner1@retailhub.com';
    let owner = await db.User.findOne({ where: { email: ownerEmail } });
    if (!owner) {
      owner = await db.User.create({
        name: 'Ravi Sharma',
        email: ownerEmail,
        address: '45 Park Street, Mumbai',
        passwordHash: await bcrypt.hash('Owner@123', 10),
        role: ROLES.OWNER
      });
    }

    let store = await db.Store.findOne({ where: { owner_id: owner.id } });
    if (!store) {
      store = await db.Store.create({
        name: 'Sharma Electronics',
        email: 'contact@sharmaelectronics.com',
        address: '12 MG Road, Mumbai',
        owner_id: owner.id
      });
    }

    const userEmail = 'customer1@gmail.com';
    let user = await db.User.findOne({ where: { email: userEmail } });
    if (!user) {
      user = await db.User.create({
        name: 'Anita Verma',
        email: userEmail,
        address: '27 Green Colony, Pune',
        passwordHash: await bcrypt.hash('User@1234', 10),
        role: ROLES.USER
      });
    }

    const existingRating = await db.Rating.findOne({ where: { user_id: user.id, store_id: store.id } });
    if (!existingRating) {
      await db.Rating.create({ user_id: user.id, store_id: store.id, value: 5 });
    }

    console.log('Seeding done.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};


run();
