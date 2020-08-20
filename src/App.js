import React, { useState, useEffect } from 'react';
import api from './services/api';
//const { uuid } = require("uuidv4");

import "./styles.css";

function App() {

  const [repositories, setRepositories ] = useState([]);
 
  
    // useEffect(() => {
    //   api.get('projects').then(response=> {
    //     setRepositories(response.data);
    //   });
    // }, [repositories]);

     // a função loadRepositories() é chamada apenas uma vez no carregamento da página
  useEffect(() => {
    loadRepositories();
  }, []);

   // função que carrega os repositórios da API
   async function loadRepositories() {
    const response = await api.get('repositories');
    setRepositories(response.data);
  }


  // Cria novo Repo
  async function handleAddRepository() {
    // TODO

    //Novo Repo
    const repoToAdd = {
      title: Date.now().toString(),
      url: "http",
      techs: ["1", "2", "3"]
    };
    // Publica na API
     // await api.post('repositories', newRepository);
    

    // State Update

//      setRepositories([...repositories,newRepository]);
    
      await api.post('repositories', repoToAdd)
      .then(req =>
      {
        const newRepo = req.data;
        setRepositories([...repositories, newRepo]);
      });

    
  }


  async function handleRemoveRepository(id) {
   
    await api.delete(`repositories/${id}`); // TODO
  

  const repositoriesUpdated = repositories.filter(repository => repository.id !== id);


  setRepositories(repositoriesUpdated);
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
            
        <li key={index}>
            {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );



}

export default App;
