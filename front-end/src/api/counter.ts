import useSWR from 'swr';
import { getAddress, getClient, getSigningClient } from '../lib/client';
import { getContractAddr } from '../lib/state';
import {} from '@oraichain/common-contracts-sdk';

export const myCustomQuery = async (contractAddr: any, msg: any) => {
  const client = await getClient();
  const result = await client.queryContractSmart(contractAddr, msg);
  return result;
};

export const myCustomExecute = async (contractAddr: any, msg: any) => {
  const client = await getSigningClient();
  return await client.execute(await getAddress(), contractAddr, msg, 'auto');
};

export const getWecoinBalance = async () => {
  const client = await getClient();
  const wecoinInfo = await await client.queryContractSmart(
    'orai10j8hdhrkjysjk55s4x3x53k8jj8zxc2jwnum0qd8spkdctys9ynqeymqet',
    { token_info: {} },
  );
  const wecoinBalace = await client.queryContractSmart(
    'orai10j8hdhrkjysjk55s4x3x53k8jj8zxc2jwnum0qd8spkdctys9ynqeymqet',
    { balance: { address: 'orai1yzsegvns6vmvf5q29uv26p3th4fd2kzmsq3h6m' } },
  );
  const { symbol } = wecoinInfo;
  return {
    symbol,
    wecoinBalace,
  };
};

export const getOraiBalance = async () => {
  const client = await getClient();
  const orai = await client.getBalance(
    'orai1yzsegvns6vmvf5q29uv26p3th4fd2kzmsq3h6m',
    'orai',
  );
  return orai;
};

export const getCount = async () => {
  const client = await getClient();
  const info = await client.getAccount(
    'orai1yzsegvns6vmvf5q29uv26p3th4fd2kzmsq3h6m',
  );
  try {
    const orai = await client.getBalance(
      'orai1yzsegvns6vmvf5q29uv26p3th4fd2kzmsq3h6m',
      'orai',
    );
    console.log(orai);

    const wecoin = await client.getBalance(
      'orai1yzsegvns6vmvf5q29uv26p3th4fd2kzmsq3h6m',
      'wecoin',
    );
    console.log(wecoin);
  } catch (err) {
    console.log(err);
  }

  const wecoinInfo = await await client.queryContractSmart(
    'orai10j8hdhrkjysjk55s4x3x53k8jj8zxc2jwnum0qd8spkdctys9ynqeymqet',
    { token_info: {} },
  );
  console.log(wecoinInfo);

  return await client.queryContractSmart(getContractAddr(), { get_count: {} });
};

export const increase = async () => {
  const client = await getSigningClient();
  return await client.execute(
    await getAddress(),
    getContractAddr(),
    { increment: {} },
    'auto',
  );
};

export const useOraiBalance = () => {
  const { data, error, mutate } = useSWR('/counter/orai', getOraiBalance);
  return {
    orai: data,
    error,
    mutate,
  };
};

export const useWecoinBalance = () => {
  const { data, error, mutate } = useSWR('/counter/wecoin', getWecoinBalance);
  return {
    wecoin: data,
    error,
    mutate,
  };
};

export const useCount = () => {
  const { data, error, mutate } = useSWR('/counter/count', getCount);
  return {
    count: data?.count,
    error,
    increase: () => mutate(increase),
  };
};
