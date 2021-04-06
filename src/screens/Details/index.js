import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  View,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import ProgressBar from "react-native-animated-progress";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getDetailPokemon } from "../../redux/action";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import Svg, { Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

const Details = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { pokemon } = route.params;
  const { detailsPokemon } = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [randomColor, setRandomColor] = useState(null);
  const { width, height } = Dimensions.get("window");
  const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
  const scrollX = useRef(new Animated.Value(0)).current;
  const BACKDROP_HEIGHT = height * 0.65;
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const getRandomColor = () => {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")"
    );
  };

  useEffect(async () => {
    await dispatch(setLoading(true));
    await dispatch(getDetailPokemon(pokemon));
    setRandomColor(getRandomColor);
  }, [dispatch]);

  const images = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${detailsPokemon.id}.png`,
  ];

  const imageBack = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${detailsPokemon.id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${detailsPokemon.id}.png`,
  ];

  useEffect(async () => {});
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(setLoading(true));
    dispatch(getDetailPokemon(pokemon));
    wait(200).then(() => setRefreshing(false));
  }, [dispatch]);

  const Backdrop = ({ image, scrollX }) => {
    return (
      <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
        <FlatList
          data={image}
          keyExtractor={(item, index) => index}
          removeClippedSubviews={false}
          contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
          renderItem={({ item, index }) => {
            if (!item) {
              return null;
            }

            

            const translateX = scrollX.interpolate({
              inputRange: [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
              ],
              outputRange: [-width, 0],
            });
            return (
              <MaskedView
                style={{ position: "absolute" }}
                maskElement={
                  <AnimatedSvg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ transform: [{ translateX }] }}
                  >
                    <Rect
                      x="0"
                      y="0"
                      width={width}
                      height={height}
                      fill="red"
                    />
                  </AnimatedSvg>
                }
              >
                <Image
                  source={{ uri: item }}
                  key={index}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    resizeMode: "cover",
                  }}
                />
              </MaskedView>
            );
          }}
        />
        <LinearGradient
          colors={["transparent", "white"]}
          style={{
            width,
            height: BACKDROP_HEIGHT,
            position: "absolute",
            bottom: 0,
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.page}>
      <Backdrop image={imageBack} scrollX={scrollX} />
      <ImageBackground
        //source={require("../../assets/images/bgDetail.png")}
        style={styles.cover}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="stretch"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="heart-outline" color={"black"} size={30} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: "black",
                marginLeft: 10,
              }}
            >
              {detailsPokemon.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: "5%",
                paddingLeft: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#fafafa",
                  width: 80,
                  height: 30,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    padding: 5,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {detailsPokemon.types
                    ? detailsPokemon.types[0].type.name
                    : ""}
                </Text>
              </View>

              {detailsPokemon.types ? (
                detailsPokemon.types[1] ? (
                  <View
                    style={{
                      backgroundColor: "#fafafa",
                      width: 80,
                      height: 30,
                      borderRadius: 12,
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 5,
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {detailsPokemon.types[1].type.name}
                    </Text>
                  </View>
                ) : null
              ) : null}
            </View>
          </View>
          <Text
            style={{
              alignSelf: "center",
              marginLeft: "80%",
              fontWeight: "bold",
              fontSize: 18,
              position: "absolute",
            }}
          >
            # {detailsPokemon.base_experience}
          </Text>
        </View>

        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(item, index) => index}
          snapToInterval={ITEM_SIZE}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
          renderToHardwareTextureAndroid
          snapToAlignment='start'
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
            />
          }
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [100, -50, 100],
              extrapolate: 'clamp',
            });
            return (
              <View style={{ width: ITEM_SIZE }}>
                <Animated.View
                  style={{
                    marginHorizontal: 40,
                    marginTop: 25,
                    position: "absolute",
                    transform: [{ translateY }],
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    key={index}
                    style={{
                      width: 260,
                      height: 260,
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 7 },
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      overflow: "hidden",
                    }}
                  />
                </Animated.View>
              </View>
            );
          }}
        />
      </ImageBackground>

      <View style={styles.content}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 24}}>Basic Stat</Text>
        <FlatList
          data={detailsPokemon.stats}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            if (!item) {
              return null;
            }
            return (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{fontWeight: '500', fontSize: 14}}>{item.stat.name}</Text>
                  <View style={{ width: 170, position: 'relative'}}>
                    <ProgressBar
                      progress={item.base_stat}
                      height={7}
                      backgroundColor={randomColor}
                    />
                  </View>
                  <Text style={{position: 'absolute', alignSelf: 'center', marginHorizontal: '40%', fontWeight: 'bold'}}>{item.base_stat}</Text>
                </View>
              </>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cover: {
    height: 450,
    paddingTop: 26,
    paddingLeft: 22,
  },
  back: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30 / 3,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 24,
  },
});
