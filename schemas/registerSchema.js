export const registerSchema = {
  username: { type: String, required: true, maxLength: 100 },
  hash: { type: String, required: true, maxLength: 500 },
};
