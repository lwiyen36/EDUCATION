import { stageApi } from '@/environnement';
const token = JSON.parse(localStorage.getItem("token"));
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
};

export const getSpecialites = () => {
    return stageApi.get('/specialite/all', { headers });
};

export const AjouterSpecialite = (specialite) => {
    return stageApi.post('/specialite/create', specialite, { headers });
};

export const getSpecialite = (id) => {
    return stageApi.get(`/specialite/edit/${id}`, { headers });
};

export const updateSpecialite = (specialite , id) => {
       return stageApi.put(`/specialite/update/${id}`, specialite ,  { headers });
}

export const deleteSpecialite = (id) => {
    return stageApi.delete(`/specialite/destroy/${id}` , { headers });
}

export const getGroupes = () => {
    return stageApi.get('/groupe/all', { headers });
};

export const AjouterGroupe = (groupe) => {
    return stageApi.post('/groupe/create', groupe, { headers });
};

export const PrepareGroupe = () => {
    return stageApi.get('/groupe/prepare' , { headers });
}


export const getGroupe = (id) => {
    return stageApi.get(`/groupe/edit/${id}`, { headers });
};


export const updateGroupe = (groupe , id) => {
     return stageApi.put(`/groupe/update/${id}` , groupe , { headers });
}

export const deleteGroupe = (id) => {
    return stageApi.delete(`/groupe/destroy/${id}`, { headers}) ; 
}

export const getEtudiants = () => {
    return stageApi.get('/etudiant/all', { headers }) ;
}

export const AjouterEtudiant = (etudiant) => {
   return stageApi.post('/etudiant/create' , etudiant , {headers})
}

export const getEtudiant = (id) => {
    return stageApi.get(`/etudiant/edit/${id}`, { headers });
}

export const PrepareEtudiant = () => {
    return stageApi.get('/etudiant/prepare' , { headers });
}

export const updateEtudiant = (etudiant , id) => {
    return stageApi.put(`/etudiant/update/${id}` , etudiant , { headers });
}

export const deleteEtudiant = (id) => { 
    return stageApi.delete(`/etudiant/destroy/${id}` , { headers});
}
export const getMatieres = () => {
    return stageApi.get(`/matiere/all` , { headers});
}

export const AjouterMatiere = (matiere) => {
    return stageApi.post('/matiere/create' , matiere , {headers})
}
export const getMatiere = (id) => {
    return stageApi.get(`/matiere/edit/${id}`, { headers });
}
export const updateMatiere = (matiere , id) => {

    return stageApi.put(`/matiere/update/${id}` , matiere , { headers });
}
export const deleteMatiere = (id) => { 
    return stageApi.delete(`/matiere/destroy/${id}` , { headers});
}

export const getFormateurs = () => {
    return stageApi.get(`/formateur/all` , { headers});
}

export const PrepareFormateur = () => {
    return stageApi.get(`/formateur/prepare` , { headers});
}

