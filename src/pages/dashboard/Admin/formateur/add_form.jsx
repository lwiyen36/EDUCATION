import React, { useEffect, useState } from "react";
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
import { AjouterEtudiant } from "../Admin.service";

export function AddForm(props) {
    let {open , handleOpen , setAdd , matieres} = props
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [tele, setTele] = useState("");
    const [heure, setHeure] = useState("");
    const [id_matiere , setMat] = useState("");
    const [errors, setErrors] = useState({
        error1: '',
        error2: '',
        error3: '',
        error4: '',
        error5: '',
        error6: ''
    });

    useEffect(() => {
        matieres = props.matieres
    },[matieres])

    const validation = () => {
        let validate = true;
        const newErrors = {
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
            error6: '',
        };

        if (!nom) {
            newErrors.error1 = "Le champ nom est obligatoire";
            validate = false;
        }

        if (!prenom) {
            newErrors.error2 = "Le champ prénom est obligatoire";
            validate = false;
        }

        if (!email) {
            newErrors.error3 = "Le champ email est obligatoire";
            validate = false;
        }

        if (!tele) {
            newErrors.error4 = "Le champ telephone est obligatoire";
            validate = false;
        }

        if (!id_matiere) {
            newErrors.error5 = "Le champ matiere est obligatoire";
            validate = false;
        }

        if (!heure) {
            newErrors.error6 = "Le champ heure de travail est obligatoire";
            validate = false;
        }


        setErrors(newErrors);
        return validate;
    }

    const handleSelectChange = (value) => {
        setMat(value)
    }

    const Ajouter = async () => {
        const isValid = validation();
        if (isValid) {
            try {
                const confirmer = await confirmation();
                if (confirmer) {
                    const formateur = {
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        telephone: tele,
                        id_matiere:+id_matiere ,
                        heure_de_travail : heure 
                    };
                   
                    await AjouterFormateur(formateur);
                    props.setAdd(formateur);
                    swal("Bravo", "formateur ajouté avec succès.", { icon: "success" });
                    setNom('');
                    setPrenom('');
                    setHeure('') ; 
                    setMat('');
                    setTele('');
                    setEmail('');
                    setErrors({ error1: '', error2: '', error3: '', error4: '', error5: '', error6: ''});
                    props.handleOpen() ; 
                }
            } catch (error) {
                swal("Erreur", "Une erreur s'est produite lors de l'ajout d'étudiant.", { icon: "error" });
            }
        }
    }

    return (
        <Dialog open={open} size="s" handler={handleOpen}>
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="mb-1" variant="h4">
                        Nouveau formateur @{" "}
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
                    Entrer les informations qui concernent le formateur .
                </Typography>
                <div className="grid gap-6">
                      
                            <div className="mt-12 flex flex-col gap-7">
                                <div className="flex items-center gap-4">

                                  <div className="flex flex-col w-1/2">
                                    <Input label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                                    {errors.error1 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error1}</Typography>}
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <Input label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                    {errors.error2 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error2}</Typography>}
                                </div>

                                </div>
                                <div className="flex items-center gap-4">
                                <div className="flex flex-col w-1/2">
                                    <Input label="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.error3 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error3}</Typography>}
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                    <Select label="matière" color="black" className="Select Version" onChange={handleSelectChange} >
                                        {matieres.map(mat => (
                                            <Option key={mat.id} value={mat.id}>{mat.nom_matiere}</Option>
                                        ))}
                                    </Select>
                                    {errors.error5 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error5}</Typography>}
                                    </div>

                                </div>
                                <div className="flex items-center gap-4">

                                <div className="flex flex-col w-1/2">
                                    <Input label="Telephone" value={tele} type="tele" onChange={(e) => setTele(e.target.value)} />
                                    {errors.error4 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error4}</Typography>}
                               </div>


                            <div className="flex flex-col w-1/2">
                                    <Input label="heure de travail" value={heure} onChange={(e) => setHeure(e.target.value)} />
                                    {errors.error6 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error6}</Typography>}
                            </div>
                                </div>

                            </div>
                       
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" ripple={true} onClick={handleOpen}>
                    Annuler
                </Button>
                <Button variant="gradient" color="gray" ripple={true} onClick={Ajouter}>
                    Ajouter
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
