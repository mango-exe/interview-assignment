import axios from 'axios'

import { SERVER } from '../global/config'

const api = axios.create({
  baseURL: SERVER,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
