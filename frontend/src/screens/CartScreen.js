import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {Row, Col,ListGroup, Image,Form, Button,Card} from 'react-bootstrap';
import Message from '../components/Message';
import {addToCart, removeFromCart} from '../actions/cartActions';
const CartScreen = ({history,match}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkOutHandler = () => {
        history.push('/login?redirect=shipping');
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? 
                <Message>
                    Your cart is empty
                    <Link to='/'> Go Back</Link>
                </Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => {
                            return <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.id,Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => {removeFromCartHandler(item.id)}}>
                                            <i className='fas fa-trash'></i>
                                        </Button>  
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                )
            }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc,item) => acc+item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen