import express from 'express';
import { addToWatchlist, updateWatchlistItem, removeFromWatchlist } from '../controllers/watchlistController.js'
import { authMiddleware } from '../midlleware/authMiddleware.js'
import { validateRequest } from '../midlleware/validatesRequest.js';
import { addToWatchlistSchema } from '../validators/watchlistValidators.js'

const router = express.Router();

router.use(authMiddleware)

router.post("/", validateRequest(addToWatchlistSchema) ,addToWatchlist)

router.put("/:id", updateWatchlistItem)

router.delete("/:id", removeFromWatchlist)
// router.post("/login", login)
// router.post("/logout", logout)

export default router;