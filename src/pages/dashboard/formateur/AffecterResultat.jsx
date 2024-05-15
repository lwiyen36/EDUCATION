import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { confirmation } from "@/widgets/alert_confirmation";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Textarea,
  Select,
  Option,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { AjouterResultat } from "./formateur.service";
function AffecterResultat(props) {
    const {open , handleOpen , data} = props
    const [resultat,setresult]=useState({
        id_etudiant:0,id_matiere:JSON.parse(localStorage.getItem('user'))?.id,note_controle:'',note_exam:'',date_controle:'',date_exam:''
    })
    const handleSelectChange = (value) => {
        setresult(prev=>{
            return {...prev,id_etudiant:value}
        })
    }
    function ajouter(){
        
        console.log(resultat);
        AjouterResultat(resultat).then((data)=>{
            handleOpen()
            swal("Bravo", "resultat ajouté avec succès.", { icon: "success" });
        }).catch((err)=>{
            swal("Erreur", "Une erreur s'est produite lors de l'ajout de resultat.", { icon: "error" });
        })
    }
  return (
    <div>
         <Dialog open={open} size="s" handler={handleOpen}>
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="mb-1" variant="h4">
                        Nouveau Resultat @{" "}
                    </Typography>
                </DialogHeader>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-3 h-5 w-5"
                    onClick={handleOpen}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <DialogBody>
                <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
                    les informations qui concernent la resultat d'étudiant .
                </Typography>
                <div className="grid gap-6">
                    <div className="flex flex-col">
                    <label htmlFor="">Choisir Un Etudiant :</label>
                           <Select name="etudiant" onChange={handleSelectChange}>
                            {
                                data && data.map((item)=>{
                                    return <Option key={item.id} value={item.id}>{item.nom}</Option>
                                })
                            }
                           </Select>
                    </div>
                    <div className="flex gap-2">
                    <div className="flex flex-col w-1/2">
                           <Input required onChange={(e)=>{
                            setresult(prev=>{
                                return{...prev,note_controle:e.target.value}
                            })
                           }} type="text" maxLength={5} label="Note Controle"/>
                    </div>
                    <div className="flex flex-col w-1/2">
                        
                           <Input required onChange={(e)=>{
                            setresult(prev=>{
                                return{...prev,date_controle:e.target.value}
                            })
                           }} type="date" label="Date Controle"/>
                    </div>
                    </div>
                    <div className="flex gap-2">
                    <div className="flex flex-col w-1/2">
                        
                           <Input required onChange={(e)=>{
                            setresult(prev=>{
                                return{...prev,note_exam:e.target.value}
                            })
                           }} type="text" maxLength={5} label="Note Exam"/>
                    </div>
                    <div className="flex flex-col w-1/2">
                        
                           <Input required onChange={(e)=>{
                            setresult(prev=>{
                                return{...prev,date_exam:e.target.value}
                            })
                           }} type="date" label="Date Exam"/>
                    </div>
                    </div>



                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" ripple={true} >
                    Annuler
                </Button>
                <Button onClick={ajouter} variant="gradient" color="gray" ripple={true} >
                    Ajouter
                </Button>
            </DialogFooter>
        </Dialog>
    </div>
  )
}

export default AffecterResultat