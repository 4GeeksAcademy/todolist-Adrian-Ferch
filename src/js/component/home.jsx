import React, { useState , useEffect} from "react";




const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	function eliminarTareas(index){

		
		fetch('https://playground.4geeks.com/apis/fake/todos/user/AdriRiosRuiz', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
	  body:JSON.stringify (todos.filter(
		(t, currentIndex) => index != currentIndex
	))
    })
    .then(resp => {
        if (!resp.ok) throw Error(`La response es incorrecta`)
		return resp.json();
    })
    .then(data => {
      setTodos(data) 
    })
    .catch(error => {
       
        console.log(error);
    });

		setTodos(
			todos.filter(
				(t, currentIndex) => index != currentIndex
			)
		)

	}

	useEffect(() => {
		
		fetch('https://playground.4geeks.com/apis/fake/todos/user/AdriRiosRuiz', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        if (!resp.ok) throw Error(`La response es incorrecta`)
		return resp.json();
    })
    .then(data => {
      setTodos(data) 
    })
    .catch(error => {
       
        console.log(error);
    });

	  } , [ ]);



	return (
		<div className="container">
			<h1 className="text-center mt-5">To do list</h1>
			<ul className="">
				<li>
					<input className="p-1"
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}
						}}
						placeholder="what do you need to do?" ></input>
				</li>
				{todos.map((item, index) => (
					<li>

						{item.label}	<i className="fa-sharp fa-solid fa-trash" style={{ color: '#000000' }} onClick={() => eliminarTareas(index)
						}></i>
					</li>
				))}

			</ul >
			<div className="border border-white p-1">
					{todos.length} task
			</div>
			
		</div >
	);
};

export default Home;
