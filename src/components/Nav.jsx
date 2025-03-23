import { NavLink } from 'react-router';

export default function MyAppNav() {
  const routes = [
    { route: '/', name: 'Home' },
    { route: '/transactions', name: 'Transactions' },
    { route: '/visualizations', name: 'Dashboard' },
  ];

  return (
    <nav className='flex gap-2'>
      {routes.map(route => {
        return (
          <NavLink
            key={route.route}
            to={route.route}
            end
            className={({ isActive }) => (isActive ? 'text-red-500' : 'text-black')}
          >
            {route.name}
          </NavLink>
        );
      })}
    </nav>
  );
}
