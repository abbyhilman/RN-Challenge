import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getDataPokemon } from "../../redux/action";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  const[data, setData] = useState([])
  const [searchfeild, setSearchfeild] = useState("");
  const [limit, setLimit] = useState(24);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDataPokemon(limit, offset));
  }, [dispatch]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const handleSearch = (text) => {
    const newData = pokemons.filter(item => {
      const itemData = item.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1
    });
    setData(newData)
    setSearchfeild(text)
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    var RandomNumberLimit = Math.floor(Math.random() * 30) + 1;
    var RandomNumberOffset = Math.floor(Math.random() * 100) + 2;
    dispatch(
      getDataPokemon(limit + RandomNumberLimit, offset + RandomNumberOffset)
    );
    wait(200).then(() => setRefreshing(false));
  }, [dispatch]);

  const Item = ({ pokemon }) => (
    <TouchableOpacity disabled style={styles.card}>
      <ImageBackground
        source={require("../../assets/images/bgPokemon.png")}
        style={{
          height: 250,
          width: 150,
          opacity: 0.6,
          position: "absolute",
        }}
        imageStyle={{ borderRadius: 15 }}
        resizeMode={"cover"}
      />
      <Text
        style={{
          alignSelf: "flex-start",
          padding: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {pokemon.name}
      </Text>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", { pokemon: pokemon.name })
          }
          style={{ padding: 10, alignSelf: "flex-end" }}
        >
          <Ionicons size={25} name="document-text-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Share")}
          style={{ padding: 10, alignSelf: "flex-end" }}
        >
          <Ionicons size={25} name="share-social-outline" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item pokemon={item} />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search Pokemons"
          onChangeText={(value) => handleSearch(value)}
          value={searchfeild}
          autoCorrect={false}
        />
      </View>
        <FlatList
          numColumns={2}
          style={{ flex: 1 }}
          data={data.length > 0 ? data : pokemons}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
            />
          }
        />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
  },
  searchCont: {
    marginBottom: 20,
    left: "20%",
    zIndex: 1,
    marginTop: 10,
  },
  searchfeild: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: 250,
    borderRadius: 50,
  },
  card: {
    display: "flex",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 24,
  },
});
