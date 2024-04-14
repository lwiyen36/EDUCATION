import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { Specialite } from "./pages/dashboard/Admin/specialite/specialite";
import { Groupe } from "./pages/dashboard/Admin/Group/groupes";
import { Etudiants } from "./pages/dashboard/Admin/etudiant/etudiants";
import { Matieres } from "./pages/dashboard/Admin/Matiere/matieres";
import { Formateurs } from "./pages/dashboard/Admin/formateur/formateur";



const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,

      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Specialités",
        path: "/specialites",
        element: <Specialite/>,
        role : 'admin' ,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Groupes",
        path: "/groupes",
        element: <Groupe />,
        role : 'admin' ,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Etudiants",
        path: "/etudiants",
        element: <Etudiants />,
        role : 'admin' ,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Matieres",
        path: "/matieres",
        element: <Matieres />,
        role : 'admin' ,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Formateurs",
        path: "/formateurs",
        element: <Formateurs />,
        role : 'admin' ,
      },
      

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Resultats",
        path: "/resultats",
        element: <Tables />,
        role : 'formateur' ,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Absences",
        path: "/absences",
        element: <Tables />,
        role : 'admin' ,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Emplois du temps",
        path: "/emploisTemps",
        element: <Tables />,
        role : 'admin' ,
      },

    ],
  },

];

export default routes;
