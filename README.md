## Installation

### Install library from npm:

```bash
npm install scanner-box
```

## Props

1. cornerLength - set the length for the bounding corners
2. color - set the colour of the bounding box
3. borderSize - set the width of the box border
4. radius - set the radius of the border
5. shape - set the shape to either a square or 4 corners
6. origin - set the x,y coordinates for the origin for the bounding box
7. size - set the height and width for the bounding box
8. borderOffSet - set an offset between the bounding box and the QR code

## Usage

The following code uses expo-barcode-scanner for the barcode scanner

```jsx
import * as React from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import QrCodeScanner from "./QrCodeScanner";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

export default function App() {
  const [boundOrigin, setBoundOrigin] = useState({ x: 0, y: 0 });
  const [boundSize, setBoundSize] = useState({ x: 0, y: 0 });
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    askForCameraPermission();
  });

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data, bounds } = scanningResult;

      if (bounds) {
        setBoundOrigin({ x: bounds.origin.x, y: bounds.origin.y });
        setBoundSize({ width: bounds.size.width, height: bounds.size.height });
      }

      setScanned(true);

      setTimeout(() => {
        setScanned(false);
      }, 1000);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button onPress={() => askForCameraPermission()} title="Test">
          Allow Camera
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.scan]}
      ></BarCodeScanner>

      <QrCodeScanner
        cornerLength={20}
        color="blue"
        borderSize={10}
        radius={30}
        shape="corners"
        origin={boundOrigin}
        size={boundSize}
        borderOffSet={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

The scanner-box component usage is like below

````jsx
 <QrCodeScanner
        cornerLength={20}
        color="blue"
        borderSize={10}
        radius={30}
        shape="corners"
        origin={boundOrigin}
        size={boundSize}
        borderOffSet={5}
/>

````


