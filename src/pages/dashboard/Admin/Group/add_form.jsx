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
  Option
} from "@material-tailwind/react";
import { AjouterGroupe } from "../Admin.service";

export function AddForm(props) {
    let [nom_gp, setNom] = useState("") ;
    let [niveau , setNiveau] = useState("") ;
    let [annee ,setAnnee] = useState("") ;
    let [id_sp , setId_sp] = useState("");
    let [nom_specialite, setNomSpecialite] = useState("");
    let [errors , setErr] = useState({error1 : '' , error2 : '' , error3 : '' , error4 : ''}) ;

    const validation = () => {
        let validate = true;
        const newErrors = { error1: '', error2: '', error3: '', error4: '' };
    
        if (!nom_gp) {
            newErrors.error1 = "Le champ nom du groupe est obligatoire";
            validate = false;
        }
    
        if (!niveau) {
            newErrors.error2 = "Le champ niveau est obligatoire";
            validate = false;
        }
    
        if (!annee) {
            newErrors.error3 = "Le champ année scolaire est obligatoire";
            validate = false;
        }
    
        if (!id_sp) {
            newErrors.error4 = "Le champ nom de la spécialité est obligatoire";
            validate = false;
        }
    
        setErr(newErrors);
        return validate;
    }

    const handleSelectChange = (value) => {
        setId_sp(value);  
        }
    

    const Ajouter = async () => {
        const test = validation();

        if (test) {
            try {
                const confirmer = await confirmation();

                if (confirmer) {
                    const groupe = {
                        nom_groupe: nom_gp,
                        niveau: niveau,
                        annee_scolaire: annee,
                        id_specialite: id_sp
                    };

                    await AjouterGroupe(groupe);
                    props.setAdd(groupe)
                    swal("Bravo", "Groupe ajouté avec succès.", { icon: "success" });
                    setNom('');
                    setAnnee('');
                    setNiveau('');
                    setId_sp('');
                    setNomSpecialite('');
                    setErr({ error1: '', error2: '', error3: '', error4: '' });
                    
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout du groupe:", error);
                swal("Erreur", "Une erreur s'est produite lors de l'ajout du groupe.", { icon: "error" });
            }
        }
    }

    return (
        <Dialog open={props.open} size="s" handler={props.handleOpen}>
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="mb-1" variant="h4">
                        Nouveau groupe @{" "}
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
                    Entrer les informations qui concerne le groupe.
                </Typography>
                <div className="grid gap-6">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                        Informations.
                    </Typography>
                    <Input label="Nom du groupe" onInput={(e) => setNom(e.target.value)} />
                    {errors.error1 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error1}</Typography>}
                    <Input label="Niveau" type="text" onInput={(e) => setNiveau(e.target.value)} />
                    {errors.error2 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error2}</Typography>}
                    <Input label="Année scolaire" type="number" min="1990" max="2050" onInput={(e) => setAnnee(parseInt(e.target.value))} />
                    {errors.error3 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error3}</Typography>}
                    <Select label="Nom de la spécialité" color="black" className="Select Version" onChange={handleSelectChange} value={nom_specialite}>
                        {props.specialites.map(sp => (
                            <Option key={sp.id} value={sp.id}>{sp.nom_specialite}</Option>
                        ))}
                    </Select>
                    {errors.error4 && <Typography className="mx-2 font-bold text-red-600 text-xs" >{errors.error4}</Typography>}
                    
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" ripple={true} onClick={props.handleOpen}>
                    Annuler
                </Button>
                <Button variant="gradient" color="gray" ripple={true} onClick={Ajouter}>
                    Ajouter
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
