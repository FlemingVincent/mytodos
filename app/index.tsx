import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import * as Crypto from "expo-crypto";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";

import tw from "@/lib/tailwind";
import { useTodoStore } from "@/store/todoStore";
import { Todo } from "@/components/Todo";
import { CustomBackdrop } from "@/components/CustomBackdrop";

export default function Page() {
	const { todos, addTodo, toggleCompletion, removeTodo } = useTodoStore();

	const [title, setTitle] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const initialMode = React.useRef<boolean>(true);
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

	const snapPoints = React.useMemo(() => ["30%"], []);

	const handleSheetChanges = React.useCallback((index: number) => {
		if (index === -1) {
			setTitle("");
			setDescription("");
		}
	}, []);

	const handlePresentModalPress = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleAddTodo = () => {
		if (title) {
			addTodo({
				id: Crypto.randomUUID(),
				title,
				description,
				completed: false,
				date: new Date(),
			});
		}
		bottomSheetModalRef.current?.dismiss();
	};

	const handleToggleCompletion = (id: string) => {
		toggleCompletion(id);
	};

	const handleRemoveTodo = (id: string) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Delete",
				style: "destructive",
				onPress: () => removeTodo(id),
			},
		]);
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-neutral-50`}>
			<Text style={tw`large-title-emphasized p-4 text-neutral-950`}>
				MyTodos
			</Text>
			<ScrollView style={tw`flex-1`}>
				{todos.map((todo, index) => (
					<Todo
						key={todo.id}
						index={index}
						length={todos.length}
						title={todo.title}
						description={todo.description}
						completed={todo.completed}
						toggleCompletion={() => handleToggleCompletion(todo.id)}
						removeTodo={() => handleRemoveTodo(todo.id)}
						entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
						exiting={FadeOut}
						layout={Layout.delay(100)}
					/>
				))}
			</ScrollView>
			<BottomSheetModal
				style={tw`rounded-xl bg-neutral-50 shadow-lg`}
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				keyboardBlurBehavior="restore"
				handleIndicatorStyle={tw`bg-neutral-950`}
				backdropComponent={CustomBackdrop}
			>
				<View style={tw`flex-1 px-4 mt-2`}>
					<BottomSheetTextInput
						style={tw`body text-neutral-950 mb-2`}
						placeholder="What would you like to do?"
						value={title}
						onChangeText={(text) => setTitle(text)}
					/>
					<BottomSheetTextInput
						style={tw`subheadline`}
						placeholder="Description"
						value={description}
						onChangeText={(text) => setDescription(text)}
					/>
					<Pressable
						style={[
							tw`absolute bottom-[2.215rem] self-center w-full flex flex-row items-center justify-center bg-neutral-950 py-2 rounded-md gap-x-2`,
							!title && tw`opacity-50`,
						]}
						onPress={handleAddTodo}
						disabled={!title}
					>
						<Image
							style={tw`w-4 h-4`}
							source={require("@/assets/icons/circle-check-alt.svg")}
						/>
						<Text style={tw`body-emphasized text-neutral-50`}>Add Todo</Text>
					</Pressable>
				</View>
			</BottomSheetModal>
			<Pressable
				style={[
					tw`absolute bottom-[3.125rem] right-4 items-center justify-center rounded-full`,
				]}
				onPress={handlePresentModalPress}
			>
				<Image
					style={tw`w-12 h-12`}
					source={require("@/assets/icons/circle-plus.svg")}
				/>
			</Pressable>
		</SafeAreaView>
	);
}
