import { NavLink } from 'react-router';
import { useTransactionsStore } from '../store';
export default function MyAppNav() {
  const routes = [
    { route: '/', name: 'Home' },
    { route: '/transactions', name: 'Transactions' },
    { route: '/visualizations', name: 'Dashboard' },
  ];

  const transactions = useTransactionsStore(state => state.transactions);

  return (
    <nav className='flex gap-3 w-fit relative pb-1 mb-2 border-b-2'>
      {routes.map(route => {
        return (
          <NavLink
            key={route.route}
            to={route.route}
            end
            className={({ isActive }) => (isActive ? 'text-red-500 relative' : 'text-black relative')}
          >
            {route.route == '/transactions' && (
              <div className='text-center text-slate-500 text-sm absolute -top-1/2 left-1/2 -translate-1/2 w-20 tabular-nums'>
                {transactions?.length || 0} saved
              </div>
            )}
            {route.name}
          </NavLink>
        );
      })}
    </nav>
  );
}
