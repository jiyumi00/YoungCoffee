import React, {Component} from 'react';

// Components
import Image from '../common/Image';

// (희애) 커스텀 arrow 컴포넌트 생성
export default class CustomArrow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.direction === 'left' ? (
      <Image
        style={{width: 14, height: 14}}
        source={require('../../assets/images/calender_buttons/left_button/left_button.png')}
      />
    ) : (
      <Image
        style={{width: 14, height: 14}}
        source={require('../../assets/images/calender_buttons/right_button/right_button.png')}
      />
    );
  }
}
