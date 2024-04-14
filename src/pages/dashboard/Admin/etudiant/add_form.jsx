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
import { AjouterEtudiant } from "../Admin.service";

export function AddForm(props) {
    const {open , handleOpen , setAdd , groupes} = props
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [date_n, setDate] = useState("");
    const [adresse, setAdresse] = useState("");
    const [id_groupe, setId_gr] = useState("");
    const [tele, setTele] = useState("");
    const [email, setEmail] = useState("");
    const [teleRes, setTeleR] = useState("");
    const [emailRes, setEmailR] = useState("");
    const [type, setType] = useState("informations");
    const [errors, setErrors] = useState({
        error1: '',
        error2: '',
        error3: '',
        error4: '',
        error5: '',
        error6: '',
        error7: ''
    });

    const validation = () => {
        let validate = true;
        const newErrors = {
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
            error6: '',
            error7: ''
        };

        if (!nom) {
            newErrors.error1 = "Le champ nom est obligatoire";
            validate = false;
        }

        if (!prenom) {
            newErrors.error2 = "Le champ prénom est obligatoire";
            validate = false;
        }

        if (!date_n) {
            newErrors.error3 = "Le champ date de naissance est obligatoire";
            validate = false;
        }

        if (!adresse) {
            newErrors.error4 = "Le champ adresse est obligatoire";
            validate = false;
        }

        if (!id_groupe) {
            newErrors.error5 = "Le champ groupe est obligatoire";
            validate = false;
        }

        if (!tele) {
            newErrors.error6 = "Le champ téléphone est obligatoire";
            validate = false;
        }

        if (!email) {
            newErrors.error7 = "Le champ email est obligatoire";
            validate = false;
        }

        setErrors(newErrors);
        return validate;
    }

    const handleSelectChange = (value) => {
        setId_gr(value)
    }

    const Ajouter = async () => {
        const isValid = validation();
        if (isValid) {
            try {
                const confirmer = await confirmation();
                if (confirmer) {
                    const etudiant = {
                        nom: nom,
                        prenom: prenom,
                        date_naissance: date_n,
                        Adresse: adresse,
                        id_groupe:+id_groupe ,
                        Telephone: tele,
                        email: email,
                        Telephone_responsable: teleRes,
                        email_responsable: emailRes
                    };
                    console.log(etudiant);
                    await AjouterEtudiant(etudiant);
                    props.setAdd(etudiant);
                    swal("Bravo", "étudiant ajouté avec succès.", { icon: "success" });
                    setNom('');
                    setPrenom('');
                    setDate('');
                    setAdresse('');
                    setId_gr('');
                    setTele('');
                    setEmail('');
                    setTeleR('');
                    setEmailR('');
                    setErrors({ error1: '', error2: '', error3: '', error4: '', error5: '', error6: '', error7: '' });
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
                        Nouveau étudiant @{" "}
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
                    Entrer les informations qui concernent l'étudiant .
                </Typography>
                <div className="grid gap-6">
                    <Tabs value={type} className="overflow-visible">
                        <TabsHeader className="relative z-0 ">
                            <Tab value="informations" onClick={() => setType("informations")}>
                                Informations
                            </Tab>
                            <Tab value="contact" onClick={() => setType("contact")}>
                                Contact
                            </Tab>
                        </TabsHeader>
                        <TabsBody className="!overflow-x-hidden !overflow-y-visible">
                            <TabPanel value="informations" className="p-0">
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
                                    <Input label="Date de naissance" type="date" value={date_n} onChange={(e) => setDate(e.target.value)} />
                                    {errors.error3 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error3}</Typography>}
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                    <Select label="Groupe" color="black" className="Select Version" onChange={handleSelectChange}  >
                                    
                                    {groupes.map(gp => (
                                        <Option key={gp.id} value={gp.id}>{gp.nom_groupe}</Option>
                                    ))}
                                    </Select>
                                    {errors.error5 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error5}</Typography>}
                                    </div>

                                </div>
                                <div className="flex items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <Textarea label="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                                    {errors.error4 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error4}</Typography>}
                                </div>
                                </div>

                            </div>
                            </TabPanel>
                            <TabPanel value="contact" className="p-0">
                            <div className="mt-12 flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                            <div className="flex flex-col w-1/2">
                                   <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                   {errors.error7 && <Typography className="mx-2  mt-2 font-bold text-red-600 text-xs">{errors.error7}</Typography>}
                            </div>
                            <div className="flex flex-col w-1/2">
                                   <Input label="Telephone" type="tele" value={tele} onChange={(e) => setTele(e.target.value)} />
                                   {errors.error6 && <Typography className="mx-2 mt-2 font-bold text-red-600 text-xs">{errors.error6}</Typography>}
                            </div>
                            </div>

                            <div className="flex items-center gap-4">
                                   <Input label="Email du responsable (optionnel)" type="email" value={emailRes} onChange={(e) => setEmailR(e.target.value)} />
                                   <Input label="Telephone du responsable (optionnel)" type="tele" value={teleRes} onChange={(e) => setTeleR(e.target.value)} />
                            </div>
                            </div>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
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
