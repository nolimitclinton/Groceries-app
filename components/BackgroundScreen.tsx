import React, { useState, useEffect, ReactNode, isValidElement } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ScrollView,
  Text,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "assets/styles/theme";

const { width, height } = Dimensions.get("window");

interface BackgroundScreenProps {
  children: ReactNode;
  useImageBackground?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  buttonText?: string;
  onButtonPress?: () => void;
  buttonPosition?: number;
  headerButtonImage?: any;
  onHeaderButtonPress?: () => void;
  headerText?: string;
}

const BackgroundScreen: React.FC<BackgroundScreenProps> = ({
  children,
  useImageBackground = false,
  onBack,
  onNext,
  buttonText,
  onButtonPress,
  buttonPosition,
  headerButtonImage,
  onHeaderButtonPress,
  headerText,
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const hasFlatList = React.Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === FlatList
  );

  return (
    <ImageBackground
      source={useImageBackground ? require("assets/images/background.png") : undefined}
      style={[styles.background, !useImageBackground && { backgroundColor: COLORS.bright }]}
      resizeMode="cover"
    >
      {hasFlatList ? (
        <View style={styles.overlay}>
    
          <View style={styles.headerContainer}>
            {onBack && (
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="chevron-back-outline" size={width * 0.06} color="black" />
              </TouchableOpacity>
            )}

            {headerText && <Text style={styles.headerText}>{headerText}</Text>}

            {headerButtonImage && onHeaderButtonPress && (
              <TouchableOpacity style={styles.headerButton} onPress={onHeaderButtonPress}>
                <Image source={headerButtonImage} style={styles.headerButtonImage} />
              </TouchableOpacity>
            )}
          </View>

          {children}

          {onNext && (
            <TouchableOpacity
              style={[styles.nextButton, { bottom: keyboardVisible ? height * 0.34 : height * 0.12 }]}
              onPress={onNext}
            >
              <Ionicons name="chevron-forward-outline" size={width * 0.08} color="white" />
            </TouchableOpacity>
          )}

          {buttonText && onButtonPress && (
            <TouchableOpacity
              style={[
                styles.horizontalButton,
                { bottom: buttonPosition !== undefined ? height * buttonPosition : height * 0.03 },
              ]}
              onPress={onButtonPress}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.overlay}>
         
            <View style={styles.headerContainer}>
              {onBack && (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                  <Ionicons name="chevron-back-outline" size={width * 0.06} color="black" />
                </TouchableOpacity>
              )}

              {headerText && <Text style={styles.headerText}>{headerText}</Text>}
              {headerButtonImage && onHeaderButtonPress && (
                <TouchableOpacity style={styles.headerButton} onPress={onHeaderButtonPress}>
                  <Image source={headerButtonImage} style={styles.headerButtonImage} />
                </TouchableOpacity>
              )}
            </View>

            {children}

            {onNext && (
              <TouchableOpacity
                style={[styles.nextButton, { bottom: keyboardVisible ? height * 0.26 : height * 0.01 }]}
                onPress={onNext}
              >
                <Ionicons name="chevron-forward-outline" size={width * 0.08} color="white" />
              </TouchableOpacity>
            )}

            {buttonText && onButtonPress && (
              <TouchableOpacity
                style={[
                  styles.horizontalButton,
                  { bottom: buttonPosition !== undefined ? height * buttonPosition : height * 0.03 },
                ]}
                onPress={onButtonPress}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.1,
  },
  overlay: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "center",
  },
  headerContainer: {
    position: "absolute",
    top: height * 0.09, 
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },
  backButton: {
    position: "absolute",
    left: width * 0.04,
    zIndex: 1,
  },
  headerText: {
    position: "absolute",
    left: width * 0.25,
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    textAlign: "center",
    zIndex: 1,
  },
  headerButton: {
    position: "absolute",
    right: width * 0.05,
    zIndex: 1,
  },
  headerButtonImage: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: "contain",
  },
  nextButton: {
    position: "absolute",
    right: width * 0.06,
    backgroundColor: COLORS.primary,
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalButton: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.medium,
    color: COLORS.bright,
  },
});

export default BackgroundScreen;