import bcrypt from 'bcrypt';
import pool from './db/db.js';

export const userRegister = async () => {
    try {
        const [existingUser] = await pool.execute(
            `SELECT * FROM users WHERE email = ?`, ['admin@gmail.com']
        );

        if (existingUser.length > 0) {
            console.log('Admin user already exists');
            return;
        }

        const hashPassword = await bcrypt.hash('admin', 10);
        const [rows] = await pool.execute(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            ['Admin', 'admin@gmail.com', hashPassword, 'admin']
        );
        console.log('Admin user created successfully:', rows);
    } catch (error) {
        console.log('Error seeding admin user:', error);
    }
};

// userRegister();
