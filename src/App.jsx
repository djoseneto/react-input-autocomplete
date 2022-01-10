import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response?.data.data);
    }

    loadUsers();
  },[]);

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length >= 3) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi");
        return user.email.match(regex);
      })
    }
    setSuggestions(matches);
    setText(text);
  }

  
  return (
    <Container>
      <Input
        type="text"
        name=""
        id=""
        placeholder="Pesquise por um usuario"
        onChange={e => onChangeHandler(e.target.value)}
      />
      <ContainerSuggestions>
        {suggestions.length > 0
          ? suggestions.map((suggestion, index) => {
             return <Suggestions key={index}>{suggestion.email}</Suggestions>
          })
          : <div>...</div>
        }
        
      </ContainerSuggestions>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 380px;
  height: 40px;
  padding: 8px;

  border: 1px solid rgb(0, 0, 0, 0.25);
  border-radius: 2px;

  margin-bottom: 5px;
`;

const ContainerSuggestions = styled.div`
  width: 380px;
  max-height: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Suggestions = styled.div`
  width: 100%;
  padding: 22px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgb(0, 0, 0, 0.25);
  border-radius: 2px;
`;

export default App;
