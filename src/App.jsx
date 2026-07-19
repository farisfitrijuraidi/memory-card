import './App.css'
import { useState, useEffect } from 'react';
import luffy from './Assets/luffy.png';
import zoro from './Assets/zoro.avif';
import nami from './Assets/nami.png';
import sanji from './Assets/sanji.webp';
import usopp from './Assets/usopp.webp';
import chopper from './Assets/chopper.avif';
import robin from './Assets/robin.avif';
import franky from './Assets/franky.jpg';
import brook from './Assets/brook.jpg';
import jinbe from './Assets/jinbe.jpeg';

const characterMap = [
  {
    id: 1,
    name: 'Monkey D. Luffy',
    image: luffy
  },
  {
    id: 2,
    name: 'Roronoa Zoro',
    image: zoro
  },
  {
    id: 3,
    name: 'Nami',
    image: nami
  },
  {
    id: 5,
    name: 'Vinsmoke Sanji',
    image: sanji
  },
  {
    id: 6,
    name: 'Tony Tony Chopper',
    image: chopper
  },
  {
    id: 4,
    name: 'Usopp',
    image: usopp
  },
  {
    id: 7,
    name: 'Robin',
    image: robin
  },
  {
    id: 8,
    name: 'Franky',
    image: franky
  },
  {
    id: 9,
    name: 'Brook',
    image: brook
  },
  {
    id: 10,
    name: 'Jinbe',
    image: jinbe
  },
];

export const App = () => {
  

  // useEffect(() => {
  //   const fetchOnePieceCharacter = async () => {
  //     const url = `https://api.jikan.moe/v4/characters/40/pictures`;
  //     try {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error('The server rejected our request');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Failed to fetch One Piece Character :', error);
  //     }
  //   }
  //   fetchOnePieceCharacter();
  // }, [])

  return (
    <>
      {characterMap.map(obj => {
        return <img key={obj.id} src={obj.image}></img>
      })}
    </>
  );
}
