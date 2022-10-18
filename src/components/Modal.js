import React from 'react';
import {Dialog, DialogContent} from '@mui/material';

const Modal=(props)=>{
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      clickedImg={props.clickedImg}
      maxWidth={'xl'}
    >
      <DialogContent >
        <img
          src={props.clickedImg} alt='bigger image'/>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
