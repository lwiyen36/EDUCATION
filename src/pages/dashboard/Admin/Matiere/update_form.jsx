import React, { useState, useEffect } from "react";
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
} from "@material-tailwind/react";
import { updateMatiere } from "../Admin.service";

export function UpdateForm(props) {
  const { open, handleOpen, matiere, setUpdate } = props;
  const [nom_mt, setNom] = useState("");
  const [coefficient, setC] = useState("");
  const [errors, setErr] = useState({ error1: '', error2: '' });

  useEffect(() => {
    setNom(matiere.nom_matiere);
    setC(matiere.Coefficient);
  }, [matiere]);

  const validation = () => {
    let validate = true;
    const newErrors = { error1: '', error2: '' };
    if (!nom_mt) {
      newErrors.error1 = "Le champ nom de la matière est obligatoire";
      validate = false;
    }
    if (!coefficient) {
      newErrors.error2 = "Le champ coefficient d'étude est obligatoire";
      validate = false;
    }
    setErr(newErrors);
    return validate;
  }
  
  const Modifier = async () => {
    let test = validation();
    if (test) {
      let confirmer = await confirmation();
      if (confirmer) {
        const matiere1 = { nom_matiere: nom_mt, Coefficient: coefficient };
        updateMatiere(matiere1, matiere.id)
          .then(() => {
            swal("Bravo", "Matière modifiée avec succès.", { icon: "success" });
            setUpdate(matiere1);
            handleOpen();
          })
          .catch(() => {
            swal("Erreur", "Une erreur s'est produite lors de la modification de la matière.", { icon: "error" });
            handleOpen();
          });
      } else {
        handleOpen();
      }
    }
  }
  

  return (
    <Dialog open={open} size="xs" handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          <Typography className="mb-1" variant="h4">
            Modifier une matière @
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
          Modifier les informations qui concernent la matière.
        </Typography>
        <div className="grid gap-6">
          <Typography className="-mb-1" color="blue-gray" variant="h6">
            Informations.
          </Typography>
          <Input label="Nom de la matière" onInput={(e) => setNom(e.target.value)} value={nom_mt} />
          {errors.error1 && <Typography className="mx-2 font-bold text-red-600 text-xs">{errors.error1}</Typography>}
          <Input label="Coefficient" type="number" onInput={(e) => setC(e.target.value)} value={coefficient} />
          {errors.error2 && <Typography className="mx-2 font-bold text-red-600 text-xs">{errors.error2}</Typography>}
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" ripple={true} onClick={handleOpen}>
          Annuler
        </Button>
        <Button variant="gradient" color="gray" ripple={true} onClick={Modifier}>
          Modifier
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
