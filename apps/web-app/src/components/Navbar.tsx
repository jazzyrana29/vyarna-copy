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
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { NAV_ROUTE_HOME } from '../constants/routes';
import { getBaseUrl } from 'src/utils/env';

export interface NavItem {
  key: keyof RootStackParamList;
  label: string;
  path: string;
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
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const handleNavigate = (key: keyof RootStackParamList): void => {
    setMenuOpen(false);
    setHoveredGroup(null);
    navigation.navigate(key);
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
              href={`${baseUrl}/${group.path}`}
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
                  href={`${baseUrl}/${child.path}`}
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
          <Pressable onPress={() => setMenuOpen((prev) => !prev)}>
            <FeatherIcon name={menuOpen ? 'x' : 'menu'} size={28} />
          </Pressable>
        ) : (
          <View className="flex-row items-center space-x-4">
            {items.map((group) => renderGroup(group))}
          </View>
        )}
      </View>

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
