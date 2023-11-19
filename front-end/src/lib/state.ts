// import state from "../.beaker/state.json";
// import stateLocal from "../.beaker/state.local.json";

const getState = () => {
  if (!process.env.NEXT_PUBLIC_NETWORK) {
    throw Error("`NEXT_PUBLIC_NETWORK` env variable not found, please set");
  }
  return {
    // ...state,
    // ...stateLocal,
  }[process.env.NEXT_PUBLIC_NETWORK];
};

export const getContractAddr = () => {
  //const contractAddr = getState()?.counter.addresses.default;
  const contractAddr = "orai17mq0sg6ey9u2c5pwjjn8l6sppacrrzfucx5r97pcn25d6mjuax2qza6jar";

  if (!contractAddr) {
    throw Error("Contract address not found, please check your state file");
  }

  return contractAddr;
};
