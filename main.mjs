import { euro, salariuMinimBrut } from './constants.mjs';
import {
	calculateVenitTotalAnual,
	calculateImpozit,
	calculateCASS,
} from './helpers.mjs';
import { setupModal } from './modal.mjs';

// dynamic text elements
document.getElementById(
	'curs-valutar'
).innerHTML = `Curs BNR azi: 1 € = ${euro} Lei`;
document.getElementById(
	'salariu-minim'
).innerHTML = `Salariul minim pe economie brut in 2024: ${salariuMinimBrut} Lei`;

// input elements
export const inputElements = {
	chirieLunaraEuro: document.getElementById('chirieLunaraEuro'),
	chirieLunaraLei: document.getElementById('chirieLunaraLei'),
	venitLunarAlteSurse: document.getElementById('venitLunarAlteSurse'),
	venitTotalAnual: document.getElementById('venitTotalAnual'),
	venitTotalAnualCuAlteSurse: document.getElementById(
		'venitTotalAnualCuAlteSurse'
	),
	impozitTotalPlataAnuala: document.getElementById('impozitPlataAnuala'),
	impozitTotalPlataLunara: document.getElementById('impozitPlataLunara'),
	impozitCASSLunar: document.getElementById('impozitCASSLunar'),
	impozitCASSAnual: document.getElementById('impozitCASSAnual'),
};

// event listeners
inputElements.chirieLunaraEuro.addEventListener('input', () => {
	const chirieLunaraEuroValue = parseFloat(
		inputElements.chirieLunaraEuro.value
	);
	const chirieLunaraLeiValue = chirieLunaraEuroValue * euro;
	inputElements.chirieLunaraLei.value = chirieLunaraLeiValue.toFixed(2);

	calculateVenitTotalAnual();
	calculateImpozit();
	calculateCASS();
});

inputElements.venitLunarAlteSurse.addEventListener('input', () => {
	calculateVenitTotalAnual();
	calculateImpozit();
	calculateCASS();
});

// info modal
setupModal();
