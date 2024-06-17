import React, { useEffect, useState } from 'react'
import './niftarimList.css'
import { useSelector } from 'react-redux'
import Niftar from '../../models/Niftar'
import AddPersonModal from '../../components/modal/AddPersonModal';
import MyAlert from '../../components/alert/MyAlert';
import { hebrewMonths, hebrewLetters, filterListBySearch } from '../../assets/helpers';
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
  const niftarArray = useSelector(state => state.niftarim.data);
  const auth = useSelector(state => state.auth);

  useEffect(()=>{
    // Object.keys(niftarim).length === 0 && setFilteredNiftarim(getNiftarimObjects(niftarim)) 
  setFilteredNiftarim(getNiftarimObjects(niftarim))
  
  },[niftarim,niftarArray])

  // useEffect(() => {
  //   if (Object.keys(niftarim).length === 0) {
  //     if (searchValue.length > 0) {
  //       const result = filterListBySearch(niftarArray, searchValue);
  //       console.log("@@@@@"+result)
  //       setFilteredNiftarim(getNiftarimObjects(result));
  //     } else {
  //       console.log("קטן מ1")

  //       setFilteredNiftarim(getNiftarimObjects(niftarim));
  //     }
  //   }
  // }, [niftarim, niftarArray, searchValue]);
  

  const handleSearchChange = (value) => {
    setSearchValue(value);
    // setFilteredNiftarim(getNiftarimObjects({תשרי: niftarim['תשרי']}))
    const result = filterListBySearch(niftarArray, value)
    const sortedNiftarim = getNiftarimObjects(result)
      setFilteredNiftarim(sortedNiftarim)
    };

  const handleSearchClick = () => {
    if (searchValue.length > 0){

    }
  };

  function handleAddPerson(niftarObject){
    // const newNiftar = niftarim[niftarObject.deathDate.month].filter(niftar => niftar.id === niftarObject.id)
    const newNiftarFullName = `${niftarObject.firstName} ${niftarObject.lastName}`;
    setNewNiftarFullName(newNiftarFullName);
    if (title === 'הוספת שם למאגר'){
      setAlertText(`הפרטים של ${newNiftarFullName} נוספו בההצלחה`);
    } else {
      setAlertText(`הפרטים של ${newNiftarFullName} נערכו בההצלחה`);

    }
    setIsAlertOn(true)
    setTimeout(() => {
      setIsAlertOn(false)
      
    }, 3000);

  };
  

  function getNiftarimObjects(niftarim) {
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
  
    const sortedNiftarim = sortNiftarim(niftarimObjects);
    return sortedNiftarim;
  }
  
  function getMonthIndex(monthName) {
    return hebrewMonths.indexOf(monthName);
  }
  
  function getDateIndex(hebrewDate) {
    for (let [key, value] of Object.entries(hebrewLetters)) {
      if (value === hebrewDate) {
        return parseInt(key, 10);
      }
    }
    return -1; // Return -1 if the date is not found
  }
  
  function sortNiftarim(niftarimObjects) {
    const sortedByMonth = Object.fromEntries(
      Object.entries(niftarimObjects).sort(
        ([a], [b]) => getMonthIndex(a) - getMonthIndex(b)
      )
    );
  
    for (let month in sortedByMonth) {
      sortedByMonth[month].sort((a, b) => {
        const dateA = getDateIndex(a.deathDate.date);
        const dateB = getDateIndex(b.deathDate.date);
        return dateA - dateB;
      });
    }
    return sortedByMonth;
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
            {auth.authIsConnected && <button className='add-button' onClick={()=>handleAddNiftar()}>הוספה</button>}
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
                
                {auth.authIsConnected && <div className='buttons-position'>
                  <SwalAlert item={item}/>
                  <button className='edit-button' onClick={() => handleEditNiftar(item)}>ערוך</button>
                </div>}
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
