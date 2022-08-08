import * as React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const defaultOrigin = {
  x: width / 4,
  y: height / 3,
};

const defaultSize = {
  width: width / 2,
  height: width / 2,
};

const QrCodeScanner = (props: any) => {
  const {
    borderLength,
    color,
    borderSize,
    radius,
    shape,
    origin,
    size,
    borderOffSet,
  } = props;

  const [position, setPosition] = useState(defaultOrigin);
  const [dimensions, setDimensions] = useState(defaultSize);

  React.useEffect(() => {
    setPosition(origin);
  }, [origin]);

  React.useEffect(() => {
    setDimensions(size);
  }, [size]);

  return (
    <View style={styles.container}>
        {shape === "square" ? (
          <View
            style={{
              top: position.y,
              left: position.x,
              width: dimensions.x,
              height: dimensions.y,
              borderColor: color,
              borderRadius: radius,
              borderWidth: borderSize,
              position: "absolute",
            }}
          />
        ) : (
          <View
            style={{
              top: position.y,
              left: position.x,
              width: dimensions.width,
              height: dimensions.height,
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: -borderOffSet,
                left: -borderOffSet,

                height: borderLength,
                width: borderLength,
                borderColor: color,
                borderLeftWidth: borderSize,
                borderTopWidth: borderSize,
                borderTopLeftRadius: radius,
              }}
            ></View>
            <View
              style={{
                transform: [
                  {
                    rotate: "90deg",
                  },
                ],
                position: "absolute",

                top: -borderOffSet,
                right: -borderOffSet,
                height: borderLength,
                width: borderLength,
                borderColor: color,
                borderLeftWidth: borderSize,
                borderTopWidth: borderSize,
                borderTopLeftRadius: radius,
              }}
            ></View>
            <View
              style={{
                transform: [
                  {
                    rotate: "180deg",
                  },
                ],
                position: "absolute",
                bottom: -borderOffSet,
                right: -borderOffSet,
                height: borderLength,
                width: borderLength,
                borderColor: color,
                borderLeftWidth: borderSize,
                borderTopWidth: borderSize,
                borderTopLeftRadius: radius,
              }}
            ></View>
            <View
              style={{
                transform: [
                  {
                    rotate: "270deg",
                  },
                ],
                position: "absolute",
                bottom: -borderOffSet,
                left: -borderOffSet,
                height: borderLength,
                width: borderLength,
                borderColor: color,
                borderLeftWidth: borderSize,
                borderTopWidth: borderSize,
                borderTopLeftRadius: radius,
              }}
            ></View>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QrCodeScanner;
