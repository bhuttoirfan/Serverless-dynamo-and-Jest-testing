export default {
  type: "object",
  properties: {
    userName: { type: 'string' },
    email: {type: 'string'},
    password: {type: 'string'}
  },
  required: ['email', 'password']
} as const;
