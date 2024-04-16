import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const BASE_URL = 'http://localhost:3001'



export const transactions = [
  { type: 'Подарунки', icon: <EmojiEventsIcon /> },
  { type: 'Продукти', icon: <LocalGroceryStoreIcon /> },
  { type: 'Швидка їжа', icon: <FastfoodIcon /> },
  { type: 'Ресторани', icon: <RestaurantIcon /> },
  { type: 'Медицина', icon: <LocalHospitalIcon /> },
  { type: 'Подорожі', icon: <FlightIcon /> },
  { type: 'Готелі', icon: <HotelIcon /> },
  { type: 'Транспорт', icon: <DirectionsCarIcon /> },
  { type: 'Оренда', icon: <HomeIcon /> },
  { type: 'Робота', icon: <WorkIcon /> },
  { type: 'Оплата', icon: <AttachMoneyIcon /> },
  { type: 'Покупки', icon: <ShoppingCartIcon /> },
];

