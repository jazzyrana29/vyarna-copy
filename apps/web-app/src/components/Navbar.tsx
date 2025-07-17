//@ts-nocheck
import React, { JSX, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { NAV_ROUTE_HOME, NAV_ROUTE_LOGIN } from '../constants/routes';
import { getBaseUrl, joinUrlParts } from 'src/utils/env';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { shallow } from 'zustand/shallow';

export interface NavItem {
  key: keyof RootStackParamList;
  label: string;
  path?: string;
  children?: NavItem[];
}

interface NavbarProps {
  items: NavItem[];
}

const baseUrl = getBaseUrl();

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  let navigation: NativeStackNavigationProp<RootStackParamList> | null = null;
  let currentRoute: string | null = null;

  try {
    navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    currentRoute = useNavigationState(
      (state) => state?.routes[state?.index]?.name,
    );
  } catch (error) {
    // We're outside a navigator – fail silently
    console.log(`We're outside a navigator – fail silently error=${error}`);
  }

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const openCart = useCartStore((s) => s.openCart);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const userDetails = useUserStore((s) => s.userDetails, shallow);
  const logout = useUserStore((s) => s.logout);
  const hasUser = isLoggedIn;

  const handleNavigate = (key: keyof RootStackParamList): void => {
    setMenuOpen(false);
    setHoveredGroup(null);
    navigation.navigate(key);
  };

  const getPathFromKey = (key: keyof RootStackParamList): string => {
    if (key === NAV_ROUTE_HOME) {
      return '';
    }
    return String(key)
      .toLowerCase()
      .replace('vyarna - ', '')
      .replace(/\s+/g, '-')
      .replace(/^\/+/, '');
  };

  const renderGroup = (group: NavItem): JSX.Element => {
    const isActive = currentRoute === group.key && !!currentRoute;
    const isOpen = hoveredGroup === group.label;
    const hasChildren = !!group.children?.length;

    return (
      <View
        key={group.key}
        className="relative"
        onMouseEnter={() => !isMobile && setHoveredGroup(group.label)}
        onMouseLeave={() => !isMobile && setHoveredGroup(null)}
      >
        <Pressable
          onPress={() => {
            if (isMobile || !group.children?.length) {
              handleNavigate(group.key);
            }
          }}
        >
          <View className="px-4 py-2 flex-row items-center space-x-1">
            <Text
              onPress={() => handleNavigate(group.key)}
              accessibilityRole="link"
              href={joinUrlParts(baseUrl, group.path ?? getPathFromKey(group.key))}
              className={isActive ? 'font-bold text-primary' : 'font-medium'}
            >
              {group.label}
            </Text>
            {hasChildren && (
              <Text className="text-gray-500 text-xs">
                {isMobile ? '' : '▼'}
              </Text>
            )}
          </View>
        </Pressable>

        {!isMobile && hasChildren && isOpen && (
          <View
            className="absolute top-full left-0 bg-white rounded-md shadow-lg border w-56 z-50"
            onMouseEnter={() => setHoveredGroup(group.label)}
            onMouseLeave={() => setHoveredGroup(null)}
          >
            {group.children.map((child) => (
              <Pressable
                key={child.key}
                onPress={() => handleNavigate(child.key)}
              >
                <Text
                  accessibilityRole="link"
                  href={joinUrlParts(baseUrl, child.path ?? getPathFromKey(child.key))}
                  className={`px-4 py-2 text-sm ${
                    currentRoute === child.key
                      ? 'text-primary font-semibold'
                      : 'text-gray-800'
                  }`}
                >
                  • {child.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="w-full bg-white border-b border-gray-200 z-50">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => navigation.navigate(NAV_ROUTE_HOME)}>
          <Image
            source={require('../assets/images/logo-full.png')}
            style={{ width: 120, height: 40 }}
            resizeMode="contain"
          />
        </Pressable>

        {isMobile ? (
          <View className="flex-row items-center space-x-4">
            <Pressable onPress={openCart} className="relative">
              <FeatherIcon name="shopping-cart" size={24} />
              {getItemCount() > 0 && (
                <View className="absolute -top-1 -right-2 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
                  <Text className="text-white text-[10px]">
                    {getItemCount()}
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => setUserOpen(true)}>
              <FeatherIcon name={hasUser ? 'user' : 'user-x'} size={24} />
            </Pressable>
            <Pressable onPress={() => setMenuOpen((prev) => !prev)}>
              <FeatherIcon name={menuOpen ? 'x' : 'menu'} size={28} />
            </Pressable>
          </View>
        ) : (
          <View className="flex-row items-center space-x-4">
            {items.map((group) => renderGroup(group))}
            <Pressable onPress={openCart} className="relative">
              <FeatherIcon name="shopping-cart" size={20} />
              {getItemCount() > 0 && (
                <View className="absolute -top-1 -right-2 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
                  <Text className="text-white text-[10px]">
                    {getItemCount()}
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => setUserOpen(true)}>
              <FeatherIcon name={hasUser ? 'user' : 'user-x'} size={20} />
            </Pressable>
          </View>
        )}
      </View>

      {/* User popover */}
      <Modal
        transparent
        animationType="fade"
        visible={userOpen}
        onRequestClose={() => setUserOpen(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setUserOpen(false)}
        >
          <View className="bg-white p-4 rounded-lg w-72">
            {!isLoggedIn ? (
              <TouchableOpacity onPress={() => { setUserOpen(false); navigation.navigate(NAV_ROUTE_LOGIN); }}>
                <Text className="text-primary text-center">Login</Text>
              </TouchableOpacity>
            ) : (
              <View className="items-center">
                <View className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center mb-2" />
                <Text className="font-semibold text-lg text-center mb-1">
                  {`${userDetails?.nameFirst ?? ''}${userDetails?.nameMiddle ? ' ' + userDetails?.nameMiddle : ''} ${userDetails?.nameLastFirst ?? ''}${userDetails?.nameLastSecond ? ' ' + userDetails?.nameLastSecond : ''}`.trim()}
                </Text>
                <Text className="mb-4 text-center">{userDetails?.email}</Text>
                <TouchableOpacity onPress={() => { logout(); setUserOpen(false); }} className="px-4 py-2 bg-primary rounded">
                  <Text className="text-white">Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Mobile menu */}
      {isMobile && (
        <Modal
          transparent
          animationType="fade"
          visible={menuOpen}
          onRequestClose={() => setMenuOpen(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
            onPress={() => setMenuOpen(false)}
          >
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginTop: 60,
              }}
            >
              <FlatList
                data={items}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <View>
                    <Pressable onPress={() => handleNavigate(item.key)}>
                      <Text className="font-bold text-lg py-2">
                        {item.label}
                      </Text>
                    </Pressable>
                    {item.children?.map((child) => (
                      <Pressable
                        key={child.key}
                        onPress={() => handleNavigate(child.key)}
                      >
                        <Text className="pl-4 py-1 text-sm text-gray-600">
                          • {child.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default Navbar;
