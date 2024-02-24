import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const notify = (json, msg) => {
    
    if(json.hasOwnProperty('error') === true) {
      toast.error(json.error)
    }
    else {
      toast.success(msg)
    }
  }