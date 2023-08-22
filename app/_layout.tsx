import React from "react";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useDeviceContext } from "twrnc";

import tw from "@/lib/tailwind";

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
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="modal"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
