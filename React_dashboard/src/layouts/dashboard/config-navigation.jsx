import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Revenue',
    path: '/revenue',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Users',
    path: '/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Types',
    path: '/types',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
