import { Pressable, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "@/lib/tailwind";
import { useTodoStore } from "@/store/todoStore";

export default function Page() {
	const router = useRouter();
	const { todos, toggleCompletion, removeTodo } = useTodoStore();

	const handleCompletion = (id: string) => {
		toggleCompletion(id);
	};

	return (
		<SafeAreaView style={tw`flex-1 px-6 bg-neutral-50`}>
			<Text style={tw`large-title-emphasized py-6`}>Todos</Text>
			{todos.map((todo, index) => (
				<Pressable
					key={todo.id}
					style={[
						tw`py-2`,
						index < todos.length - 1 && tw`border-b border-neutral-400/10`,
					]}
					onPress={() => handleCompletion(todo.id)}
				>
					<Text
						style={[
							tw`body`,
							todo.completed && tw`line-through text-neutral-400/50`,
						]}
					>
						{todo.title}
					</Text>
				</Pressable>
			))}
			<Pressable
				style={[
					tw`absolute bottom-[3.625rem] right-6 w-12 h-12 items-center justify-center rounded-full bg-neutral-950 shadow-lg`,
				]}
				onPress={() => router.push("/modal")}
			></Pressable>
		</SafeAreaView>
	);
}
