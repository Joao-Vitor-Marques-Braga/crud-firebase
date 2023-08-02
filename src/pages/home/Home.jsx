import React, { useEffect, useState } from "react"
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore"
import db from "../../config/configFireBase";
import { BiUserPlus } from 'react-icons/bi'
import './style.css'

export function Home(){

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, "users")

  useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      };
      getUsers();
  }, []);

  async function createUser() {
    if (name == null || email == null){
      alert("Os campos não estão preenchidos corretamente! Por favor tente novamente")
    } else{
      const user = await addDoc(userCollectionRef, {
        name,
        email
      });
      window.location.reload();
    }
  }

  async function deleteUsers(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    window.location.reload();
  }

  return (
    <div className="main-container">
      <div className="title">
        <h1>Cadastro de Usuários</h1>
        <BiUserPlus className="icon-title" size={"1.5em"}/>
      </div>
      <div className="container-register-user">
      <input 
        type="text" 
        placeholder="Nome..." 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className="input-infos"
      />
      <input 
        typeof="text" 
        placeholder="Email..." 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="input-infos"
        />
        <button className="button-register" onClick={createUser}>Cadastar usuario</button>
      </div>
      <ul>
        {users.map(user => {
          return(
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <button onClick={() => deleteUsers(user.id)}>Deletar Usuario</button>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
