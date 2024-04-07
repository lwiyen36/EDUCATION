import swal from 'sweetalert';
export const confirmation= () =>  swal({
    title: "Êtes-vous sûr(e) ?",
    text: "Si vous êtes sûr(e), veuillez confirmer cette action.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
})
