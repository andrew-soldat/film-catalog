import React, { useState }from 'react'
import { getPagesArray } from './../../../utils/pages';

const Pagination = ({totalPages, currentPage, changeCurrentPages}) => {
	let [portionNumber, setPortionNumber] = useState(1)
	const portionSize = 5
	let leftPortionNumber = portionNumber
	let rightPortionNumber = portionNumber + portionSize - 1
	let pagesArray = getPagesArray(totalPages)
	let currentPageArray = pagesArray.filter(page => page >= leftPortionNumber && page <=  rightPortionNumber)

	const changePage = (page) => {
		changeCurrentPages(page)
		if (page < portionSize) {
			setPortionNumber(1)
		} else if (page > totalPages - portionSize + 1) {
			setPortionNumber(totalPages - portionSize + 1)
		} else if (page >= portionSize) {
			setPortionNumber(page - Math.floor(portionSize / 2))
		}
	}

	return (
      <div className="pagination">
			{currentPage > portionSize - 1 &&
				<button className="pagination__item" onClick={() => changePage(1)} >1</button>
			}
			{portionNumber > 1 &&
				<>
					<span> ... </span>
					<button onClick={() => changePage(currentPage - 1)} className="pagination__arrow">Previous page</button>
					<span> ... </span>
				</>
			}
			{currentPageArray.map(page => (
					<button key={page} className={currentPage === page ? "pagination__item pagination__item_current" : "pagination__item"} onClick={() => changePage(page)}>{page}</button>
				)
			)}
			{portionNumber < totalPages - portionSize + 1 &&
				<>
					<span>...</span>
					<button onClick={() => changePage(currentPage + 1)} className="pagination__arrow">Next page</button>
					<span>...</span>
				</>
			}
			{currentPage <= totalPages - portionSize + 1 &&
				<button className="pagination__item" onClick={() => changePage(totalPages)} >{totalPages}</button>
			}
		</div>
);
}

export default Pagination;