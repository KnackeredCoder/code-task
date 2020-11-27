import React from 'react';
import { SheepType } from '../lib';
import sheepImg from '../images/sheep.png';
import brandedSheepImg from '../images/branded-sheep.png';

export interface SheepProps {
  name: string;
  type: SheepType;
  branded?: boolean;
}

export function Sheep({ name, type, branded = false }: SheepProps) {
  return (
    <div
      className="card"
      style={{
        width: '100%;',
      }}
    >
      <img
        className="card-img-top"
        src={branded ? brandedSheepImg : sheepImg}
        alt="Card image cap"
      />
      <div
        className="card-body border-top"
        style={{
          backgroundColor: branded ? '#0c0' : '#fff',
          color: branded ? '#fff' : '#000',
        }}
      >
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{type === 'female' ? 'Female' : 'Male'}</p>
      </div>
    </div>
  );
}
