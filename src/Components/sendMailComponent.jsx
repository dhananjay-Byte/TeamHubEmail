import React,{useState} from 'react'
import { IoMdAdd } from "react-icons/io";
import SendMailForm from './mailForm';
function SendMailComponent() {
    const [toggleMail, setToggleMail] = useState(false);
    const toggleMailButton = () => setToggleMail(!toggleMail);
  return (
    <div className='flex items-center justify-center'>
          <div className=" border shadow-sm shadow-slate-400 rounded-lg p-2 ">
          <button onClick={toggleMailButton} className='text-black text-2xl flex items-center gap-2 justify-center'><IoMdAdd/> Compose </button>
            </div>
        {
            toggleMail && (
                <Modal>
                    <SendMailForm toggleButton={toggleMailButton}/>
                </Modal>
            )
        }
    </div>
  )
}

const Modal = ({ children }) => (
    <div className="fixed inset-0  bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        {children}
    </div>
);

export default SendMailComponent