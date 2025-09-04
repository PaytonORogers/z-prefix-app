import './Inventory.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from './App.jsx'
import { data, useNavigate } from 'react-router-dom';

function Inventory() {
  const { userid, setUserid, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState("")
  const [itemDesc, setItemDesc] = useState("")
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemDisplay, setItemDisplay] = useState(null)

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
            updateTable();
          }
        })
    } else {
      alert("You cannot add items when you are not logged in!")
    }
  }

  function handleEdit(iid) {
    if (isLoggedIn) {
      const itemToAdd = { 'uid': userid, 'item_name': itemName, 'description': itemDesc, 'quantity': itemQuantity };
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
            console.log("Item Added", data);
            alert("Item Added")
            updateTable();
          }
        })
    } else {
      alert("You cannot edit items when you are not logged in!")
    }
  }

  function handleDelete(iid) {
    if (isLoggedIn) {
      
    } else {
      alert("You cannot delete items when you are not logged in!")
    }
  }

  function returnItemDisplay() {
    setItemDisplay(
      (<>
        <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="name" placeholder=" Enter Item Name " onChange={e => setItemName(e.target.value)}></input>
        <input className="text-white rounded-sm border-2 border-white mb-2" type="text" name="description" placeholder=" Enter Description " onChange={e => setItemDesc(e.target.value)}></input>
        <input className="text-white rounded-sm border-2 border-white mb-2" type="number" name="quantity" placeholder=" Enter Quantity " onChange={e => setItemQuantity(e.target.value)}></input>
        <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleAddItem()}>Add Item</button>
      </>
      ))
  }

  function updateDisplay(iid) {
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
        console.log(data)
        setItemDisplay(
          (<div className="flex flex-col rounded-lg mb-5 ring ring-gray-900/5 items-center justify-center bg-indigo-400 p-2 shadow-lg w-full">
            <input className="text-white rounded-sm border-2 border-white mb-2 mt-5" defaultValue={data.item_name} type="text" name="item_name" onChange={e => setItemName(e.target.value)}></input>
            <input className="text-white rounded-sm border-2 border-white mb-2" defaultValue={data.description} type="text" name="item_description" onChange={e => setItemDesc(e.target.value)}></input>
            <input className="text-white rounded-sm border-2 border-white mb-2" defaultValue={data.quantity} type="text" name="item_quantity" onChange={e => setItemQuantity(e.target.value)}></input>
            <div className="flex justify-center gap-6 mt-4 text-white">
              <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => returnItemDisplay()}>Close Item</button>
              <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleEdit(iid)}>Edit Item</button>
              <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleDelete(iid)}>Delete Item</button>
            </div>
          </div>)
        )
      })
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className="text-white mt-25 mb-50 text-base font-medium tracking-tight text-center w-1/2" >Inventory</h1>
        <div className="flex flex-col rounded-lg px-6 py-8 ring ring-gray-900/5 items-center justify-center bg-indigo-500 p-2 shadow-lg w-1/2 mt-200px">
          <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all mb-5" onClick={() => handleSignOut()}>Return to Login Page</button>
          {itemDisplay}
          <table className="border-1 text-white w-full">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.iid} onClick={() => { updateDisplay(item.iid) }} className="border hover:bg-violet-600 text-center">
                  <td className="border px-2 py-1">{item.item_name}</td>
                  <td className="border px-2 py-1">{item.description}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Inventory