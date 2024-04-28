import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { niftarimActions } from '../../store/niftarim';
import { useDispatch } from 'react-redux';
import { deleteFromFirestore } from '../../db/firebase';

const SwalAlert = ({item}) => {

  const dispatch = useDispatch();

  const showAlert = () => {
    Swal.fire({
        title: `האם למחוק את השם ${item.getFullName()} 
        ?מהמאגר`,
        text: "כל המידע על שם זה ימחק מהמאגר",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "כן",
        cancelButtonText: "ביטול",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "בוצע",
            text: `השם ${item.getFullName()} נמחק מהמאגר`,
            icon: "success",
            confirmButtonText: "סגור",
          });
          deleteFromFirestore(item.id);
          dispatch(niftarimActions.deleteNiftar(item.id));
        }
      });
  };

  return (
    <div>
      <button className='delete-button' onClick={showAlert}>מחק</button>
    </div>
  );
};

export default SwalAlert;
