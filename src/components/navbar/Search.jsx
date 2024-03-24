import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function Search() {
	return (
		<div
			//   onClick={searchModal.onOpen}
			className="
        border-[1px]
        w-1/3
        md:w-1/3
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
		>
			<div
				className="
          flex
          flex-row
          items-center
          justify-between
        "
			>
				<div
					className="
          w-full
            text-sm
            pl-6
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            justify-between
            gap-3
          "
				>
					<div className="sm:block">Search</div>
					<div
						className="
              p-2
             bg-primary
              rounded-full
              text-white
            "
					>
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
}
