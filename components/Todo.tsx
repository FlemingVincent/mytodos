import React from "react";
import { Text, Pressable, View } from "react-native";

import { Image } from "expo-image";
import Animated from "react-native-reanimated";

import tw from "@/lib/tailwind";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TodoProps extends React.ComponentProps<typeof AnimatedPressable> {
	index: number;
	length: number;
	title: string;
	description: string;
	completed: boolean;
	key: React.Key;
}

export const Todo = ({
	index,
	length,
	title,
	description,
	completed,
	...props
}: TodoProps) => {
	return (
		<AnimatedPressable
			style={[
				tw`flex flex-row justify-between py-2`,
				description && tw`items-start`,
			]}
			{...props}
		>
			<View style={tw`flex-1`}>
				<Text style={[tw`body text-neutral-950`, completed && tw`opacity-50`]}>
					{title}
				</Text>
				{description && (
					<Text
						style={[
							tw`subheadline text-neutral-500`,
							completed && tw`opacity-50`,
						]}
					>
						{description}
					</Text>
				)}
			</View>
			<Image
				style={tw`w-6 h-6 ml-2`}
				source={
					completed
						? require("@/assets/icons/circle-check.svg")
						: require("@/assets/icons/circle-uncheck.svg")
				}
			/>
		</AnimatedPressable>
	);
};
