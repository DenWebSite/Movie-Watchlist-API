import { z } from 'zod';

const addToWatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status: z.enum([
        "PLANNED",
        "WATCHING",
        "COMPLETED",
        "DROPPED"
    ], {
        error: () => {
            message: "Status must be one of enum"
        }
    }).optional(),
    rating: z.coerce.number().int("must be int").min(1).max(10),
    notes: z.string().optional()
})

export { addToWatchlistSchema }