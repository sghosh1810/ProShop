import React, {useState,useEffect} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
const ProfileScreen = ({location,history}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState(null);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} =  userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} =  userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} =  userUpdateProfile;

    useEffect (() => {
        if(!userInfo) {
            history.push('/');
        } else {
            if(!user?.name || success) {
                dispatch({type:USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[userInfo, history, user, success,dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({
                name,
                email,
                password
            }))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile updated!</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={name}></Form.Control>
                    </Form.Group> 
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email}></Form.Control>
                    </Form.Group> 
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant='primary' className='mt-3'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
