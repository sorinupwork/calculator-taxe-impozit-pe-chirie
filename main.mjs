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
	chirieLunaraLei: document.getElementById('chirieLunaraLei'),
	chirieLunaraEuro: document.getElementById('chirieLunaraEuro'),
	venitLunarAlteSurseLei: document.getElementById('venitLunarAlteSurseLei'),
	venitLunarAlteSurseEuro: document.getElementById('venitLunarAlteSurseEuro'),
	venitTotalAnualLei: document.getElementById('venitTotalAnualLei'),
	venitTotalAnualEuro: document.getElementById('venitTotalAnualEuro'),
	venitTotalAnualCuAlteSurseLei: document.getElementById(
		'venitTotalAnualCuAlteSurseLei'
	),
	venitTotalAnualCuAlteSurseEuro: document.getElementById(
		'venitTotalAnualCuAlteSurseEuro'
	),
	impozitTotalPlataAnualaLei: document.getElementById('impozitPlataAnualaLei'),
	impozitTotalPlataAnualaEuro: document.getElementById(
		'impozitPlataAnualaEuro'
	),
	impozitTotalPlataLunaraLei: document.getElementById('impozitPlataLunaraLei'),
	impozitTotalPlataLunaraEuro: document.getElementById(
		'impozitPlataLunaraEuro'
	),
	impozitCASSLunarLei: document.getElementById('impozitCASSLunarLei'),
	impozitCASSLunarEuro: document.getElementById('impozitCASSLunarEuro'),
	impozitCASSAnualLei: document.getElementById('impozitCASSAnualLei'),
	impozitCASSAnualEuro: document.getElementById('impozitCASSAnualEuro'),
	persoana: document.getElementById('persoana'),
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

inputElements.venitLunarAlteSurseLei.addEventListener('input', () => {
	calculateVenitTotalAnual();
	calculateImpozit();
	calculateCASS();
});
inputElements.venitLunarAlteSurseEuro.addEventListener('input', () => {
	calculateVenitTotalAnual();
	calculateImpozit();
	calculateCASS();
});

inputElements.persoana.addEventListener('change', () => {
	calculateVenitTotalAnual();
	calculateImpozit();
	calculateCASS();
});

// info modal
setupModal();
