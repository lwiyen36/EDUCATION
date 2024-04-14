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
  Typography ,
  Textarea,
} from "@material-tailwind/react";
import { AjouterMatiere } from "../Admin.service";

export function AddForm(props) {
    let [nom_mt , setNom] = useState("") ;
    let [coefficient , setC] = useState("") ;
    let [errors , setErr] = useState({error1 : '' , error2 : ''}) ;

    const validation = () => {
      let validate = true;
      const newErrors = { error1: '', error2: '' };
      if (!nom_mt) {
          newErrors.error1 = "Le champ nom de la matère est obligatoire";
          validate = false;
      }
      if (!coefficient) {
          newErrors.error2 = "Le champ coefficient d'étude est obligatoire";
          validate = false;
      }
      setErr(newErrors);
      return validate;
  }

     const Ajouter = async () => {
      let validate = validation()
           if(validate) {
           let confirmer = confirmation();
            if (confirmer) {
                try {
                    const matiere = {nom_matiere: nom_mt, Coefficient : coefficient};
                    AjouterMatiere(matiere).then(() =>  {swal("Bravo", "Matière ajoutée avec succès.", { icon: "success" })} ).catch(() =>  {swal("Erreur", "Une erreur s'est produite lors de l'ajout de la matière.", { icon: "error" })}) ;
                    props.setAdd(matiere)
                    setNom('');
                    setC('');
                    props.setAdd(response);
                    props.handleOpen();
                } catch (error) {
                    console.error("Une erreur s'est produite lors de l'ajout de la matière :", error);

                }
            } 
            setErr({error1 : '', error2 : ''})
          }
        

       
    }


  return (
    <Dialog open={props.open} size="xs" handler={props.handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            Nouvelle spécialité @{" "}
          </Typography>
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5"
          onClick={props.handleOpen}
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
          Entrer les informations qui concerne la matière.
        </Typography>
        <div className="grid gap-6">
          <Typography className="-mb-1" color="blue-gray" variant="h6">
            Informations.
          </Typography>
          <Input label="Nom de la matière" onInput={(e) => setNom(e.target.value)} />
          {errors.error1 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error1}</Typography>}
          <Input label="Coefficient" type="number" onInput={(e) => setC(e.target.value)} />
          {errors.error2 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error2}</Typography>}
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" ripple ={true}  onClick={props.handleOpen}>
          Annuler
        </Button>
        <Button variant="gradient" color="gray" ripple ={true} onClick={() => Ajouter()}>
         Ajouter
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
