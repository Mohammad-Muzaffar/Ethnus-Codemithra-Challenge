import { Request, Response } from 'express';
import axios from 'axios';
import Transaction from '../db/Transaction';

export const initializeDatabase = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(data);

    res.status(200).send('Database initialized with seed data');
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  const { page = 1, perPage = 10, search = '' } = req.query;

  const searchRegex = new RegExp(search as string, 'i');
  const filters = {
    $or: [
      { title: searchRegex },
      { description: searchRegex },
      { price: parseFloat(search as string) || 0 }
    ]
  };

  try {
    const transactions = await Transaction.find(filters)
      .skip((+page - 1) * +perPage)
      .limit(+perPage);
    
    const count = await Transaction.countDocuments(filters);

    res.status(200).json({ transactions, count });
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  const { month } = req.query;

  const monthIndex = new Date(`${month} 1, 2020`).getMonth();

  try {
    const transactions = await Transaction.find();

    const filteredTransactions = transactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).getMonth();
      return transactionMonth === monthIndex;
    });

    const totalSalesAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = filteredTransactions.length - totalSoldItems;

    res.status(200).json({
      totalSalesAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
};

export const getBarChartData = async (req: Request, res: Response) => {
    const { month } = req.query;
  
    const monthIndex = new Date(`${month} 1, 2020`).getMonth();
  
    try {
      const transactions = await Transaction.find();
  
      const filteredTransactions = transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.dateOfSale).getMonth();
        return transactionMonth === monthIndex;
      });
  
      const priceRanges = [
        { range: '0-100', min: 0, max: 100, count: 0 },
        { range: '101-200', min: 101, max: 200, count: 0 },
        { range: '201-300', min: 201, max: 300, count: 0 },
        { range: '301-400', min: 301, max: 400, count: 0 },
        { range: '401-500', min: 401, max: 500, count: 0 },
        { range: '501-600', min: 501, max: 600, count: 0 },
        { range: '601-700', min: 601, max: 700, count: 0 },
        { range: '701-800', min: 701, max: 800, count: 0 },
        { range: '801-900', min: 801, max: 900, count: 0 },
        { range: '901-above', min: 901, max: Infinity, count: 0 },
      ];
  
      filteredTransactions.forEach(transaction => {
        const price = transaction.price;
        const range = priceRanges.find(r => price >= r.min && price <= r.max);
        if (range) range.count++;
      });
  
      res.status(200).json(priceRanges);
    } catch (error) {
      res.status(500).send('Error fetching bar chart data');
    }
  };

export const getPieChartData = async (req: Request, res: Response) => {
    const { month } = req.query;
  
    const monthIndex = new Date(`${month} 1, 2020`).getMonth();
  
    try {
      const transactions = await Transaction.find();
  
      const filteredTransactions = transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.dateOfSale).getMonth();
        return transactionMonth === monthIndex;
      });
  
      const categoryCounts: { [key: string]: number } = {};
  
      filteredTransactions.forEach(transaction => {
        const category = transaction.category;
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      });
  
      const result = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count
      }));
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Error fetching pie chart data');
    }
  };

export const getCombinedData = async (req: Request, res: Response) => {
    const { month } = req.query;
  
    try {
      const statistics = await getStatistics(req, res);
      const barChartData = await getBarChartData(req, res);
      const pieChartData = await getPieChartData(req, res);
  
      res.status(200).json({
        statistics: statistics,
        barChartData: barChartData,
        pieChartData: pieChartData
      });
    } catch (error) {
      res.status(500).send('Error fetching combined data');
    }
  };  