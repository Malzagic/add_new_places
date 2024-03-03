import PlaceForm from "../components/Places/PlaceForm";
import { insertPlaces } from "../util/database";

export default function AddPlace({ navigation }) {
  const createPlaceHandler = async (place) => {
    await insertPlaces(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
