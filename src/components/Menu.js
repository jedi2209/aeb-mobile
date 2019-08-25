import React from "react";
import { theme } from "../core/themeProvider";

import { Text, SectionList, Dimensions, TouchableOpacity } from "react-native";

const menuItems = ["News", "Events", "Publications", "Releases" ,"Committees", "Contacts"];

const menuItemsBottom = ["settings"];

const { width } = Dimensions.get("window");

class Menu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <SectionList
        style={styles.linklList}
        sections={[
          { title: "", data: menuItems },
          { title: "", data: menuItemsBottom }
        ]}
        renderSectionHeader={() => (
          <Text style={{ height: width * 0.15 }}>{}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigate(item)}>
            <Text style={[styles.link, theme.whiteLink]}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

const styles = {
  linklList: {
    height: "100%"
  },
  link: {
    textAlign: "center",
    textTransform: "capitalize"
  }
};

export default Menu;
