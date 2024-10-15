let euro = 4.973;
document.getElementById('curs-valutar').innerHTML =
	'The value of 1 euro is: ' + euro + ' lei';

// input elements
const inputElements = {
	chirieLunaraEuro: document.getElementById('chirieLunaraEuro'),
	chirieLunaraLei: document.getElementById('chirieLunaraLei'),
	venitLunarAlteSurse: document.getElementById('venitLunarAlteSurse'),
	venitTotalAnual: document.getElementById('venitTotalAnual'),
	venitTotalAnualCuAlteSurse: document.getElementById(
		'venitTotalAnualCuAlteSurse'
	),
	impozitTotalPlataAnuala: document.getElementById('impozitPlataAnuala'),
	impozitTotalPlataLunara: document.getElementById('impozitPlataLunara'),
};

inputElements.chirieLunaraEuro.addEventListener('input', () => {
	const chirieLunaraEuroValue = parseFloat(
		inputElements.chirieLunaraEuro.value
	);
	const chirieLunaraLeiValue = chirieLunaraEuroValue * euro;

	inputElements.chirieLunaraLei.value = chirieLunaraLeiValue.toFixed(2);
	calculateVenitTotalAnual();
	calculateImpozit();
});

inputElements.venitLunarAlteSurse.addEventListener(
	'input',
	calculateVenitTotalAnual
);

function calculateVenitTotalAnual() {
	const chirieLunaraEuro =
		parseFloat(inputElements.chirieLunaraEuro.value) || 0;
	const chirieLunaraLei = chirieLunaraEuro * euro;
	const venitLunarAlteSurse =
		parseFloat(inputElements.venitLunarAlteSurse.value) || 0;

	const venitTotalAnualLei = chirieLunaraLei * 12;
	const venitTotalCuAlteSurse =
		venitLunarAlteSurse > 0
			? venitTotalAnualLei + venitLunarAlteSurse * 12
			: venitTotalAnualLei;

	inputElements.venitTotalAnual.value = venitTotalAnualLei.toFixed(2);
	inputElements.venitTotalAnualCuAlteSurse.value =
		venitTotalCuAlteSurse.toFixed(2);
}

function calculateImpozit() {
	const venitTotalAnual = parseFloat(inputElements.venitTotalAnual.value) || 0;
	const venitBrut = venitTotalAnual;
	const forfetara = venitBrut * 0.2;
	const venitNet = venitBrut - forfetara;
	const impozitAnual = venitNet * 0.1;
	const impozitLunar = impozitAnual / 12;

	inputElements.impozitTotalPlataAnuala.value = impozitAnual.toFixed(2);
	inputElements.impozitTotalPlataLunara.value = impozitLunar.toFixed(2);
}

// info modal
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
