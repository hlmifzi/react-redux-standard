import swal from 'sweetalert2';

const Swal = {
    success : () => (
        swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Anda Berhasil Login!',
            showConfirmButton: false,
            timer: 1800
          })
    ),
    failed : () => (
        swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Wrong Password !',
          })
    )
}

export default Swal
