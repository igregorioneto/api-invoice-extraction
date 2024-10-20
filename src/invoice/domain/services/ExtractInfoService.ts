export class ExtractInfoService {
  constructor( ) { }

  async execute(text: string) {
    console.log(text);
    const itemsInvoice = /Itens da Fatura\s*([\s\S]*?)Tipo de Medição/;
    const informacoesClienteRegex = /Código de Débito\s*([\s\S]*?)Referente a/;

    // Client Extract Info
    let clientInfo = informacoesClienteRegex.exec(text);
    const clientData = clientInfo ? clientInfo[1].split('\n') : [];
    const clientDataValue = clientData[3].includes('ATENÇÃO') ? clientData[5] : clientData[3];
    const regexNameClient = /^(.*?)\s+(\d+)$/;
    const resultNameClient = regexNameClient.exec(clientDataValue);
    let name = clientData[3].includes('ATENÇÃO') ? clientDataValue : '';
    let document = '';
    if (resultNameClient && name === '') {
      name = resultNameClient[1];
      document = resultNameClient[2] || '';
    }
    let numberClient = clientData[10].split(' ')[2] || ''

    let district = clientData[5];

    // Extract Address Info
    const regexStreetAndNumber = /^(.*?)\s+(\d+)\s+(.*)$/;
    const resultStreetAndNumber = regexStreetAndNumber.exec(clientData[4]);
    let street = '', number = '';
    if (resultStreetAndNumber) {
      street = resultStreetAndNumber[1];
      number = resultStreetAndNumber[2];
    }

    const regexCepCityState = /^(\d{5}-\d{3})\s+(.+?),\s+([A-Z]{2})$/;
    const resultCepCityState = regexCepCityState.exec(clientData[6]);
    let cep = '', city = '', state = '';
    if (resultCepCityState) {
      cep = resultCepCityState[1];
      city = resultCepCityState[2];
      state = resultCepCityState[3];
    }

    // Extract Invoice Info
    const regexMonthAndYear = /(\w+)\/(\d{4})/;
    const resultMonthAndYear = regexMonthAndYear.exec(clientData[2]);
    let monthReference = '';
    if (resultMonthAndYear) {
      monthReference = resultMonthAndYear[0];
    }

    let invoiceInfo = itemsInvoice.exec(text) || '';
    const energiaEletricaRegex = /Energia Elétrica\s*([\s\S]*?)Energia SCEE s/;
    const energiaSCEERegex = /Energia SCEE s\/ ICMS\s*([\s\S]*?)Energia compensada/;
    const energiaCompensadaRegex = /Energia compensada GD I\s*([\s\S]*?)Contrib Ilum Publica Municipa/;
    const contribuicaoIlumPublicaRegex = /Contrib Ilum Publica Municipal\s*([\s\S]*?)TOTAL/;

    let eletricalEnergyQuantity = '', eletricalEnergyAmount = '',
    energySCEEEICMSQuantity = '', energySCEEEICMSAmount = '',
    compensatedEnergyQuantity = '', compensatedEnergyAmount = '',
    publicLightingContribution = '';

    const resultEnergiaEletricaRex = energiaEletricaRegex.exec(invoiceInfo[0]);

    if (resultEnergiaEletricaRex) {
      eletricalEnergyQuantity = resultEnergiaEletricaRex[1].split(' ')[6];
      eletricalEnergyAmount = resultEnergiaEletricaRex[1].split(' ')[8];
    }

    const resultenergySCEEEICMSQuantity = energiaSCEERegex.exec(invoiceInfo[0]);
    if (resultenergySCEEEICMSQuantity) {
      energySCEEEICMSQuantity = resultenergySCEEEICMSQuantity[1].split(' ')[5];
      energySCEEEICMSAmount = resultenergySCEEEICMSQuantity[1].split(' ')[7];
    }

    const resultenergiaCompensadaRegex = energiaCompensadaRegex.exec(invoiceInfo[0]);
    if (resultenergiaCompensadaRegex) {
      compensatedEnergyQuantity = resultenergiaCompensadaRegex[1].split(' ')[5];
      compensatedEnergyAmount = resultenergiaCompensadaRegex[1].split(' ')[7];
    }

    const resultpublicLightingContribution = contribuicaoIlumPublicaRegex.exec(invoiceInfo[0]);
    if (resultpublicLightingContribution) {
      publicLightingContribution = resultpublicLightingContribution[1].split(' ')[0].replace('\n', '');
    }

    return {
      client: {
        name,
        document,
        numberClient
      },
      address: {
        street,
        number,
        district,
        city,
        state,
        cep,
      },
      invoice: {
        monthReference,
        eletricalEnergyQuantity,
        eletricalEnergyAmount,
        energySCEEEICMSQuantity,
        energySCEEEICMSAmount,
        compensatedEnergyQuantity,
        compensatedEnergyAmount,
        publicLightingContribution,
      }
    };
  }
}