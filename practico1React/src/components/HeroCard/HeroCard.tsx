import { IonCard, IonCardContent, IonCardHeader, IonItem, IonText } from "@ionic/react";
import { Personaje } from "../../models/Personaje";
import { Link } from "react-router-dom";
interface Props {
    item: Personaje;
  }

const HeroCard: React.FC<Props> = ({ item }) => {
    const queryString = `?data=${encodeURIComponent(JSON.stringify(item))}`;


  return (
    <Link to={`/detail/${queryString}`}>
      <IonItem>
        <IonCard>
          <IonCardHeader></IonCardHeader>
          <IonCardContent>
            <IonText>
              <h4>{item.alterEgo}</h4>
              <h2>{item.name}</h2>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonItem>
    </Link>
  );
};

export default HeroCard;
