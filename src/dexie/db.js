import Dexie from 'dexie';

export const db = new Dexie('bookingDB');
db.version(1).stores({
	bookings:
		'++id, userId, propertyId, startDate, endDate, totalPrice, propertyName, description, price, checkInTime, checkOutTime, address, city, country,propertyImages, amenities, propertyTags,owner',
});

export const clearDatabase = async () => {
	try {
		await db.delete();
		console.log('Database cleared successfully');
	} catch (error) {
		console.error('Error clearing database:', error);
	}
};
