export class ExtractInfoService {
  constructor( ) { }

  async execute(text: string) {
    const itemsInvoice = /Itens da Fatura\s*([\s\S]*?)Tipo de Medição/;
    const informacoesClienteRegex = /Código de Débito\s*([\s\S]*?)Referente a/;

    // Extrair informações do cliente
    const clientData = this.extractClientInfo(text,informacoesClienteRegex);
    // Extrair informações da fatura
    const invoiceData = this.extractInvoiceInfo(text, itemsInvoice);

    return {
      client:clientData,
      invoice:invoiceData,
      address: clientData.address
    }
  }

  private extractClientInfo(text: string, regex: RegExp) {
    let clientInfo = regex.exec(text);
    const clientData = clientInfo ? clientInfo[1].split('\n') : [];

    let numberClient = '', district = '' , cep = '', city = '', state = '';
    let name = '', document = '',street = '', number = '', monthReference = '';

    if (clientData.length > 3 && !clientData[3].includes('ATENÇÃO')) {
      ({ name, document, numberClient, street, number, district, city, state, cep, monthReference } = this.extractClientDetails(clientData, 3));
    } else {
      ({ name, document, numberClient, street, number, district, city, state, cep, monthReference } = this.extractClientDetails(clientData, 5));
    }

    return {
      name,
      document,
      numberClient,
      address: {
        street,
        number,
        district,
        city,
        state,
        cep,
      }
    }
  }

  private extractClientDetails(clientData: string[], offset: number) {
    const regexNameClient = /^(.*?)\s+(\d+)$/;
    const regexStreetAndNumber = /^(.*?)\s+(\d+)\s+(.*)$/;
    const regexCepCityState = /^(\d{5}-\d{3})\s+(.+?),\s+([A-Z]{2})$/;
    const regexMonthAndYear = /(\w+)\/(\d{4})/;

    const resultNameClient = regexNameClient.exec(clientData[offset]);
    const name = resultNameClient ? resultNameClient[1] : clientData[offset];
    const document = resultNameClient ? resultNameClient[2] : clientData[offset + 4];
    const numberClient = clientData[offset + 7]?.split(' ')[2] || '';
    const district = clientData[offset + 2];

    const resultStreetAndNumber = regexStreetAndNumber.exec(clientData[offset + 1]);
    const street = resultStreetAndNumber ? resultStreetAndNumber[1] : '';
    const number = resultStreetAndNumber ? resultStreetAndNumber[2] : '';

    const resultCepCityState = regexCepCityState.exec(clientData[offset + 3]);
    const cep = resultCepCityState ? resultCepCityState[1] : '';
    const city = resultCepCityState ? resultCepCityState[2] : '';
    const state = resultCepCityState ? resultCepCityState[3] : '';

    const resultMonthAndYear = regexMonthAndYear.exec(clientData[2]);
    const monthReference = resultMonthAndYear ? resultMonthAndYear[0] : '';

    return { name, document, numberClient, street, number, district, city, state, cep, monthReference };
  }

  private extractInvoiceInfo(text: string, regex: RegExp) {
    const invoiceInfo = regex.exec(text) || '';
    const energiaEletricaRegex = /Energia Elétrica\s*([\s\S]*?)Energia SCEE s/;
    const energiaSCEERegex = /Energia SCEE s\/ ICMS\s*([\s\S]*?)Energia compensada/;
    const energiaCompensadaRegex = /Energia compensada GD I\s*([\s\S]*?)Contrib Ilum Publica Municipa/;
    const contribuicaoIlumPublicaRegex = /Contrib Ilum Publica Municipal\s*([\s\S]*?)TOTAL/;

    return {
      eletricalEnergyQuantity: this.extractEnergyInfo(invoiceInfo, energiaEletricaRegex, 6),
      eletricalEnergyAmount: this.extractEnergyInfo(invoiceInfo, energiaEletricaRegex, 8),
      energySCEEEICMSQuantity: this.extractEnergyInfo(invoiceInfo, energiaSCEERegex, 5),
      energySCEEEICMSAmount: this.extractEnergyInfo(invoiceInfo, energiaSCEERegex, 7),
      compensatedEnergyQuantity: this.extractEnergyInfo(invoiceInfo, energiaCompensadaRegex, 5),
      compensatedEnergyAmount: this.extractEnergyInfo(invoiceInfo, energiaCompensadaRegex, 7),
      publicLightingContribution: this.extractEnergyInfo(invoiceInfo, contribuicaoIlumPublicaRegex, 0, true),
    };
  }

  private extractEnergyInfo(text: any, regex: RegExp, index: number, cleanLineBreak = false) {
    const result = regex.exec(text);
    if (result) {
      const value = result[1].split(' ')[index];
      return cleanLineBreak ? value.replace('\n', '') : value;
    }
    return '';
  }
}