import { inputElements } from './main.mjs';
import { euro } from './constants.mjs';

export function calculateVenitTotalAnual() {
	const chirieLunaraEuro =
		parseFloat(inputElements.chirieLunaraEuro.value) || 0;
	const chirieLunaraLei = chirieLunaraEuro * euro; // Calculate Lei directly from Euro

	const venitTotalAnualLei = chirieLunaraLei * 12; // Total annual rent in Lei
	const venitTotalAnualEuro = venitTotalAnualLei / euro; // Total annual rent in Euro

	const venitLunarAlteSurseLei =
		parseFloat(inputElements.venitLunarAlteSurseLei.value) || 0;
	const venitLunarAlteSurseEuro =
		parseFloat(inputElements.venitLunarAlteSurseEuro.value) || 0;

	const venitLunarAlteSurseTotalLei =
		venitLunarAlteSurseLei + venitLunarAlteSurseEuro * euro;

	const venitTotalCuAlteSurseLei =
		venitTotalAnualLei + venitLunarAlteSurseTotalLei * 12;
	const venitTotalCuAlteSurseEuro = venitTotalCuAlteSurseLei / euro;

	inputElements.venitTotalAnualLei.value = priceFormatRON(venitTotalAnualLei);
	inputElements.venitTotalAnualCuAlteSurseLei.value =
		priceFormatRON(venitTotalCuAlteSurseLei);
	inputElements.venitTotalAnualEuro.value = priceFormatEUR(venitTotalAnualEuro);
	inputElements.venitTotalAnualCuAlteSurseEuro.value =
		priceFormatEUR(venitTotalCuAlteSurseEuro);
}

export function calculateImpozit() {
	let venitTotalAnual = 0;

	const venitTotalAnualCuAlteSurseLei =
		parseFormattedNumber(inputElements.venitTotalAnualCuAlteSurseLei.value) || 0;
	const venitTotalAnualCuAlteSurseEuro =
		parseFormattedNumber(inputElements.venitTotalAnualCuAlteSurseEuro.value) || 0;

	if (venitTotalAnualCuAlteSurseLei > 0) {
		venitTotalAnual = venitTotalAnualCuAlteSurseLei;
	} else if (venitTotalAnualCuAlteSurseEuro > 0) {
		venitTotalAnual = venitTotalAnualCuAlteSurseEuro * euro;
	}

	const venitBrut = venitTotalAnual;
	const forfetara = venitBrut * 0.2;
	const venitNet = venitBrut - forfetara;
	const impozitAnual = venitNet * 0.1;
	const impozitLunar = impozitAnual / 12;

	const selectedType = inputElements.persoana.value;

	let finalImpozitAnual;
	let finalImpozitLunar;

	if (selectedType === 'PJ') {
		const reductionFactor = 0.1;
		finalImpozitAnual = impozitAnual * (1 - reductionFactor);
		finalImpozitLunar = impozitLunar * (1 - reductionFactor);
	} else {
		finalImpozitAnual = impozitAnual;
		finalImpozitLunar = impozitLunar;
	}

	updateImpozitInputs(finalImpozitAnual, finalImpozitLunar);

	const impozitAnualEuro = finalImpozitAnual / euro;
	const impozitLunarEuro = finalImpozitLunar / euro;

	inputElements.impozitTotalPlataAnualaEuro.value = priceFormatEUR(impozitAnualEuro);
	inputElements.impozitTotalPlataLunaraEuro.value = priceFormatEUR(impozitLunarEuro);
}

export function calculateCASS() {
	const chirieLunaraLei = parseFormattedNumber(inputElements.chirieLunaraLei.value) || 0;

	const venitTotalAnualLei =
		parseFormattedNumber(inputElements.venitTotalAnualCuAlteSurseLei.value) || 0;

	let cassRate = 0;
	let cassAnual = 0;

	if (chirieLunaraLei < 415) {
		cassAnual = 0;
	} else {
		cassRate = 0.066;
		cassAnual = venitTotalAnualLei * cassRate;

		if (cassAnual > 7920) {
			cassAnual = 7920;
		}
	}

	const cassLunar = cassAnual / 12;

	updateCASSInputs(cassLunar, cassAnual);

	const cassAnualEuro = cassAnual / euro;
	const cassLunarEuro = cassLunar / euro;

	inputElements.impozitCASSLunarEuro.value = priceFormatEUR(cassLunarEuro);
	inputElements.impozitCASSAnualEuro.value = priceFormatEUR(cassAnualEuro);
}

function updateImpozitInputs(impozitAnual, impozitLunar) {
	inputElements.impozitTotalPlataAnualaLei.value = priceFormatRON(impozitAnual);
	inputElements.impozitTotalPlataLunaraLei.value = priceFormatRON(impozitLunar);
}

function updateCASSInputs(cassLunar, cassAnual) {
	inputElements.impozitCASSLunarLei.value = priceFormatRON(cassLunar);
	inputElements.impozitCASSAnualLei.value = priceFormatRON(cassAnual);
}

function priceFormatRON(suma) {
    if (isNaN(suma)) {
        return 'Invalid number';
    }
    
    const formattedNumber = Intl.NumberFormat('ro-RO').format(suma);
    
    return `${formattedNumber} RON`;
}
function priceFormatEUR(suma) {
    if (isNaN(suma)) {
        return 'Invalid number';
    }
    
    const formattedNumber = Intl.NumberFormat('ro-RO').format(suma);
    
    return `${formattedNumber} EUR`;
}
function parseFormattedNumber(formattedNum) {
    if (typeof formattedNum !== 'string') {
        return 'Invalid input';
    }

    const cleanedNum = formattedNum.replace(/\./g, '').replace(',', '.');

    const parsedNum = parseFloat(cleanedNum);

    if (isNaN(parsedNum)) {
        return 'Invalid number';
    }

    return parsedNum;
}
