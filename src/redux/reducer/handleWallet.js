const getInitialWallet = () => {
  const storedWallet = localStorage.getItem("wallet");

  return {
    isLoading: false,
    wallet: storedWallet ? JSON.parse(storedWallet) : null,
    wallets: [],
    network: "ethereum",
    error: "",
  };
};

const handleWallet = (state = getInitialWallet(), action) => {
  switch (action.type) {
    case "CONNECT_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case "CONNECT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case "GET_WALLET":
      return {
        ...state,
        wallets: action.payload.wallets,
        isLoading: false,
      };

    case "CONNECT_WALLET":
      localStorage.setItem("wallet", JSON.stringify(action.payload.wallet));

      return {
        ...state,
        wallet: action.payload.wallet,
      };

    case "DISCONNECT_WALLET":
      localStorage.removeItem("wallet");
      return getInitialWallet();

    default:
      return state;
  }
};

export default handleWallet;
