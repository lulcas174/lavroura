export function validateAreaTotalValues(
    totalArea: any,
    areaAgriculturalHectares: any,
    areaVegetationHectares: any,
) {

    if (totalArea <= 0) {
        return 'Total area must be greater than 0';
    }
    totalArea = parseFloat(totalArea);
    areaAgriculturalHectares = parseFloat(areaAgriculturalHectares);
    areaVegetationHectares = parseFloat(areaVegetationHectares);

    if (areaAgriculturalHectares + areaVegetationHectares > totalArea) {
        return 'The sum of the agricultural and vegetation areas cannot be greater than the total area';
    }
}
