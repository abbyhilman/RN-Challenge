import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// import {
//   IcDeliveryOff,
//   IcDeliveryOn,
//   IcHome,
//   IcHomeOff,
//   IcOrder,
//   IcOrderOff,
//   IcProfile,
//   IcProfileOff,
//   IcSearchOff,
//   IcSearchOn,
// } from '../../../assets';
// import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const BottomNavigator = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  //const {count} = useSelector((state) => state.cartReducer);
  //const {baskets} = useSelector((state) => state.countReducer);

  const Icon = ({label, focus}) => {
    switch (label) {
      case 'Home':
        return focus ? <Ionicons name="ios-home" size={20}/> : <Ionicons name="home-outline" size={20}/>;
      case 'Favourites':
        return focus ? <Ionicons name="heart" size={20}/> : <Ionicons name="heart-circle-outline" size={20}/>;
      // case 'Profile':
      //   return focus ? <IcProfile /> : <IcProfileOff />;
      // case 'Search':
      //   return focus ? <IcSearchOn /> : <IcSearchOff />;
      // case 'Keranjang':
      //   return focus ? (
      //     <View style={styles.iconRow}>
      //       <IcOrder />
      //       {count < 1 ? null : (
      //         <Badge
      //           value={count}
      //           status="error"
      //           containerStyle={styles.badgeStyle}
      //         />
      //       )}
      //     </View>
      //   ) : (
      //     <View style={styles.iconRow}>
      //       <IcOrderOff />
      //       {count < 1 ? null : (
      //         <Badge
      //           value={count}
      //           status="error"
      //           containerStyle={styles.badgeStyle}
      //         />
      //       )}
      //     </View>
      //   );
      default:
        return <Ionicons name="ios-home"/>;
    }
  };

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 80,
    justifyContent: 'space-between',
  },
  iconRow: {flexDirection: 'row'},
});
