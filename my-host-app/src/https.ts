import { HttpClientService } from "./interceptor-library";
import axios from 'axios'
const client = new HttpClientService({ axios});

export const http = client.createHttpInstance({
  baseURL: "http://localhost:3000/"
});