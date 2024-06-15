import WeddingIcon from '../assets/icons/wedding.png';
import BirthdayIcon from '../assets/icons/birthday.png';
import EngagementIcon from '../assets/icons/engage.png';
import CorIcon from '../assets/icons/cor-party.png';
import PoolIcon from '../assets/icons/pool-party.png';
import CocktailIcon from '../assets/icons/cocktail.png';
import BanquetIcon from '../assets/icons/hall.png';
import RestaurantIcon from '../assets/icons/res.png';
import FarmIcon from '../assets/icons/farm.png';
import KittyIcon from '../assets/icons/kitty.png';
import allCategories from '../assets/icons/allCategories.png';

export const MAX_CATEGORIES = 3;
export const MAX_AMENITIES = 5;

export const CATEGORIES = [
	{ id: '0', title: 'All Categories', tagName: '', icon: allCategories },
	{ id: '1', title: 'Wedding', tagName: 'wedding', icon: WeddingIcon },
	{ id: '2', title: 'Birthday', tagName: 'birthday', icon: BirthdayIcon },
	{ id: '3', title: 'Engagement', tagName: 'engagement', icon: EngagementIcon },
	{ id: '4', title: 'Pool Party', tagName: 'pool-party', icon: PoolIcon },
	{ id: '5', title: 'Cocktail Party', tagName: 'cocktail-party', icon: CocktailIcon },
	{ id: '6', title: 'Corporate Party', tagName: 'corporate-party', icon: CorIcon },
	{ id: '7', title: 'Banquet Halls', tagName: 'banquet-halls', icon: BanquetIcon },
	{ id: '8', title: 'Restaurants', tagName: 'restaurants', icon: RestaurantIcon },
	{ id: '9', title: 'Farm Houses', tagName: 'farm-houses', icon: FarmIcon },
	{ id: '10', title: 'Kitty Party', tagName: 'kitty-party', icon: KittyIcon },
	
];
