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
import { getEtudiantsByFormateur } from "./formateur.service";
import AffecterResultat from "./AffecterResultat";

function ListEtu() {
    const [data,setData]=useState([])
    const [etudiant,setetu]=useState('')
    const [open,setOpen]=useState('')

    const handleOpen = () => {
      setOpen(!open);
    };
    function getData(){
        const userId = JSON.parse(localStorage.getItem('user'))?.id
        getEtudiantsByFormateur(userId).then((res)=>{
            setData(res.data.etudiants)
        }).catch((err)=>{
          console.log(err);
        })
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
        <CardHeader variant="gradient" color="gray" className="flex items-center mb-8 p-6">
          <Typography variant="h6" color="white">
            Les étudiants existants
          </Typography>
          <Button className="ml-auto flex justify-center items-center" color="white" onClick={()=>{
            handleOpen()
          }}>
            Affecter le Resultat
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[800px] table-auto">
            <thead>
              <tr>
                {["id", "Nom ", "Prenom", "date naissance", "Adresse", "nom du groupe" , "telephone" ,  "email" , "telephone du responsable" , "email du responsable"].map((el) => (
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
                    {et.id_groupe}
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
              </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <AffecterResultat  open={open} handleOpen={handleOpen} data={data} />
    </div>
  )
}

export default ListEtu