import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { Button, Container, Nav, Navbar as NavbarBs, Offcanvas, Stack } from "react-bootstrap"
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import ShoppingCart from "./ShoppingCart";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const shoppingCartContext = useContext(ShoppingCartContext);
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <NavbarBs sticky="top" bg="dark" variant="dark" className="shadow" >
                <Container>
                    <NavbarBs.Brand to="/" as={NavLink} className='fs-2'>Shopifly</NavbarBs.Brand>
                    <Nav className="me-auto fs-5">

                        <Nav.Link to="/shop" as={NavLink}>Shop</Nav.Link>
                        {userContext.user ? (
                          <Nav.Link to="/profile" as={NavLink}>{userContext.user.username}'s  profile</Nav.Link>
                        ) : (
                          <Nav.Link to="/profile" as={NavLink}>Profile</Nav.Link>
                        )}

                    </Nav>
                    {userContext.user && (
                        <Button onClick={() => {
                            handleShow();
                            
                        }} style={{ width: "3rem", height: "3rem", position: "relative" }} className="rounded-circle" variant="light"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 239.988 239.988" xmlSpace="preserve"> <path d="M26.674,45.892L0,38.843L7.664,9.839l49.01,12.951v20.906h183.314l-31.314,101.955h-152v23.022h145.648l-8.158,29h-19.926
         c2.393,3.362,3.814,7.464,3.814,11.904c0,11.361-9.209,20.571-20.57,20.571c-11.361,0-20.572-9.21-20.572-20.571
         c0-4.44,1.422-8.542,3.814-11.904H84.238c2.393,3.362,3.814,7.464,3.814,11.904c0,11.361-9.209,20.571-20.57,20.571
         s-20.572-9.21-20.572-20.571c0-4.44,1.422-8.542,3.815-11.904h-9.051h-15V45.892z"/></svg>
                            <div className="rounded-circle bg-info d-flex justify-content-center align-items-center"
                                style={{
                                    color: "white",
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    transform: "translate(25%, 25%)",
                                }}>{shoppingCartContext.getCartQuantity()}</div>
                        </Button>
                    )}

                  <ShoppingCart show={show} onHide={() => handleClose()} />

                </Container>
            </NavbarBs>
    </>
  )
}