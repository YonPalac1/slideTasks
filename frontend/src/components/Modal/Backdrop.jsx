import React from 'react';
import { useDispatch } from 'react-redux';
import { modalAction } from '../../redux/projectsReducer';
import { getTaskAction } from '../../redux/tasksReducer';
import './Backdrop.scss';

export const Backdrop = () => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(modalAction(false))
    dispatch(getTaskAction())
  }
  return (
    <div className='background' onClick={closeModal}></div>
  )
}
