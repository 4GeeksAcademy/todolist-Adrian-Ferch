import React, { useEffect, useState } from "react";



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
  
	const handleInputChange = (e) => {
	  setInputValue(e.target.value);
	};
  
	const handleKeyPress = (e) => {
	  if (e.key === "Enter" && inputValue.trim() !== "") {
		const newTodo = { label: inputValue, done: false };
		const updatedTodos = [...todos, newTodo];
  
		fetch('https://playground.4geeks.com/apis/fake/todos/user/AdriRiosRuiz', {
		  method: "PUT",
		  body: JSON.stringify(updatedTodos),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
		  if (!resp.ok) throw Error("La response no es ok");
		  return resp.json();
		})
		.then(data => {
		  setTodos(updatedTodos);
		  setInputValue("");
		})
		.catch(error => {
		  console.error("Error en la solicitud PUT:", error);
		});
	  }
	};
  
	const handleDelete = (index) => {
	  const updatedTodos = todos.filter((_, i) => i !== index);
  
	  fetch('https://playground.4geeks.com/apis/fake/todos/user/AdriRiosRuiz', {
		method: "PUT",
		body: JSON.stringify(updatedTodos),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		if (!resp.ok) throw Error("La response no es ok");
		return resp.json();
	  })
	  .then(data => {
		setTodos(updatedTodos);
	  })
	  .catch(error => {
		console.error("Error en la solicitud PUT:", error);
	  });
	};
  
	useEffect(() => {
	  fetch('https://playground.4geeks.com/apis/fake/todos/user/AdriRiosRuiz', {
		method: "GET",
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		if (!resp.ok) throw Error("La response no es ok");
		return resp.json();
	  })
	  .then(data => {
		setTodos(data);
	  })
	  .catch(error => {
		console.error("Error en la solicitud GET:", error);
	  });
	}, []);
  
	return (
	  <div className="container mt-5 ">
		<h1 className="d-flex justify-content-center p-4">My Todos List</h1>
		<ul className="">
		  <li className="d-flex justify-content-center p-4">
			<input 
			  type="text"
			  value={inputValue}
			  onChange={handleInputChange}
			  onKeyPress={handleKeyPress}
			  placeholder="¿Qué tengo que hacer?"
			/>
		  </li>
		  {todos.map((item, index) => (
			<li className="d-flex justify-content-center" key={index}>
			  {item.label}{" "}
			  <i
				className="fas fa-trash-alt"
				onClick={() => handleDelete(index)}
			  ></i>
			</li>
		  ))}
		</ul>
		<div className="h d-flex justify-content-center">{todos.length} tasks</div>
	  </div>
	);
  };
  
  export default Home;
  