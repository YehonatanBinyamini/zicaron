// AddPersonModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './AddPersonModal.css';
import { hebrewMonths, hebrewLetters } from '../../assets/helpers';
import { niftarimActions } from '../../store/niftarim';
import { useDispatch } from 'react-redux';
import { addToFireStore, deleteFromFirestore, updateDocInFirestore } from '../../db/firebase';


const customStyles = {
  overlay: {},
  content: {},
};

const AddPersonModal = ({ isOpen, onRequestClose, onAddPerson, title, item }) => {
  const [firstName, setFirstName] = useState(item && item.firstName ? item.firstName : '');
  const [lastName, setLastName] = useState(item && item.lastName ? item.lastName : '');
  const [parentsName, setParentsName] = useState(item && item.parentsName ? item.parentsName : '');
  const [isMale, setIsMale] = useState(item ? item.isMale : true);
  const [selectedMonth, setSelectedMonth] = useState(item && item.deathDate ? item.deathDate.month : '');
  const [selectedDate, setSelectedDate] = useState(item && item.deathDate ? item.deathDate.date : '');
  const [year, setYear] = useState(item && item.deathDate ? item.deathDate.year : '');
  const [id, setId] = useState(item && item.id ? item.id : '');
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();
    
  useEffect(() => {
    // Update state when the 'item' prop changes
    setFirstName(item && item.firstName ? item.firstName : '');
    setLastName(item && item.lastName ? item.lastName : '');
    setParentsName(item && item.parentsName ? item.parentsName : '');
    setIsMale(item ? item.isMale : true);
    setSelectedMonth(item && item.deathDate ? item.deathDate.month : '');
    setSelectedDate(item && item.deathDate ? item.deathDate.date : '');
    setYear(item && item.deathDate ? item.deathDate.year : '');
    setId(item && item.id ? item.id : '');
  }, [item]);

  const contentIsValid = () => {
    if(firstName.length === 0){
        setErrorMessage("שם פרטי הוא שדה חובה")
        return false;
    } else if(lastName.length === 0){
        setErrorMessage("שם משפחה הוא שדה חובה")
        return false;
    } else if(parentsName.length === 0){
        setErrorMessage("שם ההורים הוא שדה חובה")
        return false;
    } else if(selectedDate.length === 0 ){
        setErrorMessage("לא נבחר יום")
        return false;
    } else if(selectedMonth.length === 0 ){
        setErrorMessage("לא נבחר חודש")
        return false;
    } 
    return true;
  }

  const handleAddPerson = async () => {
   
      if (contentIsValid()){
          const deathDate = {
              year: year,
              month: selectedMonth,
              date: selectedDate,
            };
            // console.log('Adding person:', newNiftar);
            if (id){ 
              closeModalAndResetInputs(); 
              const editedNiftar = { firstName, lastName, parentsName, deathDate, isMale, id};
              updateDocInFirestore(id, editedNiftar);
              dispatch(niftarimActions.updateNiftar({id, editedNiftar}));
              onAddPerson(editedNiftar);
            } else {
            const newNiftar = { firstName, lastName, parentsName, deathDate, isMale };
            try{
              closeModalAndResetInputs();
              const newId = await addToFireStore(newNiftar);
              const niftarObject = {...newNiftar, id: newId}
              dispatch(niftarimActions.addNiftar(niftarObject));
              onAddPerson(niftarObject);
            } catch(e){
              console.log('Error: ',e)
            }
          }
    }
  };

  function closeModalAndResetInputs(){
    onRequestClose();
        setFirstName("")
        setLastName("")
        setIsMale(true)
        setParentsName("")
        setSelectedDate("")
        setSelectedMonth("")
        setYear("")
        setErrorMessage("")
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Person Modal"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h2 className='h2-modal'>{title}</h2>
        <label className='label-modal'>שם פרטי</label>
        <input className='input-modal' type="text" value={firstName} tabIndex="1" onChange={(e) => {setFirstName(e.target.value); setErrorMessage('')}} />

        <label className='label-modal'>שם משפחה</label>
        <input className='input-modal' type="text" value={lastName} tabIndex="2" onChange={(e) => {setLastName(e.target.value); setErrorMessage('')}} />

        <label className='label-modal'>שם ההורים</label>
        <input className='input-modal' type="text" value={parentsName} tabIndex="3" onChange={(e) => {setParentsName(e.target.value); setErrorMessage('')}} />

        <label className='label-modal'>תאריך פטירה</label>
        
    <div className="selects-container">
      <select
        className="modal-select"
        value={selectedDate}
        tabIndex="4"
        onChange={(e) => {setSelectedDate(e.target.value); setErrorMessage('')}}
      >
        <option value="">בחר יום</option>
        {Object.entries(hebrewLetters).map(([key, value]) => (
            <option key={key} value={value}>
                {value}
            </option>
        ))}
      </select>
      <select
        className="modal-select"
        value={selectedMonth}
        tabIndex="5"
        onChange={(e) => {setSelectedMonth(e.target.value); setErrorMessage('')}}
      >
        <option value="">בחר חודש</option>
        {hebrewMonths.map((month, index) => (
            <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    <input placeholder='שנת פטירה (לא חובה)' className='input-year-modal' type="text" value={year} onChange={(e) => setYear(e.target.value)} />
    </div>
    <div className="checkbox-container">
  <input
    type="checkbox"
    checked={isMale}
    onChange={() => {
        setIsMale(true);
    }}
  />
  <label className="checkbox-label">זכר</label>
  <input
    type="checkbox"
    checked={!isMale}
    onChange={() => {
        setIsMale(false);
    }}
  />
  <label className="checkbox-label">נקבה</label>
</div>
{errorMessage.length > 0 && <label className='error'>{errorMessage}</label>}
        <div className="button-container">
          <button className="add-button" onClick={closeModalAndResetInputs}>
            ביטול
          </button>
          <button className="add-button" onClick={handleAddPerson}>
            אישור
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPersonModal;
