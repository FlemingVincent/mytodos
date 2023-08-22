import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";

import tw from "@/lib/tailwind";
import { useTodoStore } from "@/store/todoStore";

export default function AddTodo() {
	const router = useRouter();
	const { addTodo } = useTodoStore();

	const [title, setTitle] = React.useState<string>("");

	const handleAddTodo = () => {
		try {
			if (title) {
				addTodo({
					id: Crypto.randomUUID(),
					title,
					completed: false,
					date: new Date(),
				});
				router.back();
			} else {
				throw new Error("Todo title cannot be empty");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={tw`flex-1 bg-neutral-50 px-6`}>
			<Text style={tw`large-title-emphasized py-4`}>Add Todo</Text>
			<TextInput
				style={tw`border border-neutral-400/10 rounded-md py-2 px-4`}
				placeholder="Todo title"
				value={title}
				onChangeText={setTitle}
			/>
			<Pressable
				style={tw`w-1/2 h-12 self-center rounded-full bg-black`}
				onPress={handleAddTodo}
			/>
		</View>
	);
}
