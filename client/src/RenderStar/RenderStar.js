import React from 'react';
import star from './star.svg'

class Renderstar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
   
    render() { 
        return ( <><img src={star}></img></>);
    }
}
 
export default Renderstar;