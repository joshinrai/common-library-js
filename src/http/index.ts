import axios, { AxiosInstance } from "axios";
import request from './request'
import response from './response'

const instance: any = axios.create();

instance.setConfig = (glocalConfig = {}) => {
  instance.prototype.glocalConfig = glocalConfig
}

request(instance)
response(instance)

export default instance
