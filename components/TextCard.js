import React from "react";
import { TouchableRipple, List, Colors } from "react-native-paper";
import { Text } from "react-native";

export default function TextCard({
  title,
  desc,
  icon,
  right,
  rightComponent,
  onPress,
}) {
  return (
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={onPress}>
      <List.Item
        title={title}
        description={desc}
        left={(props) => <List.Icon {...props} icon={icon} />}
        right={() => {
          const render = right ? (
            <Text style={{ margin: 10, color: Colors.green500 }}>{right}</Text>
          ) : rightComponent ? (
            rightComponent
          ) : null;
          return render;
        }}
      />
    </TouchableRipple>
  );
}
