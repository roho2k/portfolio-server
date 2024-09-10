import { Router } from 'express';
import supabase from '../services/supabaseClient';

const router = Router();

router.get('/blogs', async (req, res) => {
	const { data, error } = await supabase.from('BlogPosts').select('*');

	return res.send(data);
});

router.get('/blogs/:blogTitle', async (req, res) => {
	const { blogTitle } = req.params;

	const { data, error } = await supabase
		.from('BlogPosts')
		.select('*')
		.ilike('title', blogTitle)
		.single();

	return res.send(data);
});

export default router;
