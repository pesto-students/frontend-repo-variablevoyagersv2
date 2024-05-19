import { useEffect, useRef } from 'react';

const useOutsideClick = (isOpen, close) => {
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				close();
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen, close]);

	return ref;
};

export default useOutsideClick;
