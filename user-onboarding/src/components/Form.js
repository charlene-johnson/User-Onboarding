import React, {useState} from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";


const Forms = styled.form `
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 1%;
`
const Label = styled.label `
    margin-bottom: 10px;
    text-align: center;
    width: 275px;
    font-family: 'Architects Daughter', cursive;
    font-size: 2rem;
`
const Input = styled.input `
    width: 200px;
    padding: 8px 26px;
    margin: 11.5px;
    border: 1px solid #FFC6FF;
    border-radius 4px;
`

const CheckboxInput = styled.input `
    width: 90px;
    margin-left: 80px;
    border: 1px solid #FFC6FF;
    border-radius 4px;
`
const Button = styled.button ` 
    width: 150px;
    padding: 8px;
    background-color: #C8B6FF;
    border: 1px solid #FFC6FF;
    border-radius 4px;
    margin-top: 1.6%;
    font-family: 'Pontano Sans', sans-serif;
    font-size: 1.5rem;

    &:hover {
        background-color: #D8BBFF
    }
`
const Paragraph = styled.p `
    color: red;
    font-size: 1.5rem;
    font-family: 'Pontano Sans', sans-serif;

`

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is a required field!"),
    email: yup
        .string()
        .email("Must be a valid email address!")
        .required("Must include email address!"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .required("Password is Required!"),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to terms of use"),
})


export default function Form () {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    })


    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })
    const validate = (e) => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err.errors)
                setErrorState({
                    ...errorState,
                    [e.target.name] :err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
       
        validate(e)
        let value=
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name]: value});
    };

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };



return (
    <Forms onSubmit={formSubmit}>
        <Label htmlFor="name">
            Name:
            <Input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={inputChange}
            />
        </Label>
        <Label htmlFor="email">
            Email:
            <Input
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={inputChange}
            />
            {errorState.email.length > 0 ? (<Paragraph>{errorState.email}</Paragraph>) : null}
        </Label>
        <Label htmlFor="password">
            Password:
            <Input
                type="password"
                name="password"
                id="password"
                value={formState.password}
                onChange={inputChange}
            />
            {errorState.password.length > 0 ? (<Paragraph>{errorState.password}</Paragraph>) : null}
        </Label>
        <Label htmlFor="terms">
            Terms & Conditions
            <CheckboxInput
                type="checkbox"
                name="terms"
                id="terms"
                value={formState.terms}
                onChange={inputChange}
            />
            
        </Label>
        <Button>Submit</Button>
    </Forms>
    )
}