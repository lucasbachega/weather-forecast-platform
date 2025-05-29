import { Router } from 'express';
import authRoutes from './auth.routes';
// import weatherRoutes from './weather.routes';
// import historyRoutes from './history.routes';

const router = Router();

// prefixos de cada grupo de rotas
router.use('/auth', authRoutes);
// router.use('/weather', weatherRoutes);
// router.use('/history', historyRoutes);

export default router;
