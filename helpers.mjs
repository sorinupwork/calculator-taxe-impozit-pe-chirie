import { inputElements } from './main.mjs';
import { euro } from './constants.mjs';

export function calculateVenitTotalAnual() {
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

export function calculateImpozit() {
	const venitTotalAnual =
		parseFloat(inputElements.venitTotalAnualCuAlteSurse.value) || 0;
	const venitBrut = venitTotalAnual;
	const forfetara = venitBrut * 0.2;
	const venitNet = venitBrut - forfetara;
	const impozitAnual = venitNet * 0.1;
	const impozitLunar = impozitAnual / 12;
	const selectedType = inputElements.persoana.value;

	if (selectedType === 'PJ') {
		const reductionFactor = 0.1;
		const reducedImpozitAnual = impozitAnual * (1 - reductionFactor);
		const reducedImpozitLunar = impozitLunar * (1 - reductionFactor);

		updateImpozitInputs(reducedImpozitAnual, reducedImpozitLunar);
	} else {
		updateImpozitInputs(impozitAnual, impozitLunar);
	}
}

export function calculateCASS() {
	const chirieLunaraEuro =
		parseFloat(inputElements.chirieLunaraEuro.value) || 0;
	const venitTotalAnual =
		parseFloat(inputElements.venitTotalAnualCuAlteSurse.value) || 0;

	let cassRate = 0;
	let cassAnual = 0;

	if (chirieLunaraEuro < 415) {
		cassAnual = 0;
	} else {
		cassRate = 0.066;
		cassAnual = venitTotalAnual * cassRate;

		if (cassAnual > 7920) {
			cassAnual = 7920;
		}
	}

	const cassLunar = cassAnual / 12;

	updateCASSInputs(cassLunar, cassAnual);
}

function updateImpozitInputs(impozitAnual, impozitLunar) {
	inputElements.impozitTotalPlataAnuala.value = impozitAnual.toFixed(2);
	inputElements.impozitTotalPlataLunara.value = impozitLunar.toFixed(2);
}

function updateCASSInputs(cassLunar, cassAnual) {
	inputElements.impozitCASSLunar.value = cassLunar.toFixed(2);
	inputElements.impozitCASSAnual.value = cassAnual.toFixed(2);
}
