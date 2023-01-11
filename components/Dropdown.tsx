import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type types = {
  items: { label?: string; value: any }[];
  placeholder?: string;
  index?: number;
  value?: any;
  setIndex?: (index: number) => void;
  setValue?: (value: any) => void;
}

export default function Dropdown({
  items,
  placeholder = "",
  index = -1,
  value,
  setIndex = () => {},
  setValue = () => {},
}: types) {
  if (index === -1 && value !== undefined) {
    setIndex(items.findIndex((item) => item.value === value));
  }
  items.forEach((item, i) => {
    if (item.label === undefined) {
      items[i].label = item.value;
    } else {
      items[i].label = item.label;
    }
  });

  const [thisIndex, setThisIndex] = useState(index);
  const [open, setOpen] = useState(false);
  const ref = useRef<TouchableOpacity>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.measure((x, y, width, height) => {
        if (ref.current && height > 0) {
          ref.current.setNativeProps({
            style: {
              borderRadius: height / 2,
            },
          })
        }
      });
    }
  }, [ref, ref.current, open]);

  useEffect(() => {
    setIndex(thisIndex);
  }, [thisIndex, setIndex]);

  useEffect(() => {
    if (value) setThisIndex(items.findIndex((item) => item.value === value));
  }, [value, items]);

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={[
          styles.dropdownButton,
          open && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        ]}
        activeOpacity={1}
        ref={ref}
      >
        <Text>{thisIndex === -1 ? placeholder : items[thisIndex].label}</Text>
        <View style={[styles.arrow, open && styles.arrowOpen]} />
      </TouchableOpacity>
      {open && (
        <ScrollView style={styles.dropdownContent}>
          {items.map((item, currentIndex) => (
            <TouchableOpacity
              key={item.value}
              style={styles.dropdownItem}
              onPress={() => {
                setThisIndex(currentIndex);
                setValue(item.value);
                setOpen(false);
              }}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "relative",
    verticalAlign: "middle",
    flex: 1,
  },
  dropdownButton: {
    padding: 10,
    flex: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 1000,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderStyle: "solid",
    position: "absolute",
    right: 16,
    marginTop: -3,
    borderBottomColor: "black",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  arrowOpen: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgray",
    maxHeight: 145,
    overflow: "scroll",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  hidden: {
    display: "none",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    height: 36,
  },
});
