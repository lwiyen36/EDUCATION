import { stageApi } from '@/environnement';
const token = JSON.parse(localStorage.getItem("token"));
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
};

export const getEtudiantsByFormateur = (id) => {
    return stageApi.get('/formateur/etudiants/'+id, { headers });
};
export const AjouterResultat = (data) => {
  return stageApi.post('/resultat/create',data, { headers });
};
