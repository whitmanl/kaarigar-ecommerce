// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item to Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const getWallet = (network) => async (dispatch) => {
  dispatch({ type: "CONNECT_REQUEST" });
  try {
    // handle other network here
    if (network === "ethereum") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // more provider here
      let walletName = "Unknown Wallet";
      if (window.ethereum.isPhantom) {
        walletName = "Phantom";
      } else if (window.ethereum.isMetaMask) {
        walletName = "MetaMask";
      }

      dispatch({
        type: "GET_WALLET",
        payload: { wallets: [{ address: accounts[0], walletName }] },
      });
    } else {
      throw new Error("No wallet detected");
    }
  } catch (error) {
    dispatch({
      type: "CONNECT_ERROR",
      payload: {
        error: `Connection failed: ${error}`,
      },
    });
  }
};

export const connectWallet = (wallet) => {
  return {
    type: "CONNECT_WALLET",
    payload: {
      wallet,
    },
  };
};

export const disconnectWallet = () => {
  return {
    type: "DISCONNECT_WALLET",
  };
};
