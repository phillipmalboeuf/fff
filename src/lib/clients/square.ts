import { Client, Environment, ApiError } from "square"

export const square = new Client({
  bearerAuthCredentials: {
    accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  },
  environment: Environment.Production,
})