export default function setVoteClass (vote){
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'yellow';
	} else {
		return 'red';
	}
};
