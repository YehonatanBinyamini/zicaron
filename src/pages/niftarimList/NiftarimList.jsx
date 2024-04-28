import React, { useEffect, useState } from 'react'
import './niftarimList.css'
import { useSelector } from 'react-redux'
import Niftar from '../../models/Niftar'
import AddPersonModal from '../../components/modal/AddPersonModal';
import MyAlert from '../../components/alert/MyAlert';
import { hebrewMonths, filterListBySearch } from '../../assets/helpers';
import SwalAlert from '../../components/alert/SwalAlert';
import Search from "../../components/search/Search";

export default function NiftarimList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false)
  const [newNiftarFullName, setNewNiftarFullName] = useState('')
  const [title, setTitle] = useState('הוספת שם למאגר')
  const [alertText, setAlertText] = useState('')
  const [itemForModal, setItemForModal] = useState()
  const [searchValue, setSearchValue] = useState('');
  const [filteredNiftarim, setFilteredNiftarim] = useState({});
  const niftarim = useSelector(state => state.niftarim.list); 
  //TODO:: check why if niftarim = null it crashed
  const niftarArray = useSelector(state => state.niftarim.data);

  useEffect(()=>{
    // Object.keys(niftarim).length === 0 && setFilteredNiftarim(getNiftarimObjects(niftarim)) 
  setFilteredNiftarim(getNiftarimObjects(niftarim))
  
  },[niftarim,niftarArray])

  useEffect(() => {
    if (Object.keys(niftarim).length === 0) {
      if (searchValue.length > 0) {
        const result = filterListBySearch(niftarArray, searchValue);
        setFilteredNiftarim(getNiftarimObjects(result));
      } else {
        setFilteredNiftarim(getNiftarimObjects(niftarim));
      }
    }
  }, [niftarim, niftarArray, searchValue]);
  

  const handleSearchChange = (value) => {
    const firstCharCode = value.charCodeAt(0);
    const isInEnglish = (firstCharCode >= 65 && firstCharCode <= 90) || (firstCharCode >= 97 && firstCharCode <= 122);
        if (!isInEnglish) {
          setSearchValue(value);
          const result = filterListBySearch(niftarArray, value)
          setFilteredNiftarim(getNiftarimObjects(result))
        }
    // setSearchValue(value);
    // setFilteredNiftarim(getNiftarimObjects({תשרי: niftarim['תשרי']}))
    
    };

  const handleSearchClick = () => {
    if (searchValue.length > 0){

    }
  };

  function handleAddPerson(niftarObject){
    // const newNiftar = niftarim[niftarObject.deathDate.month].filter(niftar => niftar.id === niftarObject.id)
    console.log(niftarObject);
    const newNiftarFullName = `${niftarObject.firstName} ${niftarObject.lastName}`;
    setNewNiftarFullName(newNiftarFullName);
    if (title === 'הוספת שם למאגר'){
      setAlertText(`הפרטים של ${newNiftarFullName} נוספו בההצלחה`);
    } else {
      setAlertText(`הפרטים של ${newNiftarFullName} נערכו בההצלחה`);

    }
    // console.log("handleAddPerson")
    setIsAlertOn(true)
    setTimeout(() => {
      setIsAlertOn(false)
      
    }, 3000);

  };
  

  function getNiftarimObjects(niftarim){
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
                item.deathDate,
                item.id
              )
          ),
        ])
      );
      return sortNiftarim(niftarimObjects);
    }

      function getMonthIndex(monthName) {
        return hebrewMonths.indexOf(monthName);
      }
      function sortNiftarim(niftarimObjects){
        return Object.fromEntries(
          Object.entries(niftarimObjects).sort(([a], [b]) => getMonthIndex(a) - getMonthIndex(b))
        );
      }

      function handleAddNiftar(){
        setTitle("הוספת שם למאגר"); 
        setItemForModal(null)
        setIsModalOpen(true)
      }

      function handleEditNiftar(item) {
        setTitle("עריכת פרטי נפטר")
        setItemForModal(item)
        setIsModalOpen(true)
      }
    
      return (
        <div className='list-container'>
          {isAlertOn && <MyAlert backgroundColor="green" title="!יופי" message={alertText}/>}           
          <h1 className='niftarim-list-title'>'לזכרון עולם בהיכל ה</h1>
          <div className='add-and-search'>
            <Search
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
            />
            <button className='add-button' onClick={()=>handleAddNiftar()}>הוספה</button>
          </div>
          {/* {filteredNiftarim.length > 0 && ( 
          // <div className="result-container">
          //   <h2>תוצאות חיפוש</h2>
          //   {filteredNiftarim.map((item, index) => (
          //     <div key={index} className="result-item">
          //       
          //       <span>{item.firstName} {item.lastName}</span>
          //     </div>
          //   ))}
          // </div>
          // // )}*/}
          <AddPersonModal isOpen={isModalOpen} onRequestClose={()=>{setIsModalOpen(false)}} 
            onAddPerson={handleAddPerson} title={title} item={itemForModal}/>

          {filteredNiftarim && Object.entries(filteredNiftarim).map(([monthName, items]) => (
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
                
                <div className='buttons-position'>
                  <SwalAlert item={item}/>
                  <button className='edit-button' onClick={() => handleEditNiftar(item)}>ערוך</button>
                </div>
              </div>
              ))}
            </div>)
          ))}
          { Object.keys(filteredNiftarim).length === 0 &&
            <h3>
              אין מידע להצגה
            </h3>}
        </div>
      );
}
