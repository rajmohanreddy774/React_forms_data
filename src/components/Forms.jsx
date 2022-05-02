
import { useEffect, useState } from "react";

import { Table } from "./Tabel";

export const Form = () => {
    const [formData, setFormData] = useState({
        username: "",
        age: 0,
        address: "",
        department: "",
        salary: 0,
        maritalstate: false,
    });

    const [database, setDatabase] = useState([]);
    
    const getData = () => {
        fetch("http://localhost:8080/Employees/")
            .then((response) => response.json())
            .then((formData) => setDatabase(formData));
    };

    useEffect(() => {
        getData();
    }, []);

    function handelchange(e) {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/Employees/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(() => {
                alert("user created");
            })
            .then(() => {
                getData();   
            });
    };

  
    return (
        <div>
            <form id="form" onSubmit={handelSubmit}>
                <h1>Form</h1>
                <b>Name:</b>
                <input
                    onChange={handelchange}
                    type="text"
                    placeholder="username"
                    id="username"
                ></input>
                <br></br>
                <br></br>
                <b>Age:</b>{" "}
                <input
                    onChange={handelchange}
                    type="number"
                    placeholder="age"
                    id="age"
                ></input>
                <br></br>
                <br></br>
                <b>Address:</b>
                <input
                    onChange={handelchange}
                    type="text"
                    placeholder="address"
                    id="address"
                ></input>
                <br></br>
                <br></br>
                <b>Department:</b>
                <select onChange={handelchange} id="department">
                    <br></br>
                    <br></br>
                    <option>Developer</option>
                    <option>Tester</option>
                    <option>Designer</option>
                    <option>Manager</option>
                    <option>Tech Support</option>
                </select>
                <br></br>
                <br></br>
                <b>Salary:</b>
                <input
                    onChange={handelchange}
                    type="number"
                    placeholder="salary"
                    id="salary"
                ></input>
                <br></br>
                <br></br>
                <b>Martial State:</b>
                <input
                    onChange={handelchange}
                    type="checkbox"
                    id="maritalstate"
                ></input>
                <br></br>
                <br></br>
                <input type="submit" id="sub" value="submit"></input>
                <br></br>
            </form>
            <div id="container">
                <table id="customers">
                    <thead>
                        <th>id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>MartialState</th>
                    </thead>

                    {database.map((e) => {
                        return <Table data={e} key={e.id}></Table>;
                    })}
                </table>
            </div>
        </div>
    );
};
