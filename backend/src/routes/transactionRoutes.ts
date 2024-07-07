// backend/src/routes/transactionRoutes.ts
import { Router } from 'express';
import { initializeDatabase, listTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData } from '../controllers/transactionController';

const router = Router();

router.get('/init', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
router.get('/combined-data', getCombinedData);

export default router;
