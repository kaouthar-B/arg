import Index from 'views/Index';
import AccueilAdmin from 'views/examples/AccueilAdmin';
import AccueilHost from 'views/examples/AccueilHost';
import AjoutPlanClassification from 'views/examples/AjoutPlanClassification';
import AjoutNouvelleAgence from 'views/examples/AjoutNouvelleAgence';
import AjoutNouvelleCategorie from 'views/examples/AjoutNouvelleCategorie';
import AjoutSiteArchivage from 'views/examples/AjoutSiteArchivage';
import AjoutConteneur from 'views/examples/AjoutConteneur';
import AjoutArchive from 'views/examples/AjoutArchive';
import HomePage from 'views/examples/HomePage';
import Login from 'views/examples/Login';
import NotificationBox from 'views/examples/Messagerie';
import Profile from 'views/examples/Profile';
import Register from 'views/examples/Register';
import Conteneur from 'views/examples/Conteneur';
import TableUtilisateur from 'views/examples/TableUtilisateur';
import Archive from 'views/examples/Archive';
import SiteArchivage from 'views/examples/SiteArchivage';
import UpdateArchive from 'views/examples/UpdateArchive';
import UpdateSiteArchivage from 'views/examples/UpdateSiteArchivage';
import UpdateConteneur from 'views/examples/UpdateConteneur';
import UpdatePlanClassification from 'views/examples/UpdatePlanClassification';
import UpdateUtilisateurForm from 'views/examples/UpdateUtilisateurForm';
import Historique from  'views/examples/Historique';
import PlanClassification from  'views/examples/PlanClassification';
import RecherchePlanClassification from  'views/examples/RecherchePlanClassification';
import RechercheSiteArchivage from  'views/examples/RechercheSiteArchivage';
import RechercheArchive from  'views/examples/RechercheArchive';
import Habilitation from  'views/examples/Habilitation';
import StatistiquesSite from  'views/examples/StatistiquesSite';
import ArchivesSite from  'views/examples/ArchivesSite';
const routes = [
  {
    path: "/index",
    name: "Tableau De bord",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/Historique",
    name: "Historique",
    icon: "ni ni-book-bookmark text-orange",
    component: <Historique />,
    layout: "/admin",
  },
  {
    
    path: "/PlanClassification",
    name: "Plan de Classification",
    icon: "ni ni-book-bookmark text-orange",
    component: <PlanClassification />,
    layout: "/admin",
  },
  {
    path: "/NotificationBox",
    name: "Boite Messagerie",
    icon: "ni ni-bell-55 text-yellow",
    component: <NotificationBox />,
    layout: "/admin",
  },
  {
    path: "/AccueilAdmin",
    name: "Accueil",
    icon: "ni ni-building text-info",
    component: <AccueilAdmin />,
    layout: "/admin",
  },
  {
    path: "/AccueilHost",
    name: "Accueil",
    icon: "ni ni-building text-info",
    component: <AccueilHost />,
    layout: "/admin",
  },
  {
    path: "/SiteArchivage",
    name: "Sites d'archivage",
    icon: "ni ni-money-coins text-green",
    component: <SiteArchivage />,
    layout: "/admin",
  },
  {
    path: "/TableUtilisateur",
    name: "Liste des utilisateurs",
    icon: "ni ni-single-02 text-red",
    component: <TableUtilisateur />,
    layout: "/admin",
  },
  {
    path: "/Archive",
    name: "Liste des archives",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Archive />,
    layout: "/admin",
  },
  {
    path: "/Conteneur",
    name: "Liste des conteneurs",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Conteneur />,
    layout: "/admin",
  },
  // Excluded routes
  {
    path: "/HomePage",
    name: "HomePage",
    icon: "ni ni-single-02 text-yellowe",
    component: <HomePage />,
    layout: "/admin",
  },
  {
    path: "/Profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/admin",
  },
  {
    path: "/updateutilisateurform/:id",
    name: "UpdateUtilisateurForm",
    icon: "ni ni-single-02 text-red",
    component: <UpdateUtilisateurForm />,
    layout: "/admin",
  },
  {
    path: "/AjoutArchive",
    name: "AjoutArchive",
    icon: "ni ni-fat-add text-success",
    component: <AjoutArchive />,
    layout: "/admin",
  },
  {
    path: "/AjoutSiteArchivage",
    name: "AjoutSiteArchivage",
    icon: "ni ni-fat-add text-success",
    component: <AjoutSiteArchivage />,
    layout: "/admin",
  },
  {
      path: "/AjoutConteneur",
      name: "AjoutConteneur",
      icon: "ni ni-fat-add text-success",
      component: <AjoutConteneur />,
      layout: "/admin",
    },
    {
          path: "/AjoutPlanClassification",
          name: "AjoutPlanClassification",
          icon: "ni ni-fat-add text-success",
          component: <AjoutPlanClassification />,
          layout: "/admin",
        },
    {
              path: "/AjoutNouvelleAgence",
              name: "AjoutNouvelleAgence",
              icon: "ni ni-fat-add text-success",
              component: <AjoutNouvelleAgence />,
              layout: "/admin",
            },
{
              path: "/AjoutNouvelleCategorie",
              name: "AjoutNouvelleCategorie",
              icon: "ni ni-fat-add text-success",
              component: <AjoutNouvelleCategorie />,
              layout: "/admin",
            },
  {
    path: "/UpdateArchive/:id",
    name: "UpdateArchive",
    icon: "ni ni-ruler-pencil text-warning",
    component: <UpdateArchive />,
    layout: "/admin",
  },
  {
    path: "/UpdateSiteArchivage",
    name: "UpdateSiteArchivage",
    icon: "ni ni-ruler-pencil text-warning",
    component: <UpdateSiteArchivage />,
    layout: "/admin",
  },
  {
      path: "/UpdateConteneur",
      name: "UpdateConteneur",
      icon: "ni ni-ruler-pencil text-warning",
      component: <UpdateConteneur />,
      layout: "/admin",
    },
    {
          path: "/UpdatePlanClassification",
          name: "UpdatePlanClassification",
          icon: "ni ni-ruler-pencil text-warning",
          component: <UpdatePlanClassification />,
          layout: "/admin",
        },
    {
          path: "/RecherchePlanClassification",
          name: "RecherchePlanClassification",
          icon: "ni ni-ruler-pencil text-warning",
          component: <RecherchePlanClassification />,
          layout: "/admin",
        },
    {
          path: "/RechercheArchive",
          name: "RechercheArchive",
          icon: "ni ni-ruler-pencil text-warning",
          component: <RechercheArchive />,
          layout: "/admin",
        },
    {
          path: "/RechercheSiteArchivage",
          name: "RechercheSiteArchivage",
          icon: "ni ni-ruler-pencil text-warning",
          component: <RechercheSiteArchivage />,
          layout: "/admin",
        },
 {
       path: "/Habilitation",
       name: "Habilitation",
       icon: "ni ni-ruler-pencil text-warning",
       component: <Habilitation />,
       layout: "/admin",
     },
     {
            path: "/StatistiquesSite",
            name: "StatistiquesSite",
            icon: "ni ni-ruler-pencil text-warning",
            component: <StatistiquesSite />,
            layout: "/admin",
          },
{
            path: "/ArchivesSite",
            name: "ArchivesSite",
            icon: "ni ni-ruler-pencil text-warning",
            component: <ArchivesSite />,
            layout: "/admin",
          },
];

export default routes;
