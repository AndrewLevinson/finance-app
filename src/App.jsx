import { useState, useEffect } from 'react';
import { csv, csvParse, csvParseRows } from 'd3';
import checking from './files/checking.csv';
import savings_1 from './files/savings_1.csv';

const d3 = { csv, csvParse, csvParseRows };
const filePaths = [checking, savings_1];
const accountNames = {
  '/src/files/checking.csv': 'Checking',
  '/src/files/savings_1.csv': 'Savings 1',
};

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const categories = ['cc payment', 'rent', 'utilities', 'venmo', 'transfer', 'expense', 'wsj income', 'other income'];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises = filePaths.map(async path => {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
          }
          const res = await response.text();
          return d3.csvParse(res, (d, i) => {
            return {
              date: d['Posting Date'],
              description: d['Description'].trim(),
              amount: parseFloat(d['Amount']),
              type: d['Type'],
              balance: +d['Balance'],
              account: accountNames[path],
              uniqueId: `${accountNames[path]}-${i}`,
              category: categories[Math.floor(Math.random() * categories.length)], // random for now...will need to manually choose and save
            };
          });
        });

        const loadedFiles = await Promise.all(promises);
        setData(
          [...loadedFiles[0], ...loadedFiles[1]]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((x, i) => {
              return { ...x, id: i };
            })
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  const latestTransactions = data
    // .filter((x, i) => i < 20)
    .map(item => {
      const isNegative = item.amount < 0;
      return (
        <tr key={item.uniqueId} className='[&>td]:p-1.5 [&>td]:px-2'>
          <td>{item.id}</td>
          <td>{item.date}</td>
          <td>{item.account}</td>
          <td>{item.description}</td>
          <td>{item.category}</td>
          <td className={`text-right tabular-nums ${isNegative ? 'text-red-700' : 'text-green-700'}`}>
            {USDollar.format(item.amount)}
          </td>
        </tr>
      );
    });

  return (
    <div className='my-10 mx-auto w-fit'>
      <h2 className='text-2xl font-bold mb-3'>Latest transactions</h2>
      <table>
        <thead>
          <tr className='sticky top-0 [&>th]:p-2 bg-white border-b-2'>
            <th>id</th>
            <th>Date</th>
            <th>Account</th>
            <th>Description</th>
            <th>Category</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>{latestTransactions}</tbody>
      </table>
    </div>
  );
}

export default App;
