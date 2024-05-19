import React from 'react';
import { BiSearch } from 'react-icons/bi';
// import venue from '/venue.jpg';

export default function Search() {
  const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			setIsScrolled(scrollTop > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);



	// Specify the path(s) where you want to show the image
	const showImage = location.pathname === '/';
	return (
    <>
    {showImage &&
				<div className='relative'> 
					<div classNameName=" w-full h-[450px]">
						<img src={venue} alt="venue" classNameName='w-full h-full object-cover object-center' />
					</div>
					{/* <form className="max-w-lg mx-auto w-full relative bottom-6">
						<div className="flex">
							<label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Your Email</label>
							<button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
							</svg></button>
							<div className="relative w-full">
								<input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Mockups, Logos, Design Templates..." required />
								<button type="submit" className="absolute top-0 end-0 px-6 p-2.5 text-sm font-medium h-full text-white bg-theame rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
									<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
									</svg>
									<span className="sr-only">Search</span>
								</button>
							</div>
						</div>
					</form> */}
				</div>
			}

    </>
	);
}
