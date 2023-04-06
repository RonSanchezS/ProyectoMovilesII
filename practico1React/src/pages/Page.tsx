import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import { useEffect, useState } from "react";

import Hero from "../assets/icons/hero.svg";
import Villain from "../assets/icons/villain.svg";
import Antihero from "../assets/icons/antihero.svg";
import Alien from "../assets/icons/alien.svg";
import Human from "../assets/icons/human.svg";

import data from "../assets/data/application.json";
import { Heroe } from "../models/Heroe";
import { Viloes } from "../models/Villano";
import { AlienNuevo } from "../models/newAlien";
import { Antiheroe } from "../models/Antiheroes";
import { Humanos } from "../models/Humano";
import { Personaje } from "../models/Personaje";
import HeroCard from "../components/HeroCard/HeroCard";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [isSearchbarVisible, setisSearchbarVisible] = useState(false);

  const [Datos, setDatos] = useState({
    heroes: [],
    villains: [],
    antiHeroes: [],
    aliens: [],
    humans: [],
  });


  const [PersonajeArray, setPersonajeArray] = useState([] as Personaje[]);

  useEffect(() => {
    setDatos(data as any);
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle class="ion-text-center">{name}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={() => setisSearchbarVisible(!isSearchbarVisible)}
            >
              {isSearchbarVisible ? "Cerrar" : "Buscar"}
            </IonButton>
            {isSearchbarVisible && <IonSearchbar></IonSearchbar>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonText>
          <h6>Ben vindo ao Marvel Heroes 2</h6>
          <h4>Escolha o seu personagem</h4>
        </IonText>
        <IonList>
          <IonButton shape="round">
            <IonIcon src={Hero}></IonIcon>
          </IonButton>
          <IonButton shape="round">
            <IonIcon src={Villain}></IonIcon>
          </IonButton>
          <IonButton shape="round">
            <IonIcon src={Antihero}></IonIcon>
          </IonButton>
          <IonButton shape="round">
            <IonIcon src={Alien}></IonIcon>
          </IonButton>
          <IonButton shape="round">
            <IonIcon src={Human}></IonIcon>
          </IonButton>
        </IonList>
        <IonText color="danger">
          <h4>Herois</h4>
        </IonText>
        {Datos &&
          Datos.heroes.map((item: Personaje) => {
            return (
              <HeroCard item = {item}></HeroCard>
            );
          })}
        <IonText color="danger">
          <h4>Viloes</h4>
        </IonText>
        {Datos &&
          Datos.villains.map((item: Personaje) => {
            return (
              <HeroCard item = {item}></HeroCard>
            );
          })}
        <IonText color="danger">
          <h4>Antiheroes</h4>
        </IonText>
        {Datos &&
          Datos.antiHeroes.map((item: Personaje) => {
            return (
              <HeroCard item = {item}></HeroCard>
            );
          })}
        <IonText color="danger">
          <h4>Aliens</h4>
        </IonText>
        {Datos &&
          Datos.aliens.map((item: Personaje) => {
            return (
              <HeroCard item = {item}></HeroCard>
            );
          })}
        <IonText color="danger">
          <h4>Humanos</h4>
        </IonText>
        {Datos &&
          Datos.humans.map((item: Personaje) => {
            return (
              <HeroCard item = {item}></HeroCard>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default Page;
