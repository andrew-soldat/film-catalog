

export default function getListGenresById (list, arrayId) {
	let array = []
	for (var i = 0; i < arrayId.length; i++) {
		for (var j = 0; j < list.length; j++) {
			if (list[j].id === arrayId[i]) {
				array.push(list[j].name)
			}
		}
	}
	return array
}
