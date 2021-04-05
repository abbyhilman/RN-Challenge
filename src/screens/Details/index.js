import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
  Image,
  RefreshControl,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getDetailPokemon } from "../../redux/action";
import { Ionicons } from "@expo/vector-icons";

const Details = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { pokemon } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const { detailsPokemon } = useSelector((state) => state.homeReducer);

  useEffect(async () => {
    dispatch(setLoading(true));
    dispatch(getDetailPokemon(pokemon));
  }, [dispatch]);

  const [images, setImages] = useState([
    detailsPokemon.sprites ? detailsPokemon.sprites.front_default : "",
    detailsPokemon.sprites ? detailsPokemon.sprites.back_shiny : "",
    detailsPokemon.sprites ? detailsPokemon.sprites.front_default : "",
    detailsPokemon.sprites ? detailsPokemon.sprites.front_shiny : "",
  ]);

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

  return (
    <SafeAreaView style={styles.page}>
      <ImageBackground
        source={require("../../assets/images/bgDetail.png")}
        style={styles.cover}
        imageStyle={{ opacity: 0.3 }}
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
                marginHorizontal: 15,
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
              alignSelf: "flex-end",
              marginLeft: 90,
              marginBottom: 30,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            # {detailsPokemon.base_experience}
          </Text>
        </View>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
            />
          }
          renderItem={({ item, index }) => (
            <Image
              source={{ uri: item }} // Use item to set the image source
              key={index} // Important to set a key for list items
              style={{
                width: 260,
                height: 260,
                margin: 18,
              }}
            />
          )}
        />
      </ImageBackground>

      <View style={styles.content}></View>
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
    paddingHorizontal: 16,
  },
});
