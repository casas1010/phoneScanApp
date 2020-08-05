import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import ScanAnimation from './ScanAnimation';

class Scan extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    title_name: null,
    itemURL: null,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.barCode]}
        >
          {/* <View style={styles.barCodeSight} /> */}
          <ScanAnimation/>

          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => this.setState({ scanned: false })}
            />
          )}
        </BarCodeScanner>
      </View>
    );
  }


  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.getItem(data);

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  barCode: {
    justifyContent: "center",
    alignItems: "center",
  },
  barCodeSight: {
    width: 150,
    height: 150,
    paddingLeft: 30,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default connect(null, actions)(Scan);
