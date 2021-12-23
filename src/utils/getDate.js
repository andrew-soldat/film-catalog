export const getDate = (date) => {
	const arrMonth = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]
	let day = date.slice(8, 9) === '0' ? date.slice(9) : date.slice(8)
	const year = date.slice(0, 4)
	const dataMounth = date.slice(5, 7)
	let mounth = ''

	if (dataMounth < 10) {
		mounth = arrMonth[dataMounth.slice(1) - 1]
	} else {
		mounth = arrMonth[dataMounth - 1]
	}

	return `${day} ${mounth} ${year}`
}
