import { toast } from 'react-toastify';
toast.configure()

const Toast = {
    success : message => (
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
          })
    ),
    failed : message => (
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
          })
    ),
    info : (message) => (
        toast.info(message, {
            position: toast.POSITION.RIGHT_CENTER
          })
    )
}

export default Toast
