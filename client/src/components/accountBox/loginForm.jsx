import React, { useState,useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { AccountContext } from "./accountContext";
import {signIn} from '../../actions/auth'
import {Alert} from 'react-bootstrap'

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const errors = useSelector((state)=> state.auth.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  const [form,setForm] = useState({
      username: '',
      password: '',
  })

  const onChangeHandler = (e) =>{
    const {name,value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const onSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(signIn(form,history));
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={onSubmitHandler}>
        <Input name="username" type="email" placeholder="Email Address" onChange={onChangeHandler} required/>
        <Input name="password" type="password" placeholder="Password" onChange={onChangeHandler}  required/>
        <SubmitButton id="submit" className="d-none" type="submit">Signin</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={()=>document.getElementById('submit').click()} type="submit">Signin</SubmitButton>
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Register
        </BoldLink>
      </MutedLink>
      {errors && <Alert variant="danger">{errors}</Alert>}
    </BoxContainer>
  );
}