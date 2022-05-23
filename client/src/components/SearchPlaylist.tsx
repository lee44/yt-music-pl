import React from 'react';

const SearchPlaylist = () => {
	return (
		<div className='w-full'>
			<input
				className='w-full placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-base focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 '
				placeholder='Enter playlist url...'
				type='text'
				name='search'
			/>
			<button className=' rounded w-full my-3 py-2 bg-blue-900 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>
				Add Playlist
			</button>
		</div>
	);
};

export default SearchPlaylist;
