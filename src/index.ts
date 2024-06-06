import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

interface Contract {
  id: string;
  url: string;
  expirationDate: Date;
  effects: string[];
}

const contracts: Contract[] = [
  {
    id: "1",
    url: "https://example.com/contract1",
    expirationDate: new Date("2024-06-07"),
    effects: ["Efeito 1", "Efeito 2"]
  },
  {
    id: "2",
    url: "https://example.com/contract2",
    expirationDate: new Date("2024-06-08"),
    effects: ["Efeito 3", "Efeito 4"]
  }
  // Adicione mais contratos conforme necessário
];

export const handler: Handler = async(event: any) => {
  console.log("Received event:", JSON.stringify(event, null, 2)); // Log para verificar o evento recebido

  // Obter a data atual
  const currentDate = new Date();

  // Filtrar contratos que vencem no dia atual ou no futuro
  const upcomingContracts = contracts.filter(contract => contract.expirationDate >= currentDate);

  // Elaborar o relatório
  const report = {
    upcomingURLs: upcomingContracts.map(contract => ({ id: contract.id, url: contract.url })),
    upcomingEffects: upcomingContracts.map(contract => ({ id: contract.id, effects: contract.effects }))
  };

  // Responder com o relatório
  const response = {
    statusCode: 200,
    body: report
  };

  return response;
};
