import { addDays } from 'date-fns';
import React from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePicker = ({ value, onChange, disabledDates }) => {
	return (
		<DateRange
			rangeColors={['#556793']}
			ranges={[value]}
			date={new Date()}
			onChange={onChange}
			direction="vertical"
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
			maxDate={addDays(new Date(), 90)}
		/>
	);
};

export default DatePicker;
