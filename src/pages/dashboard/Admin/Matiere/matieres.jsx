import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { deleteMatiere, getMatiere, getMatieres } from "../Admin.service";
import { AddForm } from "./add_form";
import { UpdateForm } from "./update_form";
import { confirmation } from "@/widgets/alert_confirmation";

export function Matieres() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [add, setAdd] = useState({});
  const [update, setUpdate] = useState({});
  const [del, setDel] = useState({});
  const [matiere , setMat] = useState({})

  const fetchData = async () => {
    try {
      const response = await getMatieres();
      setData(response.data.matieres);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [add, update, del]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  const editMatiere = async (id) => {
    await getMatiere(id).then(data => {setMat(data.data.matiere) ;} )
    handleOpen2()
}



  const removeMatiere = async (id) => {
    const confirmer = await confirmation();
    if (confirmer) {
      
        deleteMatiere(id).then(() => {
          swal("Bravo", "Matière supprimée avec succès.", { icon: "success" });
          setDel(id)
        })
        .catch((err) => {
          swal("Erreur", "Une erreur s'est produite lors de la suppression de la matière.", "error");
        })
      }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="flex items-center mb-8 p-6"
        >
          <Typography variant="h6" color="white">
            Les matières existantes
          </Typography>
          <Button
            className="ml-auto flex justify-center items-center"
            color="white"
            onClick={handleOpen}
          >
          <svg className="w-6 h-6 text-gray-800 dark:text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
        </svg>
            Ajouter une matière
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["id", "nom de la matières", "coefficient", "options"].map(
                  (el, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((mat, index) => (
                <tr key={index}>
                  <td className={`py-3 px-5 ${index === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                  <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6 text-blue-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd"/>
                    </svg>
                    <Typography variant="small" color="blue-gray" className="text-center font-semibold mx-4">
                      #00{mat.id}
                    </Typography>
                  </div>
                </div>
                  </td>

                  <td className={`py-3 px-5 ${index === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                      {mat.nom_matiere}
                    </Typography>
                  </td>

                  <td className={`py-3 px-5 ${index === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                      {mat.Coefficient}
                    </Typography>
                  </td>

                  <td className={`py-3 px-5 ${index === data.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <div className="flex items-center justify-center gap-3">
                      <Button ripple={true} variant="text" onClick={() => editMatiere(mat.id)}>
                        <svg className="w-6 h-6 text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clipRule="evenodd"/>
                        </svg>
                      </Button>
                      <Button ripple={true} variant="text" onClick={() => removeMatiere(mat.id)}>
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
      <AddForm open={open} handleOpen={handleOpen} setAdd={setAdd} />
      <UpdateForm  open={open2} matiere={matiere} handleOpen={handleOpen2} setUpdate={setUpdate}/>
    </div>
  );
}

export default Matieres;
