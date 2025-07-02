import { KafkaMessage } from "../types/kafka";

export const decodeKafkaMessage = (message: any): KafkaMessage => {
  try {
    const key = Buffer.from(message.key || "").toString("utf-8");
    const value = JSON.parse(
      Buffer.from(message.value || "").toString("utf-8"),
    );
    const { traceId, ...rest } = value;
    return { key, value: rest, traceId };
  } catch (error) {
    console.log("error in decoding => ", error);
  }
};

export const encodeKafkaMessage = (
  className: string,
  value: KafkaMessage,
  key?: string,
): { value: string; key: string } => ({
  key: key || `${className}-${Date.now()}-${Math.random()}`,
  value: JSON.stringify(value),
});

export const generateTraceId = (profile: string): string =>
  `${profile}-${Date.now()}-${Math.random()}`;
