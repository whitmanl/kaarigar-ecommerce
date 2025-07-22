import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { getWallet, disconnectWallet, connectWallet } from "../redux/action";
import Skeleton from "react-loading-skeleton";

const Navbar = () => {
  const networks = [
    {
      label: "Ethereum Mainnet",
      value: "ethereum",
    },
  ];

  const dispatch = useDispatch();

  const state = useSelector((state) => state.handleCart);
  const walletState = useSelector((state) => state.handleWallet);

  const [show, setShow] = useState(false);

  const maskAddress = (address) => {
    const addressLength = address.length;
    return `${address.substring(0, 6)}****${address.substring(
      addressLength - 4,
      addressLength
    )}`;
  };

  const ShowNetworks = () => {
    return (
      <div>
        <h3>Choose Networks</h3>
        {networks.map((v) => {
          return (
            <button
              className="btn btn-outline-primary w-100 mt-2"
              onClick={() => dispatch(getWallet(v.value))}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    );
  };

  const ShowWallets = () => {
    return (
      <div>
        <h3>Select Wallet</h3>
        {walletState.wallets.map((v) => {
          return (
            <button
              className="btn btn-outline-primary w-100 mt-2 text-left"
              onClick={() => dispatch(connectWallet(v))}
            >
              <h5>{v.walletName}</h5>
              <span>{maskAddress(v.address)}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const ShowConnected = () => {
    return (
      <div>
        <h3>You are Connected</h3>
        <p>
          <div>
            Network:
            {networks.find((v) => v.value === walletState.network).label}
          </div>
          <div>Wallet: {walletState.wallet.walletName}</div>
          <div>Address: {maskAddress(walletState.wallet.address)}</div>
        </p>

        <button
          className="btn btn-outline-danger"
          onClick={() => dispatch(disconnectWallet())}
        >
          Disconnected
        </button>
      </div>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            React Ecommerce
          </NavLink>
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto my-2 text-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons text-center">
              <NavLink to="/login" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i> Login
              </NavLink>
              <NavLink to="/register" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Register
              </NavLink>
              <NavLink to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart (
                {state.length})
              </NavLink>
              <button
                type="button"
                className="btn btn-outline-dark m-2"
                onClick={() => setShow(true)}
              >
                <i className="fa fa-wallet mr-1"></i>
                {walletState?.wallet ? "Connected" : "Connect Wallet"}
              </button>
              <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {walletState?.wallet ? (
                    <ShowConnected />
                  ) : (
                    <div className="container">
                      {walletState.isLoading ? (
                        <Skeleton height={30} width={250} />
                      ) : (
                        <></>
                      )}
                      {!walletState.isLoading &&
                      walletState.wallets.length > 0 ? (
                        <ShowWallets />
                      ) : (
                        <ShowNetworks />
                      )}
                    </div>
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
