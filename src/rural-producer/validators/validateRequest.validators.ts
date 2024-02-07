import { ValidationException } from "src/exceptions/validationException.exceptions";
import { Producer } from "../models/producer";
import { validateAreaTotalValues } from "./area.validators";
import { ValidCNPJ, ValidCPF, validateCPFAndCNPJPresence } from "./cpf-cnpj.validators";

export function validateRequestBody(reqBody: Producer, method:String): void {
    const { CPF, CNPJ, areaTotalHectares, areaAgriculturalHectares, areaVegetationHectares } = reqBody;
    if(method === 'PUT'){
        if(CPF || CNPJ){
            const cpfCnpjValidationResult = validateCPFAndCNPJPresence(CPF, CNPJ);
            if (cpfCnpjValidationResult) {
                throw new ValidationException(cpfCnpjValidationResult);
            }
        
            const isValid = CPF ? ValidCPF(CPF) : ValidCNPJ(CNPJ);
            if (!isValid) {
                throw new ValidationException(CPF ? 'Invalid CPF' : 'Invalid CNPJ');
            }
        }
        if(areaTotalHectares || areaAgriculturalHectares || areaVegetationHectares){
            const areaValidationResult = validateAreaTotalValues(areaTotalHectares, areaAgriculturalHectares, areaVegetationHectares);
            if (areaValidationResult) {
                throw new ValidationException(areaValidationResult);
            }
        }
       
    }
}