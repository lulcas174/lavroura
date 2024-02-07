export function validateAreaTotalValues(
    totalArea: number,
    areaAgriculturalHectares: number,
    areaVegetationHectares: number,
) {
    if (typeof totalArea !== 'number' || typeof areaAgriculturalHectares !== 'number' || typeof areaVegetationHectares !== 'number') {
        return 'Invalid input: parameters must be numbers';
    }

    if (totalArea <= 0) {
        return 'Total area must be greater than 0';
    }
    if (areaAgriculturalHectares + areaVegetationHectares > totalArea) {
        return 'The sum of the agricultural and vegetation areas cannot be greater than the total area';
    }
}
