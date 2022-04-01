import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  // Função que gera a data atual no formato 'YYYY-MM-DD HH:II:SS'
  brNow() {
    let yourDate = new Date(); // Obtém a data atual
    yourDate = new Date(yourDate.getTime() - (yourDate.getTimezoneOffset() * 60 * 1000)); // Ajusta o 'timezone'
    const dateParts = yourDate.toISOString().split('T'); // Extrai partes da data
    const timeParts = dateParts[1].split('.')[0]; // Remove timezone da hora
    return dateParts[0] + ' ' + timeParts; // Formata a data
  }
}
