import React, {useState,useContext,useMemo} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {useDispatch,useSelector} from 'react-redux';
import {signUp} from '../../actions/auth'
import {useHistory} from 'react-router-dom'
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {Alert} from 'react-bootstrap'

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const errors = useSelector((state)=> state.auth.errors);
  const [formError,setFormError] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [form,setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })

  const lengthInvalid = useMemo(()=>{
    if (form.username.length > 0){
        if (!(form.username.length >= 4 && form.username.length <= 20)){
          return true;
        }
    }
    if (form.password.length > 0){
      if (!(form.password.length >= 4 && form.password.length <= 20)){
        return true;
      }
    }
    return false;
  } ,[form])

  const onChangeHandler = (e) =>{
     const {name,value} = e.target;
     setForm({
       ...form,
       [name]:value
     });
  }

  const onSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(signUp(form,history));
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={onSubmitHandler}>
        <Input name="fullName" type="text" placeholder="Full Name" onChange={onChangeHandler} required />
        <Input name="username" type="email" placeholder="Email" onChange={onChangeHandler} required/>
        <Input name="password" type="password" placeholder="Password" onChange={onChangeHandler} required/>
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={onChangeHandler} required/>
        <SubmitButton id="signup" className="d-none" type="submit">Signup</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={15} />
      <SubmitButton disabled={lengthInvalid} onClick={()=> document.getElementById('signup').click()} type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
      {errors && <Alert variant="danger">{errors}</Alert>}
      {lengthInvalid && <Alert variant="warning">'username and password should be within 4-20 characters'</Alert>}
    </BoxContainer>
  );
}