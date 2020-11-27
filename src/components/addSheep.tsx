import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SheepType } from '../lib';
import { AppActions } from '../actions';

export function AddSheep() {
  const dispatch = useDispatch();
  const [type, setType] = useState<SheepType>('male');
  const [name, setName] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const validateName = (nameToCheck: string) =>
    /^[a-zA-Z\d\s]+$/.test(nameToCheck);

  return (
    <div className="border p-3" style={{ margin: '10px', width: '450px' }}>
      <h3>Add a new sheep</h3>
      <div className="form-row">
        <div className="form-group mr-3">
          <input
            type="text"
            className="form-control w-full"
            placeholder="Sheep name"
            onChange={evt => setName(evt.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <select
            value={type}
            onChange={evt => setType(evt.target.value as SheepType)}
            className="form-control w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          const trimmedName = name.trim();
          if (!validateName(trimmedName)) {
            setShowWarning(true);
            return;
          }

          dispatch(AppActions.addSheep(trimmedName, type));
          setName('');
          setShowWarning(false);
        }}
      >
        Add
      </button>
      {showWarning && (
        <div className="alert alert-primary mt-3">
          Invalid name, please don't use symbols
        </div>
      )}
    </div>
  );
}
