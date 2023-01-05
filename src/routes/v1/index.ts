import express from 'express';
import userRoute from './user';

const router = express.Router();

// Response result of root path
router.all('/', (req, res, next) => {
  return res.result('Status: OK');
});

// Add routes to the router
const routes = [
  {
    path: '/user',
    route: userRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
