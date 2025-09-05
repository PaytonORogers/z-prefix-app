import './Inventory.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from './App.jsx'
import { data, useNavigate } from 'react-router-dom';

// All ye who enter here beware the Spaghetti Monster
// I refactored like 5 times and it shows.

function Inventory() {
  const { userid, setUserid, isLoggedIn, setIsLoggedIn, firstname, setFirstname } = useContext(AppContext)
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState("")
  const [itemDesc, setItemDesc] = useState("")
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemDisplay, setItemDisplay] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    updateTable();
    returnItemDisplay();
  }, [])

  function updateTable() {
    fetch(`http://localhost:8080/items`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Database Offline!");
        } else {
          return res.json();
        }
      })
      .then(data => {
        setItems(data)
        console.log(data)
        console.log(items)
      })
  }

  function handleSignOut() {
    setUserid(null)
    setIsLoggedIn(false)
    navigate("/")
    return
  }

  function handleAddItem() {
    if (isLoggedIn) {
      const itemToAdd = { 'uid': userid, 'item_name': itemName, 'description': itemDesc, 'quantity': itemQuantity };
      fetch("http://localhost:8080/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToAdd)
      })
        .then(res => {
          if (!res.ok) {
            console.log(res)
            alert("Item already exists!")
          } else {
            console.log(res)
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            console.log("Item Added", data);
            alert("Item Added")
            setItemName("");
            setItemDesc("");
            setItemQuantity(0);
          }
        })
        .then(() => {
          updateTable();
        })
    } else {
      alert("You cannot add items when you are not logged in!")
    }
  }

  function handleEdit(iid, item) {
    if (isLoggedIn) {
      const itemToAdd = { 'uid': userid, 'item_name': item.item_name, 'description': item.description, 'quantity': item.quantity };
      fetch("http://localhost:8080/items/" + iid, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToAdd)
      })
        .then(res => {
          if (!res.ok) {
            console.log(res)
          } else {
            console.log(res)
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            console.log("Item Edited", data);
          }
        })
    } else {
      alert("You cannot edit items when you are not logged in!")
    }
  }

  function handleDelete(iid) {
    if (isLoggedIn) {
      fetch("http://localhost:8080/items/" + iid, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(res => {
          if (!res.ok) {
            console.log(res)
          } else {
            console.log(res)
            updateTable();
            return res.json();
          }
        })
    } else {
      alert("You cannot delete items when you are not logged in!")
    }
  }

  function changeItem(index, key, change) {
    var tempArray = items;
    tempArray[index][key] = change;
    setItems(tempArray);
    handleEdit(items[index].iid, items[index])
  }

  function toggleEditMode() {
    if (isLoggedIn) {
      if (editMode) {
        returnItemDisplay()
        setEditMode(false)
      } else {
        setItemDisplay(null)
        setEditMode(true)
      }
    } else {
      alert("You must be logged in to make edits!")
    }
  }

  function returnItemDisplay() {
    setItemDisplay(
      (<>
        <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="name" defaultValue={itemName} placeholder=" Enter Item Name " onChange={e => setItemName(e.target.value)}></input>
        <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="description" defaultValue={itemDesc} placeholder=" Enter Description " onChange={e => setItemDesc(e.target.value)}></input>
        <input className="text-white rounded-sm border-2 border-white mb-2" type="number" name="quantity" defaultValue={itemQuantity} placeholder=" Enter Quantity " onChange={e => setItemQuantity(e.target.value)}></input>
        <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleAddItem()}>Add Item</button>
      </>
      ))
  }

  function updateDisplay(iid) {
    returnItemDisplay()
    fetch(`http://localhost:8080/items/${iid}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Database Offline!");
        } else {
          return res.json();
        }
      })
      .then(dataArray => {
        var data = dataArray[0]
        console.log("Data:")
        console.log(data)
        setItemName(data.item_name)
        setItemDesc(data.description)
        setItemQuantity(data.quantity)
        setItemDisplay(
          (<div className="flex flex-col rounded-lg mb-5 ring ring-gray-900/5 items-center justify-center bg-indigo-400 p-2 shadow-lg w-full">
            <h1 className="text-white text-xl">Name</h1>
            <p className="text-white border-2 border-gray-300 rounded-md w-full text-center">{data.item_name}</p>
            <h1 className="text-white text-xl">Description</h1>
            <p className="text-white border-2 border-gray-300 rounded-md w-full text-center">{data.description}</p>
            <h1 className="text-white text-xl">Quantity</h1>
            <p className="text-white border-2 border-gray-300 rounded-md w-full text-center">{data.quantity}</p>
            <div className="flex justify-center gap-6 mt-4 text-white">
              <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => returnItemDisplay()}>Close Item</button>
            </div>
          </div>)
        )
      })
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className="text-white mt-25 mb-50 text-base font-medium tracking-tight text-center w-5/6" >Inventory</h1>
        <div className="flex flex-col rounded-lg px-6 py-8 ring ring-gray-900/5 items-center justify-center bg-indigo-500 p-2 shadow-lg w-5/6 mt-200px">
          <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleSignOut()}>Return to Login Page</button>
          {editMode ? (<>
            <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => toggleEditMode()}>Disable Editing</button>
          </>) :
            (<button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => toggleEditMode()}>Enable Editing</button>)}
          <>
            <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="name" defaultValue={itemName} placeholder=" Enter Item Name " onChange={e => setItemName(e.target.value)}></input>
            <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="description" defaultValue={itemDesc} placeholder=" Enter Description " onChange={e => setItemDesc(e.target.value)}></input>
            <input className="text-white rounded-sm border-2 border-white mb-2" type="number" name="quantity" defaultValue={itemQuantity} placeholder=" Enter Quantity " onChange={e => setItemQuantity(e.target.value)}></input>
            <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleAddItem()}>Add Item</button>
          </>
          <table className="border-1 text-white w-full">
            <thead>
              <tr>
                {!editMode ? (<>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                </>) : (<>
                  <th scope="col">Delete?</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                </>
                )}
              </tr>
            </thead>
            <tbody>
              {editMode ? items.map((item, index) => (
                <tr key={item.iid} className="border hover:bg-violet-600 text-center">
                  <td className="border px-2 py-1"><button className="bg-white w-full text-gray-700 border border-gray-300 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all" onClick={() => handleDelete(item.iid)}>Delete</button></td>
                  <td className="border px-2 py-1"><input className="text-white rounded-sm border-2 border-white w-full" defaultValue={item.item_name} type="text" name="item_name" onChange={e => changeItem(index, 'item_name', e.target.value)}></input></td>
                  <td className="border px-2 py-1"><input className="text-white rounded-sm border-2 border-white w-full" defaultValue={item.description} type="text" name="item_description" onChange={e => changeItem(index, 'description', e.target.value)}></input></td>
                  <td className="border px-2 py-1"><input className="text-white rounded-sm border-2 border-white w-full" defaultValue={item.quantity} type="number" name="item_quantity" onChange={e => changeItem(index, 'quantity', e.target.value)}></input></td>
                </tr>
              )
              ) :
                items.map((item, index) => (
                  <tr key={item.iid} onClick={() => { updateDisplay(item.iid) }} className="border hover:bg-violet-600 text-center">
                    <td className="border px-2 py-1">{item.item_name}</td>
                    <td className="border px-2 py-1">{item.description}</td>
                    <td className="border px-2 py-1">{item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoggedIn ? (<p className="text-white mt-5">Currently logged in as {firstname}</p>) : (<p className="text-white mt-5">Guest Access Only</p>)}
        </div>
      </div>
    </>
  )
}

export default Inventory