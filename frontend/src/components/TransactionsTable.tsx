import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TransactionsTableProps {
  month: string;
}

interface Transaction {
  title: string;
  description: string;
  price: number;
  dateOfSale: string;
  sold: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ month }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [month, search, page]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: { month, search, page, perPage },
      });

      const { transactions } = response.data;
      setTransactions(transactions);
    } catch (error) {
      console.error(error);
      setTransactions([]);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Date of Sale</th>
            <th className="border p-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border p-2">{transaction.title}</td>
                <td className="border p-2">{transaction.description}</td>
                <td className="border p-2">{transaction.price}</td>
                <td className="border p-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td className="border p-2">{transaction.sold ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border p-2 text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 grid grid-cols-3 mx-4">
        <div className='flex justify-start mt-2'>
            Page No : {page}
        </div>
        <div className='flex justify-center'>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="mr-2 p-2 border rounded">Previous</button>
        <button onClick={() => setPage((prev) => prev + 1)} className="p-2 border rounded">Next</button>
        </div>
        <div className='flex justify-end mt-2'>
            Per Page : {perPage}
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
