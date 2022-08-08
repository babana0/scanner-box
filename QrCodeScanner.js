import * as React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Button,
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
  const { borderLength, color, borderSize, radius, shape, origin, size, borderOffSet} = props;

  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const [position, setPosition] = useState(defaultOrigin);
  const [dimensions, setDimensions] = useState(defaultSize)
  

  React.useEffect(() => {
    setPosition(origin);
  }, [origin])

  React.useEffect(() => {
    setDimensions(size);
  }, [size])

//   const [boundOrigin, setBoundOrigin] = useState(defaultOrigin);
// const boundSize = {
//   width: width / 2,
//   height: width / 2,
// };

  function moveBox() {
    Animated.timing(value, {
      toValue: { x: boundOrigin.x, y: boundOrigin.y },
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

//   useEffect(() => {
//     askForCameraPermission();
//   });

//   const askForCameraPermission = () => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status == "granted");
//     })();
//   };

//   const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
//     if (!scanned) {
//       const { type, data, bounds } = scanningResult;

//       if (bounds) {
//         setBoundOrigin({ x: bounds.origin.x, y: bounds.origin.y });
//         setBoundSize({ width: bounds.size.width, height: bounds.size.height });
//       }

//       setScanned(true);

//       setTimeout(() => {
//         setScanned(false);
//       }, 1000);
//     }
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting for camera permission</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ margin: 10 }}>No access to camera</Text>
//         <Button onPress={() => askForCameraPermission()} title="Test">
//           Allow Camera
//         </Button>
//       </View>
//     );
//   }

  return (
    <View style={styles.container}>
      {/* <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.scan]}
      ></BarCodeScanner> */}

      <Animated.View style={value.getLayout()}>
        
        {shape === 'square'? (<View
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
          />): (
        <View
          style={{
            top: position.y,
            left: position.x,
            width: dimensions.width ,
            height: dimensions.height ,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -borderOffSet ,
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

              top:  -borderOffSet,
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QrCodeScanner;
