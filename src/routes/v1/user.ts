import express from 'express';
import * as authController from '../../controllers/auth';
const router = express.Router();

/*** User Authentication / Login ***/
router.route('/login').post(authController.login);

/*** Check user login status ***/
router.route('/check').all(authController.authenticateToken, (req, res, next) => {
  return res.result('Logged in.');
});

/*** Manually Refresh Access Token ***/
router.route('/refresh').post(authController.reload);

export default router;
