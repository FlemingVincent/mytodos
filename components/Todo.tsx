import React from "react";
import { Pressable, Text, View, ViewProps } from "react-native";

import { Image } from "expo-image";
import { Swipeable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import tw from "@/lib/tailwind";

interface TodoProps extends Animated.AnimateProps<ViewProps> {
	index: number;
	length: number;
	title: string;
	description: string;
	completed: boolean;
	toggleCompletion: () => void;
	removeTodo: () => void;
}

export const Todo = ({
	index,
	length,
	title,
	description,
	completed,
	toggleCompletion,
	removeTodo,
	...props
}: TodoProps) => {
	const swipeableRef = React.useRef<Swipeable>(null);

	return (
		<Swipeable
			ref={swipeableRef}
			overshootLeft={false}
			overshootRight={false}
			renderRightActions={() => {
				return (
					<Pressable
						style={tw`w-18 items-center justify-center bg-neutral-100`}
						onPress={removeTodo}
					>
						<Image
							style={tw`w-6 h-6`}
							source={require("@/assets/icons/trash.svg")}
						/>
					</Pressable>
				);
			}}
			renderLeftActions={() => {
				return (
					<Pressable
						style={tw`w-18 items-center justify-center bg-neutral-100`}
						onPress={() => {
							toggleCompletion();
							swipeableRef.current?.close();
						}}
					>
						<Image
							style={tw`w-6 h-6`}
							source={
								!completed
									? require("@/assets/icons/circle-check.svg")
									: require("@/assets/icons/circle-uncheck.svg")
							}
						/>
					</Pressable>
				);
			}}
		>
			<Animated.View
				style={[
					tw`flex flex-row items-center justify-between p-4 bg-neutral-50`,
				]}
				{...props}
			>
				<View style={tw`flex-1`}>
					<Text
						style={[
							tw`body text-neutral-950`,
							completed && tw`opacity-50 line-through`,
						]}
					>
						{title}
					</Text>
					{description && (
						<Text
							style={[
								tw`subheadline text-neutral-500`,
								completed && tw`opacity-50 line-through`,
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
			</Animated.View>
		</Swipeable>
	);
};
