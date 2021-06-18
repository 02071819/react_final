import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';

//對應到 cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart props from App.js
const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const classes = useStyles(); //hook

    if (!cart.line_items) return 'Loading...';

    //Link
    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link to="/" className={classes.link} >start adding some</Link>!
        </Typography>
    );

    //對應到 CartItem.jsx 的 item, onUpdateCartQty, onRemoveFromCart
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onEmptyCart}>Empty cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? EmptyCart() : FilledCart() }
        </Container>
    )
}
//"!cart.line_items.length" means "cart.line_items.length===0(false)"

export default Cart