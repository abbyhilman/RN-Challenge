import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getDataPokemon } from "../../redux/action";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(16);
  const [offset, setOffset] = useState(11);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  useEffect(async () => {
    dispatch(setLoading(true));
    dispatch(getDataPokemon(limit, offset));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setLoading(true));
    setLimit(1 + limit);
    setOffset(1 + offset);
    dispatch(getDataPokemon(limit, offset));
    wait(200).then(() => setRefreshing(false));
  }, [dispatch]);

  //   console.log(JSON.stringify(detail, null, 4), "detailPokemonAgain");

  const Item = ({ pokemon }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.card}
      onPress={() =>
        // navigation.navigate("Detail", {
        //   pokemon: pokemon.name,
        // })
        {}
      }
    >
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
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item pokemon={item} />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search Pokemons"
          onChangeText={(value) => setSearchfeild(value)}
          value={searchfeild}
        />
      </View> */}
      <FlatList
        numColumns={2}
        data={pokemons}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
            />}
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
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  searchCont: {
    marginBottom: 70,
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
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "green",
    borderRadius: 15,
  },
});
