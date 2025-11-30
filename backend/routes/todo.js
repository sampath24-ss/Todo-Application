const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all todos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM todos ORDER BY created_at DESC'
        );
        res.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching todos',
            error: error.message,
        });
    }
});

// Get single todo by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching todo',
            error: error.message,
        });
    }
});

// Create new todo
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });
    }

    try {
        const result = await pool.query(
            'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
            [title, description || '']
        );

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating todo',
            error: error.message,
        });
    }
});

// Update todo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const result = await pool.query(
            `UPDATE todos 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           completed = COALESCE($3, completed),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
            [title, description, completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.json({
            success: true,
            message: 'Todo updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating todo',
            error: error.message,
        });
    }
});

// Delete todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.json({
            success: true,
            message: 'Todo deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting todo',
            error: error.message,
        });
    }
});

// Toggle todo completion status
router.patch('/:id/toggle', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
        `UPDATE todos 
        SET completed = NOT completed,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.json({
            success: true,
            message: 'Todo status toggled successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error toggling todo:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling todo',
            error: error.message,
        });
    }
});

module.exports = router;