export const formatDateRange = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const startYear = start.getFullYear();
	const endYear = end.getFullYear();

	const startMonth = start.toLocaleString('default', { month: 'long' });
	const startDay = start.getDate();
	const endDay = end.getDate();

	if (start.toDateString() === end.toDateString()) {
		return `${startDay} ${startMonth} ${startYear}`;
	} else {
		return `${startDay} ${startMonth} ${startYear} - ${endDay} ${startMonth} ${endYear}`;
	}
};
