import { stageApi } from '@/environnement';
const token = JSON.parse(localStorage.getItem("token"));
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
  
};

export const getSpecialite = () => {
      return stageApi.get(`/specialite/all`,{ headers });
  };
export const AjouterSpecialite = (specialite) => {
  
  return stageApi.post('/specialite/create', specialite , { headers })
}

