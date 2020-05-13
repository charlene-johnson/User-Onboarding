import React, {useState, useEffect} from "react";
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

const Select = styled.select `
    width: 100%;
    margin: 7px;
    display: block;
    width: 95%;
    border: 1px solid #FFC6FF;
    border-radius: 4px;
    font-size: 1.5rem;
    letter-spacing: 0.5px;
    font-family: 'Pontano Sans', sans-serif;
`

const CheckboxInput = styled.input `
    width: 90px;
    margin-left: 80px;
    border: 1px solid #FFC6FF;
    border-radius 4px;
    margin-top: 15%;
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

const Pre = styled.pre `
    font-family: 'Jaldi', sans-serif;
    font-size: 1.8rem;
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
        .min(6, "Password must be 6 characters long.")
        .required("Password is Required!"),
    role: yup
        .string(),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to terms of use"),
})


export default function Form () {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: false
    });

     const [buttonDisabled, setButtonDisabled] = useState(true);

     useEffect(()=> {
         formSchema.isValid(formState).then(valid=> {
             setButtonDisabled(!valid);
         })
     }, [formState]);

    const [post, setPost] = useState()

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    });
    const validate = e => {
        let value=
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
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
        console.log("form submitted!")
        setFormState({name:"", email: "", password: "", role:"", terms: false})
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => { 
                  setPost(response.data);
                  console.log("Success", response)
                })
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
        <Label htmlFor="role">
            What is your role?
            <Select
                value={formState.role}
                name="role"
                id="role"
                onChange={inputChange}
                >
                <option value="" disabled={true}>Select One</option>
                <option value="Full Stack Web Developer">Full Stack Web Developer</option>
                <option value="Android Developer">Android Developer</option>
                <option value="iOS Developer">iOS Developer</option>
                <option value="UX/UI Designer">UX/UI Designer</option>
            </Select>
            {errorState.role.length > 0 ? (<Paragraph>{errorState.role}</Paragraph>) : null}
        </Label>
        <Label htmlFor="terms">
            Terms & Conditions
            <CheckboxInput
                type="checkbox"
                name="terms"
                id="terms"
                checked={formState.terms}
                onChange={inputChange}
            
            />
            {errorState.terms.length > 0 ? (<Paragraph>{errorState.terms}</Paragraph>) : null}
        </Label>
        <Pre>{JSON.stringify(post, ["name","email","role"])}</Pre>
        <Button disabled={buttonDisabled}>Submit</Button>
    </Forms>
    )
}