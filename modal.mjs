export function setupModal() {
	const infoSpan = document.querySelector('.info');
	const miniModal = document.querySelector('.mini-modal');
	const closeSpan = document.querySelector('.close');

	infoSpan.addEventListener('click', () => {
		miniModal.classList.add('show');
	});

	closeSpan.addEventListener('click', () => {
		miniModal.classList.remove('show');
	});

	document.addEventListener('click', (e) => {
		if (e.target !== infoSpan && e.target !== miniModal) {
			miniModal.classList.remove('show');
		}
	});
}
