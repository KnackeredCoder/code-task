import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../reducers/app';
import { Sheep } from './sheep';

export function Field() {
  const sheepInField = useSelector((state: AppState) => state.field);

  return (
    <div className="p-3">
      <h2>The Field</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 200px)',
          gap: '5px',
        }}
      >
        {sheepInField.map(v => (
          <Sheep {...v} />
        ))}
      </div>
    </div>
  );
}
