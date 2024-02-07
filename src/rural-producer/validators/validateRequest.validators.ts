import { ValidationException } from "src/exceptions/validationException.exceptions";
import { Producer } from "../models/producer";
import { validateAreaTotalValues } from "./area.validators";
import { ValidCNPJ, ValidCPF, validateCPFAndCNPJPresence } from "./cpf-cnpj.validators";

export function validateRequestBody(reqBody: Producer, method: String): void {
    const { CPF, CNPJ, areaTotalHectares, areaAgriculturalHectares, areaVegetationHectares } = reqBody;
     
    if (method === 'POST') {
        if (!CPF && !CNPJ) {
            throw new ValidationException('CPF or CNPJ is required');
        }
        if (!areaTotalHectares && !areaAgriculturalHectares && !areaVegetationHectares) {
            throw new ValidationException('Area Total, Area Agricultural and Area Vegetation are required');
        }
          
        if (areaTotalHectares || areaAgriculturalHectares || areaVegetationHectares) {
            const areaValidationResult = validateAreaTotalValues(areaTotalHectares, areaAgriculturalHectares, areaVegetationHectares);
            if (areaValidationResult) {
                throw new ValidationException(areaValidationResult);
            }
        }
    }
    if (CPF || CNPJ) {
        const cpfCnpjValidationResult = validateCPFAndCNPJPresence(CPF, CNPJ);
        if (cpfCnpjValidationResult) {
            throw new ValidationException(cpfCnpjValidationResult);
        }

        const isValid = CPF ? ValidCPF(CPF) : ValidCNPJ(CNPJ);
        if (!isValid) {
            throw new ValidationException(CPF ? 'Invalid CPF' : 'Invalid CNPJ');
        }
    }
  

}