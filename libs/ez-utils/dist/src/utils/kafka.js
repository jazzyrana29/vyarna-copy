"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTraceId = exports.encodeKafkaMessage = exports.decodeKafkaMessage = void 0;
const decodeKafkaMessage = (message) => {
    try {
        const key = Buffer.from(message.key || "").toString("utf-8");
        const value = JSON.parse(Buffer.from(message.value || "").toString("utf-8"));
        const { traceId, ...rest } = value;
        return { key, value: rest, traceId };
    }
    catch (error) {
        console.log("error in decoding => ", error);
    }
};
exports.decodeKafkaMessage = decodeKafkaMessage;
const encodeKafkaMessage = (className, value, key) => ({
    key: key || `${className}-${Date.now()}-${Math.random()}`,
    value: JSON.stringify(value),
});
exports.encodeKafkaMessage = encodeKafkaMessage;
const generateTraceId = (profile) => `${profile}-${Date.now()}-${Math.random()}`;
exports.generateTraceId = generateTraceId;
//# sourceMappingURL=kafka.js.map