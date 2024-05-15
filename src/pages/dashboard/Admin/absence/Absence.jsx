import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip
} from "@material-tailwind/react";
import { getDataAbsences } from '../Admin.service';
import { AddForm } from './AddForm';
function Absence() {
    const [data, setData] = useState({
      absences: [],
      matieres:[],
      etudiants:[]
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(!open);
    };
    const [add , setAdd] = useState({}) ; 
    function GetData(){
        getDataAbsences().then((res)=>{
            setData(prev=>{
              return {matieres:res.data.matieres,absences:res.data.absences,etudiants:res.data.etudiants}
            })
        })
    }
    useEffect(()=>{
        GetData()
    },[])
  return (
    <div className='mt-12 mb-8 flex flex-col gap-12'>
        <Card>
        <CardHeader variant="gradient" color="gray" className="flex items-center mb-8 p-6">
          <Typography variant="h6" color="white">
            Absences
          </Typography>
          <Button className="ml-auto flex justify-center items-center" color="white" onClick={() => { handleOpen() ;}}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
            </svg>
            Ajouter un Absence
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[800px] table-auto">
            <thead>
              <tr>
                {["id", "Nom Etudiant", "Nom Matiere", "date absence",  "justification"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-9 text-center">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.absences.map((et, key) => (
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
                      {et.id_etudiant}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-center text-xs font-semibold text-blue-gray-600">
                      {et.id_matiere}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                      {et.date_absence}
                    </Typography>
                  </td>
                  {
                    et.justifie?(
                      <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                      {et.justification}
                    </Typography>
                  </td>
                    ):(
                      <td className={`py-3 px-5 ${key === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 text-center">
                      Aucun Justification
                    </Typography>
                  </td>
                    )
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <AddForm open={open} handleOpen={handleOpen} setAdd={setAdd} matieres={data.matieres} etudiants={data.etudiants}/>
    </div>
  )
}

export default Absence