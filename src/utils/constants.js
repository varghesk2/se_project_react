import tshirtImg from "../images/T-Shirt.png";
import shortsImg from "../images/Shorts.png";
import capImg from "../images/Cap.png";
import sneakersImg from "../images/Sneakers.png";

export const API_KEY = "429deac8c7907c023c4376db875fcdd5";

export const coordinates = {
  lat: 40.7128,
  lon: -74.006,
};

export const defaultClothingItems = [
  {
    _id: 1,
    name: "T-Shirt",
    weather: "hot",
    imageUrl: tshirtImg,
  },
  {
    _id: 2,
    name: "Shorts",
    weather: "cold",
    imageUrl: shortsImg,
  },
  {
    _id: 3,
    name: "Cap",
    weather: "warm",
    imageUrl: capImg,
  },
  {
    _id: 4,
    name: "Sneakers",
    weather: "hot",
    imageUrl: sneakersImg,
  },
];

