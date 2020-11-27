import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions } from '../actions';
import { selectUnbrandedSheep, Sheep, breed } from '../lib';
import { AppState } from '../reducers/app';

export function FieldActions() {
  const dispatch = useDispatch();
  const sheepInField = useSelector((state: AppState) => state.field);
  const [status, setStatus] = useState('');

  const withResetStatus = (handler: () => void) => {
    return () => {
      setStatus('');
      handler();
    };
  };

  return (
    <>
      <div className="p-3" style={{ margin: '10px', width: '400px' }}>
        <button
          type="button"
          className="btn btn-success"
          onClick={withResetStatus(() => {
            const sheepToBrand = selectUnbrandedSheep(sheepInField) as Sheep[];

            if (sheepToBrand.length === 0) return; // Show some kind of warning here

            dispatch(AppActions.brandSheep(sheepToBrand[0]));
          })}
        >
          Brand
        </button>{' '}
        <button
          type="button"
          className="btn btn-dark"
          onClick={withResetStatus(() => {
            const children = breed(sheepInField);
            setStatus('');

            if (children.length === 0) {
              setStatus('Breeding attempt failed!');
            }

            const { name, type } = children[0];

            dispatch(AppActions.addSheep(name, type));
          })}
        >
          Attempt to breed!
        </button>{' '}
        <button
          type="button"
          className="btn btn-danger"
          onClick={withResetStatus(() => dispatch(AppActions.clearField()))}
        >
          Clear Field
        </button>
        {status !== '' && (
          <div className="alert alert-primary mt-3">{status}</div>
        )}
      </div>
    </>
  );
}
