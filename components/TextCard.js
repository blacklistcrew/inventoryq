import React from 'react';
import {TouchableRipple, List, Colors, IconButton} from 'react-native-paper';
import {Text} from 'react-native';

const TextCard = ({
  title,
  desc,
  icon,
  right,
  rightComponent,
  onPress,
  iconPress,
}) => (
  <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={onPress}>
    <List.Item
      title={title}
      description={desc}
      left={() => (
        <IconButton
          icon={icon}
          size={30}
          color="grey"
          onPress={iconPress && iconPress}
        />
      )}
      right={() => {
        const render = right ? (
          <Text style={style.textHarga}>{right}</Text>
        ) : rightComponent ? (
          rightComponent
        ) : null;
        return render;
      }}
    />
  </TouchableRipple>
);

const style = {
  textHarga: {
    alignSelf: 'center',
    marginHorizontal: 10,
    color: Colors.green500,
    fontWeight: 'bold',
    fontSize: 20,
  },
};

export default TextCard;
