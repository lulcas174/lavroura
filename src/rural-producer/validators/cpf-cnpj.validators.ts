import { cpf as validateCPF, cnpj as validateCNPJ } from 'cpf-cnpj-validator';

export function validateCPFAndCNPJPresence(CPF: string, CNPJ: string) {
    if (!CPF && !CNPJ) {
        return 'CPF or CNPJ is required';
    }
    if (CPF && CNPJ) {
        return 'CPF and CNPJ cannot be used together';
    }
    return '';
}

export function ValidCPF(CPF: string): boolean {
    return validateCPF.isValid(CPF);
    
}

export function ValidCNPJ(CNPJ: string): boolean {
    return validateCNPJ.isValid(CNPJ);
}
