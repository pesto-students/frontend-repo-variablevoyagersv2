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


export const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

export const throttle = (func, limit) => {
    let lastFunc, lastRan;
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };