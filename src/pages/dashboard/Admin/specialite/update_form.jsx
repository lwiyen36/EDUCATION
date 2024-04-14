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
  Textarea,
} from "@material-tailwind/react";
import { updateSpecialite } from "../Admin.service";

export function UpdateForm(props) {
    const { open, handleOpen, specialite } = props; 
    const [nom_sp, setNom] = useState("");
    const [description, setDescrip] = useState("");
    const [duree, setDuree] = useState("");
    const [errors, setErr] = useState({ error1: '', error2: '' });

    useEffect(() => {
        setNom(specialite.nom_specialite );
        setDescrip(specialite.description);
        setDuree(specialite.duree_etude);
    }, [specialite]);


    const validation = () => {
        let validate = true;
        const newErrors = { error1: '', error2: '' };
        if (!nom_sp) {
            newErrors.error1 = "Le champ nom de la spécialité est obligatoire";
            validate = false;
        }
        if (!duree) {
            newErrors.error2 = "Le champ durée d'étude est obligatoire";
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
                const specialite1 = { nom_specialite: nom_sp, description: description, duree_etude: duree };
                updateSpecialite(specialite1, specialite.id)
                    .then(() => {
                        swal("Bravo", "Spécialité modifiée avec succès.", { icon: "success" });
                        props.setUpdate(specialite1)
                        handleOpen();
                    })
                    .catch(() => {
                        swal("Erreur", "Une erreur s'est produite lors de la modification de la spécialité.", { icon: "error" });
                        handleOpen();
                    });
            } else {
                handleOpen();
            }
        } else {
            swal("Erreur", "Veuillez remplir tous les champs obligatoires.", { icon: "error" });
            handleOpen();
        }
    
        setErr({ error1: '', error2: '' });
    }
    
  
  

    return (
        <Dialog open={open} size="xs" handler={handleOpen}>
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    {" "}
                    <Typography className="mb-1" variant="h4">
                        Modifier une spécialité @{" "}
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
                    Modifier les informations qui concernent la spécialité.
                </Typography>
                <div className="grid gap-6">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                        Informations.
                    </Typography>
                    <Input label="Nom de la spécialité" onInput={(e) => setNom(e.target.value)} value={nom_sp} />
                    {errors.error1 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error1}</Typography>}
                    <Input label="Durée d'étude" type="number" onInput={(e) => setDuree(e.target.value)} value={duree} />
                    {errors.error2 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error2}</Typography>}
                    <Textarea label="Description (optionnel)" onInput={(e) => setDescrip(e.target.value)} value={description} />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" ripple ={true}  onClick={props.handleOpen}>
                    Annuler
                </Button>
                <Button variant="gradient" color="gray" ripple ={true} onClick={() => Modifier()}>
                    Modifier
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
