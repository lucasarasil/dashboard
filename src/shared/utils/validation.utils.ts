// Utilitários de validação
export function isValidEmail(email: string): boolean {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
}

export function isValidCPF(cpf: string): boolean {
 // Remove caracteres não numéricos
 const cleanCPF = cpf.replace(/\D/g, "");

 if (cleanCPF.length !== 11) return false;

 // Verifica se todos os dígitos são iguais
 if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

 // Validação dos dígitos verificadores
 let sum = 0;
 for (let i = 0; i < 9; i++) {
  sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
 }
 let digit = 11 - (sum % 11);
 if (digit >= 10) digit = 0;
 if (digit !== parseInt(cleanCPF.charAt(9))) return false;

 sum = 0;
 for (let i = 0; i < 10; i++) {
  sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
 }
 digit = 11 - (sum % 11);
 if (digit >= 10) digit = 0;
 if (digit !== parseInt(cleanCPF.charAt(10))) return false;

 return true;
}

export function isValidCNPJ(cnpj: string): boolean {
 const cleanCNPJ = cnpj.replace(/\D/g, "");

 if (cleanCNPJ.length !== 14) return false;
 if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

 // Validação do primeiro dígito verificador
 let length = cleanCNPJ.length - 2;
 let numbers = cleanCNPJ.substring(0, length);
 const digits = cleanCNPJ.substring(length);
 let sum = 0;
 let pos = length - 7;

 for (let i = length; i >= 1; i--) {
  sum += parseInt(numbers.charAt(length - i)) * pos--;
  if (pos < 2) pos = 9;
 }

 let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
 if (result !== parseInt(digits.charAt(0))) return false;

 // Validação do segundo dígito verificador
 length = length + 1;
 numbers = cleanCNPJ.substring(0, length);
 sum = 0;
 pos = length - 7;

 for (let i = length; i >= 1; i--) {
  sum += parseInt(numbers.charAt(length - i)) * pos--;
  if (pos < 2) pos = 9;
 }

 result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
 if (result !== parseInt(digits.charAt(1))) return false;

 return true;
}

export function isValidPhone(phone: string): boolean {
 const cleanPhone = phone.replace(/\D/g, "");
 // Aceita telefones com 10 ou 11 dígitos (com ou sem 9 na frente do celular)
 return cleanPhone.length === 10 || cleanPhone.length === 11;
}

export function isValidURL(url: string): boolean {
 try {
  new URL(url);
  return true;
 } catch {
  return false;
 }
}

export function isEmpty(value: unknown): boolean {
 if (value === null || value === undefined) return true;
 if (typeof value === "string") return value.trim().length === 0;
 if (Array.isArray(value)) return value.length === 0;
 if (typeof value === "object") return Object.keys(value).length === 0;
 return false;
}
