import express from 'express';
import gptRoute from './gpt';

const router = express.Router();

// Response result of root path
router.all('/', (req, res, next) => {
  return res.result('GPT API: OK');
});

// Add routes to the router
const routes = [
  {
    path: '/gpt',
    route: gptRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
