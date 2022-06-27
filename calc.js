const TBM = (altura, peso, idade) => {//passar em CM
  return Math.ceil((66 + (13.8 * peso) + (5.0 * altura) - (6.8 * idade)));
}

const BF = (altura, pescoco, abdomen) => { // passar em CM
  return Math.ceil((495 / (1.033 - 0.191 * Math.log10(abdomen - pescoco) + 0.155 * Math.log10(altura)) - 450))
}

const converteBFemKG = (peso, callback) => {
  return peso / 100 * callback
}

const TBMfeminino = (altura, peso, idade) => {
  return Math.ceil((peso * 9.56) + (altura * 1.85) - (idade * 4.7) + 655.1);
}

const BFfeminino = (altura, pescoco, cintura, quadril) => {
  return Math.ceil((495 / (1.296 - 0.350 * Math.log10(quadril + cintura - pescoco) + 0.221 * Math.log10(altura)) - 450))

}
const CalcMacrosBuking = (altura, peso, idade) => {
  let Buking = TBM(altura, peso, idade) + 500
  let protein = Buking * 0.40
  let carb = Buking * 0.40
  let fat = Buking * 0.20
  return `
  Proteina: ${Math.round(protein / 4)} Calorias: ${Math.round(protein)} Kcal
  Carboidratos: ${Math.round(carb / 4)}  Calorias: ${Math.round(carb)} Kcal
  gordura: ${Math.round(fat / 9)} Calorias: ${Math.round(fat)} Kcal
  Total de calorias Diarias: ${Buking + 1} Kcal`

}
const calcMacrosCutting = (altura, peso, idade) => { // proporção 40% Proteina 40%Carboidrato 20% Gordura
  let Cutting = TBM(altura, peso, idade) - 500
  let protein = Cutting * 0.40
  let carb = Cutting * 0.40
  let fat = Cutting * 0.20
  return `
  Proteina: ${Math.round(protein / 4)} Calorias: ${Math.round(protein)} Kcal
  Carboidratos: ${Math.round(carb / 4)}  Calorias: ${Math.round(carb)} Kcal
  gordura: ${Math.round(fat / 9)} Calorias: ${Math.round(fat)} Kcal
  Total de calorias Diarias: ${Cutting + 1} Kcal`

}

const Dias = (altura, peso, idade, pescoco, abdomen) => { // Passar em CM
  return `
  Sua taxa de metabolismo basal: ${TBM(altura, peso, idade)} 

  Seu % de gordura corporal é: ${BF(altura, pescoco, abdomen)}%

  Você deve manter um defict de 500 calorias para reduzir seu BF pela metade por: ${Math.ceil(converteBFemKG(peso, BF(altura, pescoco, abdomen)) * 7000 / 500 / 2)} dias 

  % de gordura corporal em Quilogramas ${Math.ceil(converteBFemKG(peso, BF(altura, pescoco, abdomen)))} Kg

  Dieta para perda de peso: 

  ${calcMacrosCutting(altura, peso, idade)}

  Dieta para ganho de Massa Magra: 

  ${CalcMacrosBuking(altura, peso, idade)}`
}

const DiasFeminino = (altura, peso, idade, pescoco, cintura, quadril) => {
  return `
  Sua taxa de metabolismo basal: ${TBMfeminino(altura, peso, idade)} 

  Seu % de gordura corporal é: ${BFfeminino(altura, pescoco, cintura, quadril)}%

  Você deve manter um defict de 500 calorias para reduzir seu BF pela metade por: ${Math.ceil(converteBFemKG(peso, BFfeminino(altura, pescoco, cintura, quadril)) * 7000 / 500 / 2)} dias 

  BF em kg ${Math.ceil(converteBFemKG(peso, BFfeminino(altura, pescoco, cintura, quadril)))}

  Dieta para perda de peso: 

  ${calcMacrosCutting(altura, peso, idade)}


  Dieta para ganho de Massa Magra: 

  ${CalcMacrosBuking(altura, peso, idade)}`
}