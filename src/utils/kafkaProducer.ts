import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "payment-gateway",
  brokers: ["localhost:9092"],
  retry: {
    retries: 10,
    initialRetryTime: 300,
    multiplier: 2,
  },
});

const producer = kafka.producer();

export const sendMessage = async (topic: string, message: any) => {
  try {
    // Conecte o produtor antes de enviar
    await producer.connect();

    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });

    console.log(`Mensagem enviada para o tópico ${topic}`);
  } catch (error) {
    console.error("Erro ao enviar mensagem para o Kafka:", error);
    throw error; // Lança o erro para manipular em outro lugar
  } finally {
    // Opcional: Desconecte após enviar a mensagem
    await producer.disconnect();
  }
};
