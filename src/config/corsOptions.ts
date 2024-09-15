import { NodeEnvironment } from '../utils/enums';

const origin =
	process.env.NODE_ENV === NodeEnvironment.Development
		? 'http://localhost:5173'
		: 'https://www.rodneyho.com';

const corsOptions = {
	origin,
};

export default corsOptions;
