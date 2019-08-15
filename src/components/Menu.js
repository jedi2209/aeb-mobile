import React from "react";
import { theme } from "../core/themeProvider";

import { Text, FlatList } from "react-native";

class Menu extends React.Component {
  render() {
    return (
      <FlatList
        style={styles.linklList}
        data={[{ key: "news" }, { key: "events" }, { key: "publications" }]}
        renderItem={({ item }) => (
          <Text style={[styles.link, theme.whiteLink]}>{item.key}</Text>
        )}
      />
    );
  }
}

const styles = {
  linklList: {
    // maxHeight: 200,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    height: "100%",
    // height: 200
  },
  link: {
    textAlign: "center",
    textTransform: "capitalize",
    lineHeight: 50
  }
};


// font-family: Helvetica;
// font-size: 20px;
// color: #FFFFFF;
// letter-spacing: 0.32px;
// text-align: center;
// line-height: 50px;

export default Menu;
