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
        element: <Tables />,
        role : 'admin' ,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Etudiants",
        path: "/etudiants",
        element: <Tables />,
        role : 'admin' ,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Formateurs",
        path: "/formateurs",
        element: <Tables />,
        role : 'admin' ,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Matieres",
        path: "/matieres",
        element: <Tables />,
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
        role : 1 ,
      },

    ],
  },

];

export default routes;
