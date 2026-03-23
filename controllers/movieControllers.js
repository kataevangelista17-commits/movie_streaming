// controllers/movieController.js
const connection = require('../config/db.js');

//  Get all streaming records
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM movie_streaming', (err, rows) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
};

// Get record by ID
exports.getUserById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM movie_streaming WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    });
};

// Search by genre
exports.getUserByGender = (req, res) => {
    const genre = req.params.genre;
    connection.query('SELECT * FROM movie_streaming WHERE genre = ?', [genre], (err, rows) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ message: 'No records found for this genre' });
        }
    });
};

// Create new record
exports.createUser = (req, res) => {
    const { user_name, movie_title, genre, subscription_type, device_used, rating } = req.body;

    if (!user_name || !movie_title) {
        return res.status(400).json({ message: 'user_name and movie_title are required' });
    }

    const sql = `INSERT INTO movie_streaming 
                 (user_name, movie_title, genre, subscription_type, device_used, rating) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [user_name, movie_title, genre, subscription_type, device_used, rating], 
        (err, result) => {
            if (err) {
                console.error('Insert error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ 
                message: 'Record created successfully', 
                userId: result.insertId 
            });
        }
    );
};

//  Update record by ID
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { user_name, movie_title, genre, subscription_type, device_used, rating } = req.body;

    const sql = `UPDATE movie_streaming 
                 SET user_name=?, movie_title=?, genre=?, subscription_type=?, device_used=?, rating=? 
                 WHERE id = ?`;

    connection.query(sql, [user_name, movie_title, genre, subscription_type, device_used, rating, id], 
        (err, result) => {
            if (err) {
                console.error('Update error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (result.affectedRows > 0) {
                res.json({ message: 'Record updated successfully' });
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        }
    );
};

// ️ Delete record by ID
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM movie_streaming WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Delete error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows > 0) {
            res.json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    });
};