import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getDataPokemon } from "../../redux/action";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state.homeReducer);
  const [detail, setDetails] = useState([]);
  console.log(JSON.stringify(pokemons, null, 4), "pokemons");

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getDataPokemon());
    pokemons.map((pokemonUrl) => {
      fetch(pokemonUrl.url)
        .then((resUrl) => resUrl.json())
        .then((dataUrl) => {
          var temp = detail;
          temp.push(dataUrl);
          setDetails(dataUrl);
        })
        .catch(console.log);
    });
  }, [dispatch]);

  console.log(detail);

  const Item = ({ name, url }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{url}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item name={item.name} url={item.url} />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
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
});
