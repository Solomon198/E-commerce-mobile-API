import app from './index';
import Configs from './core/enivronment.config';

const PORT = process.env.NODE_ENV === 'test' ? 0 : Configs().PORT;

app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
