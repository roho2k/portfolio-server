import { Router } from 'express';
import supabase from '../services/supabaseClient';

const router = Router();

router.get('/blogs', async (req, res) => {
	const { data, error } = await supabase.from('BlogPosts').select('*');
	console.log(data);
	return res.send(data);
});

export default router;
