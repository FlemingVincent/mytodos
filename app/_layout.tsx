import React from "react";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useDeviceContext } from "twrnc";

import tw from "@/lib/tailwind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useDeviceContext(tw);

	const [loaded, error] = useFonts({
		"OpenRunde-Regular": require("../assets/fonts/OpenRunde-Regular.otf"),
		"OpenRunde-Medium": require("../assets/fonts/OpenRunde-Medium.otf"),
		"OpenRunde-Semibold": require("../assets/fonts/OpenRunde-Semibold.otf"),
		"OpenRunde-Bold": require("../assets/fonts/OpenRunde-Bold.otf"),
	});

	React.useEffect(() => {
		if (error) throw error;
	}, [error]);

	React.useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	if (!loaded) return null;

	return (
		<GestureHandlerRootView style={tw`flex-1`}>
			<BottomSheetModalProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
