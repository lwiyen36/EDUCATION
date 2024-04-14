import React, { useState, useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip
} from "@material-tailwind/react";
import { confirmation } from "@/widgets/alert_confirmation";
import { PrepareEtudiant, deleteEtudiant, getEtudiant , getEtudiants} from "../Admin.service";
import { AddForm } from "./add_form";
import { UpdateForm } from "./update_form";



export function Etudiants() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const[groupes , setGroupes] = useState([]);
  const [etudiant , setEt] = useState({}) ; 
  const [add , setAdd] = useState({}) ; 
  const [update , setUpdate] = useState({}) ; 
  const  [del , setDel] = useState({}) ; 

  useEffect(() => {
    fetchData();
  }, [add , update , del]);

 

   const editEtudiant = async (id) => {
       await getEtudiant(id).then(data => {setEt(data.data.etudiant) ;} )
       prepare() ; 
       handleOpen2()
   }

  const fetchData = async () => {
    try {
      const response = await getEtudiants();
      setData(response.data.etudiants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpen2 = async () => {
      setOpen2(!open2);
  }
 
  const prepare = async () => {
      await PrepareEtudiant().then((data) => setGroupes(data.data.groupes))
  }

  const removeEtudiant= async (id) => {
    const confirmer = await confirmation();
    if (confirmer) {
      
        deleteEtudiant(id).then(() => {
          swal("Bravo", "Etudiant supprimée avec succès.", { icon: "success" });
          setDel(id)
        })
        .catch((err) => {
          swal("Erreur", "Une erreur s'est produite lors de la suppression d'étudiant.", "error");
        })
      }
    }
  

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="flex items-center mb-8 p-6">
          <Typography variant="h6" color="white">
            Les étudiants existants
          </Typography>
          <Button className="ml-auto flex justify-center items-center" color="white" onClick={() => { handleOpen() ;prepare()}}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
            </svg>
            Ajouter un étudiant
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[800px] table-auto">
            <thead>
              <tr>
                {["id", "Nom ", "Prenom", "date naissance", "Adresse", "nom du groupe" , "telephone" ,  "email" , "telephone du responsable" , "email du responsable" , "Options"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-9 text-center">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((et, key) => (
                <tr key={key}>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6 text-blue-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd"/>
                        </svg>
                        <Typography variant="small" color="blue-gray" className="text-center font-semibold mx-2">
                          #00{et.id}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                      {et.nom}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-center text-xs font-semibold text-blue-gray-600">
                      {et.prenom}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                      {et.date_naissance}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                      {et.Adresse}
                    </Typography>
                  </td>

                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                  <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                    {et.nom_groupe}
                  </Typography>
                </td>

                <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                  {et.Telephone}
                </Typography>
              </td>

              <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
              <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                {et.email}
              </Typography>
            </td>

            <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
            {
              et.Telephone_responsable ? <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
           
                   {et.Telephone_responsable}
              </Typography> :   <Chip
              variant="gradient"
              color="red"
              value="non disponible"
              className="py-0.5 px-2 text-[11px] font-medium w-fit"
            />
            }
            
          </td>

          <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
          {
            et.email_responsable ? <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
         
                 {et.email_responsable}
            </Typography> :   <Chip
            variant="gradient"
            color="red"
            value="non disponible"
            className="py-0.5 px-2 text-[11px] font-medium w-fit"
          />
          }
          
        </td>

          

                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <div className="flex items-center justify-center gap-3">
                      <Button ripple={true} variant="text" onClick={() => { editEtudiant(et.id) ; }}>
                        <svg className="w-6 h-6 text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clipRule="evenodd"/>
                        </svg>
                      </Button>
                      <Button ripple={true} variant="text" onClick={() => removeEtudiant(et.id)}>
                        <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <AddForm  open={open} handleOpen={handleOpen} setAdd={setAdd} groupes={groupes}/>
      <UpdateForm open={open2} handleOpen={handleOpen2} setUpdate ={setUpdate} etudiant={etudiant} groupes={groupes}  />
      
    </div>
  );
}
