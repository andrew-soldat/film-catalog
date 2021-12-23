import React from 'react'
import Input from './UI/Inputs/Input'


const MoviesSearch = ({searchQuery, setSearchQuery }) => {

	return (
		<form>
			<Input
				onChange={(e) => setSearchQuery(e.target.value)}
				value={searchQuery}
				placeholder="Search..."
				type="text"
			/>
		</form>
);
}

export default MoviesSearch;