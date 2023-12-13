import React, { useState } from 'react'
import './niftarimList.css'
import { useSelector } from 'react-redux'
import Niftar from '../../models/Niftar'
import AddPersonModal from '../../components/modal/AddPersonModal';
import MyAlert from '../../components/alert/MyAlert';
import { hebrewMonths } from '../../assets/helpers';

export default function NiftarimList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false)
  const [newNiftarFullName, setNewNiftarFullName] = useState('')
  const niftarim = useSelector(state => state.niftarim.list);
  
  function handleAddPerson(newNiftar){
    setNewNiftarFullName(`${newNiftar.firstName} ${newNiftar.lastName}`)
    setIsAlertOn(true)
    setTimeout(() => {
    setIsAlertOn(false)
      
    }, 3000);
  };
  

     
  const niftarimObjects = Object.fromEntries(
    Object.entries(niftarim).map(([monthName, items]) => [
          monthName,
          items.map(
            (item) =>
              new Niftar(
                item.firstName,
                item.lastName,
                item.parentsName,
                item.isMale,
                item.deathDate
              )
          ),
        ])
      );

      function getMonthIndex(monthName) {
        return hebrewMonths.indexOf(monthName);
      }
      
      const sortedNiftarim = Object.fromEntries(
        Object.entries(niftarimObjects).sort(([a], [b]) => getMonthIndex(a) - getMonthIndex(b))
      );
    
      return (
        <div className='list-container'>
          {isAlertOn && <MyAlert backgroundColor="green" title="!יופי" message={`הפרטים של ${newNiftarFullName} נוספו בההצלחה`}/>}           <h1 className='niftarim-list-title'>'לזכרון עולם בהיכל ה</h1>
          <button className='add-button' onClick={()=>{setIsModalOpen(true)}}>הוספה</button>
          <AddPersonModal isOpen={isModalOpen} onRequestClose={()=>{setIsModalOpen(false)}} 
            onAddPerson={handleAddPerson}/>

          {Object.entries(sortedNiftarim).map(([monthName, items]) => (
            items.length > 0 && (
            <div key={monthName} className="column-order">
              <h3>{monthName}</h3>
              {items.map((item, index) => (
              <div key={index} className={`labels-name ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <div className="align-labels">
                    <label className="label-rest-string">{item.getRestOfString()}</label>
                    <label className="label-niftar">
                    <span className="larger-text">{item.getFullName()}</span>
                    </label>
                </div>
                <label className="label-rest-string">{item.getDeathDate()}</label>
              </div>
              ))}
            </div>)
          ))}
        </div>
      );
}
