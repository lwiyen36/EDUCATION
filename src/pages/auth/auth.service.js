import { stageApi } from '@/environnement';
import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
  
};
export const RegisterUser =  (data) => {
  return stageApi.post('/register',data,{headers: {
        'Content-Type': 'application/json'
      }})
}
export const Login =  (data) => {
  return stageApi.post('/login',data,{headers: {
        'Content-Type': 'application/json'
      }})
  }
export const GetRole =(id)=>{
  return stageApi.get(`/GetRole/${id}`,{headers})
}  