const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbPool = require('../config/database');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Mencari user berdasarkan username
        const [rows] = await dbPool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const user = rows[0];

        // Membandingkan password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Membuat token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const [result] = await dbPool.execute(sql, [username, hashedPassword]);

        const user = { id: result.insertId, username };

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

module.exports = {
    login,
    register
};
