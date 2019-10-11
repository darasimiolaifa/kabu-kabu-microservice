import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.status(403).json({ status: 403, message: 'You cannot query this route'}));

app.listen(PORT, () => console.log(`Auth service lisening at port ${PORT}`));

export default app;
