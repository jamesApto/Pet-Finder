import React from 'react';

interface Props {
  name: string;
  toggleModal: () => void;
}

const AdoptModalContent = (props: Props) => (
  <React.Fragment>
    <h1>Would you like to adopt {props.name}?</h1>
    <div className="buttons">
      <button onClick={props.toggleModal}>Yes</button>
      <button onClick={props.toggleModal}>Hell Yes</button>
    </div>
  </React.Fragment>
);

export default AdoptModalContent;