import express from 'express';
import * as gptController from '../../controllers/gpt';
const router = express.Router();

/*** Chat Completions ***/
router.route('/chat').post(gptController.prompt);

export default router;