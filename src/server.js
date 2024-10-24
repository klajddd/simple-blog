const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Get all posts
app.get('/api/posts', async (req, res) => {
    const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Create a new post
app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    const { data, error } = await supabase
    .from('posts')
    .insert({ title, content })
    .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
