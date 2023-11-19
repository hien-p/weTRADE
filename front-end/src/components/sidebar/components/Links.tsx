'use client';
/* eslint-disable */

// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  HStack,
  Text,
  List,
  Icon,
  ListItem,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import NavLink from '@/components/link/NavLink';
import { IRoute } from '@/types/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  getWecoinBalance,
  getOraiBalance,
  useOraiBalance,
  useWecoinBalance,
} from '@/api/counter';
import { coin } from 'cosmwasm';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
  orai: any;
  wecoin: any;
}

export function SidebarLinks(props: SidebarLinksProps) {
  //   Chakra color mode
  const pathname = usePathname();
  let activeColor = useColorModeValue('navy.700', 'white');
  let inactiveColor = useColorModeValue('gray.500', 'gray.500');
  let borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let iconColor = useColorModeValue('navy.700', 'white');
  let gray = useColorModeValue('gray.500', 'gray.500');

  // const [orai, setOrai] = useState({
  //   denom: "orai",
  //   amount: "0",
  // });

  // const [wecoin, setWecoin] = useState({
  //   wecoinInfo: {
  //     symbol: "WECOIN",
  //   },
  //   wecoinBalance: 0,
  // });

  // useEffect(() => {
  //     getOraiBalance().then(data => {
  //      console.log(data)
  //     });
  //     getWecoinBalance().then(data => {
  //       console.log(data)
  //     })
  // }, [])

  const { routes, orai, wecoin } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: IRoute[], orai: any, wecoin: any) => {
    console.log(wecoin);
    console.log(orai);
    const { symbol, wecoinBalace } = wecoin;
    return (
      <>
        <div>
          <p>Denom: {orai.denom}</p>
          <p>Balance: {orai.amount}</p>
        </div>
        ~
        <div>
          <p>Denom: {symbol}</p>
          <p>Balance: {wecoinBalace.balance}</p>
        </div>
        <input placeholder="Amount" />
        <button>Swap</button>
      </>
    );
    /*
    return routes.map((route, key) => {
      if (route.collapse && !route.invisible) {
        
      } else if (!route.invisible) {
        return (
          <>
            {route.icon ? (
              <Flex
                align="center"
                justifyContent="space-between"
                w="100%"
                maxW="100%"
                ps="17px"
                mb="0px"
              >
                <HStack
                  w="100%"
                  mb="14px"
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                >
                  {route.name === 'Chat UI' ? (
                    <NavLink
                      href={
                        route.layout ? route.layout + route.path : route.path
                      }
                      key={key}
                      styles={{ width: '100%' }}
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          color={
                            route.disabled
                              ? gray
                              : activeRoute(route.path.toLowerCase())
                              ? activeIcon
                              : inactiveColor
                          }
                          me="12px"
                          mt="6px"
                        >
                          {route.icon}
                        </Box>
                        <Text
                          me="auto"
                          color={
                            route.disabled
                              ? gray
                              : activeRoute(route.path.toLowerCase())
                              ? activeColor
                              : 'gray.500'
                          }
                          fontWeight="500"
                          letterSpacing="0px"
                          fontSize="sm"
                        >
                          {route.name}
                        </Text>
                      </Flex>
                    </NavLink>
                  ) : (
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="center"
                      cursor="not-allowed"
                    >
                      <Box
                        opacity="0.4"
                        color={
                          route.disabled
                            ? gray
                            : activeRoute(route.path.toLowerCase())
                            ? activeIcon
                            : inactiveColor
                        }
                        me="12px"
                        mt="6px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        opacity="0.4"
                        me="auto"
                        color={
                          route.disabled
                            ? gray
                            : activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : 'gray.500'
                        }
                        fontWeight="500"
                        letterSpacing="0px"
                        fontSize="sm"
                      >
                        {route.name}
                      </Text>
                      <Link
                        isExternal
                        href="https://horizon-ui.com/ai-template"
                      >
                        <Badge
                          display={{ base: 'flex', lg: 'none', xl: 'flex' }}
                          colorScheme="brand"
                          borderRadius="25px"
                          color="brand.500"
                          textTransform={'none'}
                          letterSpacing="0px"
                          px="8px"
                        >
                          PRO
                        </Badge>
                      </Link>
                    </Flex>
                  )}
                </HStack>
              </Flex>
            ) : (
              <ListItem ms={0} cursor="not-allowed" opacity={'0.4'}>
                <Flex ps="32px" alignItems="center" mb="8px">
                  <Text
                    color={
                      route.disabled
                        ? gray
                        : activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight="500"
                    fontSize="xs"
                  >
                    {route.name}
                  </Text>
                </Flex>
              </ListItem>
            )}
          </>
        );
      }
    });
    */
  };
  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createAccordionLinks = (routes: IRoute[]) => {
    return routes.map((route: IRoute, key: number) => {
      return (
        <ListItem
          ms="28px"
          display="flex"
          alignItems="center"
          mb="10px"
          key={key}
          cursor="not-allowed"
        >
          <Icon
            w="6px"
            h="6px"
            me="8px"
            as={FaCircle}
            color={route.disabled ? gray : activeIcon}
          />
          <Text
            color={
              route.disabled
                ? gray
                : activeRoute(route.path.toLowerCase())
                ? activeColor
                : inactiveColor
            }
            fontWeight={
              activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
            }
            fontSize="sm"
          >
            {route.name}
          </Text>
        </ListItem>
      );
    });
  };
  //  BRAND
  return <>{createLinks(routes, orai, wecoin)}</>;
}

export default SidebarLinks;
